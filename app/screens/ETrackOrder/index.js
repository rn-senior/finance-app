import {
  ProductOrderItemList,
  ProfileCall,
  SafeAreaView,
  Text,
  TimeLine,
  Header,
  Icon,
  Button,
  AddressLine,
  ShipperLine,
  StatusLine,
  CatalogoList2,
  PaymentLine,
  AlertView,
  TextInput,
} from "@components";
import TextInputMask from "react-native-text-input-mask";
import { SearchCatalogueService } from "@services";
import ContentLoader, { Rect } from "react-content-loader/native";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import { OrderDetail } from "@data";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  View,
  Linking,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAsync, postAsync } from "../../services/ConnectApi";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector, useDispatch } from "react-redux";
import { URLS3 } from "../../utils/environment";
import { stat } from "react-native-fs";
import Clipboard from "@react-native-clipboard/clipboard";

const ETrackOrder = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  const { itemInit, txId, index } = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [txDetail, setTxDetail] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [item, setItem] = useState(itemInit);
  const [refreshing, setRefreshing] = useState(false);
  const [actions, setActions] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [tiempoAceptacion, setTiempoAceptacion] = useState(-1);
  const [tiempoEntrega, setTiempoEntrega] = useState(-1);
  const [tiempoConfirmacion, setTiempoConfirmacion] = useState(-1);
  const [user, setUser] = useState(itemInit.vendedor);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLine, setTimeLine] = useState([]);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  const userId = useSelector((state) => state.auth.login.success.profile.id);
  const catalogue = useSelector((state) => state.product.catalogo);

  const styleItem1 = {
    ...styles.profileItem,
    borderTopColor: colors.border,
    width: "100%",
  };

  const styleItem2 = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
    width: "100%",
    marginBottom: 40,
  };

  const [success] = useState({
    bankName: true,
  });

  function showRefund(status) {
    return checkDate(status) && checkDate("REE") ? " - (Reembolsado)" : ""
  }

  function showTimeExpired(status) {
    var time = "";
    if (status == nextStep(item.estadoTransaccion) && status == "ACE") {
      time =
        isExpired || tiempoAceptacion <= 0
          ? " (Expirado)"
          : " (Expira en " + dhm(tiempoAceptacion) + ")";
    } else if (status == nextStep(item.estadoTransaccion) && status == "ENV") {
      time =
        isExpired || tiempoEntrega <= 0
          ? " (Expirado)"
          : " (Expira en " + dhm(tiempoEntrega) + ")";
    } else if (status == nextStep(item.estadoTransaccion) && status == "RCB") {
      time =
        isExpired || tiempoEntrega <= 0
          ? " (Expirado)"
          : " (Expira en " + dhm(tiempoEntrega) + ")";
    } else if (status == nextStep(item.estadoTransaccion) && status == "CNF") {
      time =
        isExpired || tiempoConfirmacion <= 0
          ? " (Expirado)"
          : " (Expira en " + dhm(tiempoConfirmacion) + ")";
    }
    return time;
  }

  function checkCodeConfirmed() {
    return checkDate("VAL") && index == 2
      ? "Código entrega: " + item?.codigoConfirmacion
      : null;
  }

  function checkCodeCancelled() {
    return checkDate("VAL") && index == 1
      ? "Código cancelación: " +
      (item?.codigoCancelacion ? item.codigoCancelacion : "6451")
      : null;
  }

  function checkDeliveryType() {
    return item.tipoEntrega == "ENVIO" ? true : false;
  }

  function nextStep2(stat) {
    switch (stat) {
      case "CRE":
        return null;
      case "VAL":
        if (checkDate("ACE")) {
          return "A la espera de que qury valide el medio de pago.";
        } else {
          return null;
        }
      case "ACE":
        if (checkDate("CRE")) {
          return "A la espera que el vendedor acepte el pedido.";
        } else {
          return null;
        }
      case "EXP":
        return null;
      case "REC":
        return null;
      case "REQ":
        return null;
      case "ENV":
        if (checkDate("VAL")) {
          return checkDeliveryType()
            ? "A la espera que el vendedor envíe el pedido."
            : "A la espera que el vendedor tenga listo el pedido para el recojo.";
        } else {
          return null;
        }
      case "RCB":
        if (checkDate("ENV")) {
          return "A la espera que el vendedor confirme la entrega del producto.";
        } else {
          return null;
        }
      case "COV":
        return null;
      case "CON":
        return null;
      case "CAN":
        return null;
      case "CNF":
        return null;
    }
    return null;
  }

  function checkDate(status) {
    switch (status) {
      case "CRE":
        return item.fechaCreacion;
      case "ACE":
        return item.fechaAceptacionVendedor;
      case "EXP":
        return item.fechaExpiracion;
      case "REC":
        return item.fechaRechazoVendedor;
      case "REQ":
        return item.fechaRechazoQury;
      case "FIQ":
        return item.fechaFinalizacionQury;
      case "COV":
        return item.fechaConflicto;
      case "CON":
        return item.fechaConflicto;
      case "ANU":
        return item.fechaAnulacion;
      case "CAN":
        return item.fechaCancelacion;
      case "VAL":
        return item.fechaAceptacionQury;
      case "ENV":
        return item.fechaEnvio;
      case "RCB":
        return item.fechaAceptacionComprador;
      case "CNF":
        return item.fechaConfirmacionComprador;
      case "REE":
        return item.fechaReembolso;
    }
    return null;
  }

  function compareDates(date1, date2) {
    if (date2 == null) return true;
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    return d1.getDate() > d2.getDate();
  }

  const getTransaction = () => {
    getAsync(
      "/transaction/" + txId,
      {
        onSuccess: (response) => {
          setItem(response[0]);
        },
        onError: (error) => {
          setLoading(false);
        }, // id:Session.user.id,
      },
      null
    );
  };

  const getTransactiondetail = () => {
    getAsync(
      "/transactiondetail/" + item.id,
      {
        onSuccess: (response) => {
          setTxDetail(response);
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
        }, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    setTimeout(() => {
      {
        if (isFocused) {
          getTransaction();
          getTransactiondetail();
        } else {
          //clearInterval(x)
          ("none");
        }
      }
    }, 500); //Math.floor(Math.random() * 1000) + 1000);
  }, [isFocused]);

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };

  const getName = () => {
    var name;
    if (index == 1) {
      name = item.comprador.nombres + " " + item.comprador.apellidos;
    } else if (index == 2) {
      name = item.vendedor.nombres + " " + item.vendedor.apellidos;
    }
    return name;
  };

  const getFirstLetter = () => {
    var name;
    if (index == 1) {
      name =
        item.comprador.nombres.charAt(0) + item.comprador.apellidos.charAt(0);
    } else if (index == 2) {
      name =
        item.vendedor.nombres.charAt(0) + item.vendedor.apellidos.charAt(0);
    }
    return name;
  };

  function formatDate(date) {
    const MESES = [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abr.",
      "May.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dic.",
    ];
    var dateString = new Date(date);
    return (
      "" +
      dateString.getDate() +
      " " +
      MESES[dateString.getMonth()] +
      " " +
      dateString.getFullYear() +
      "  " +
      formatAMPM(dateString)
    );
  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  useEffect(() => {
    if (checkDate("CRE") && tiempoAceptacion >= 0 && !checkDate("ACE")) {
      let time = tiempoAceptacion;
      setTimeout(() => {
        {
          setTiempoAceptacion(time - 30000);
          //if (time <= 0) setIsExpired(true);
        }
      }, 30000); //Math.floor(Math.random() * 1000) + 1000);
    }
  }, [tiempoAceptacion]);

  useEffect(() => {
    if (
      (checkDate("VAL") || checkDate("ENV")) &&
      tiempoEntrega >= 0 &&
      !checkDate("RCB")
    ) {
      let time = tiempoEntrega;
      setTimeout(() => {
        {
          setTiempoEntrega(time - 30000);
          //if (time <= 0) setIsExpired(true);
        }
      }, 30000); //Math.floor(Math.random() * 1000) + 1000);
    }
  }, [tiempoEntrega]);

  useEffect(() => {
    if (checkDate("RCB") && tiempoConfirmacion >= 0 && !checkDate("CNF")) {
      let time = tiempoConfirmacion;
      setTimeout(() => {
        {
          setTiempoConfirmacion(time - 30000);
          //if (time <= 0) setIsExpired(true);
        }
      }, 30000); //Math.floor(Math.random() * 1000) + 1000);
    }
  }, [tiempoConfirmacion]);

  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ":" + mins;
  }

  function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.round((t - d * cd - h * ch) / 60000),
      pad = function (n) {
        return n < 10 ? "0" + n : n;
      };
    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }
    return (
      (d > 0 ? d + "d " : "") +
      (pad(h) > 0 || d > 0 ? pad(h) + "h " : "") +
      (pad(m) + "m")
    );
  }

  const formatStatus = (item) => {
    var status = "POR ACEPTAR";
    switch (item) {
      case "CRE":
        status = "POR ACEPTAR"; //cambio
        break;
      case "ACE":
        status = "ACEPTADO";
        break;
      case "APR":
        status = "ACEPTADO"; //cambio
        break;
      case "EXP":
        status = "EXPIRADO";
        break;
      case "REC":
        status = "RECHAZADO";
        break;
      case "REQ":
        status = "RECHAZADO";
        break;
      case "FIC":
        status = "ENVIADO"; //cambio
        break;
      case "FIQ":
        status = "FINALIZADO"; //cambio
        break;
      case "COV":
        status = "CONFLICTO";
        break;
      case "CON":
        status = "CONFLICTO";
        break;
      case "ANU":
        status = "ANULADO";
        break;
      case "VAL":
        status = "VALIDADO";
        break;
      case "ENV":
        status = checkDeliveryType() ? "ENVIADO" : "LISTO PARA ROCOJO";
        break;
      case "RCB":
        status = "ENTREGADO";
        break;
      case "CNF":
        status = "CONFIRMADO";
        break;
      case "CAN":
        status = "CANCELADO";
        break;
    }
    return status;
  };

  const formatStatusN = (item) => {
    var status = "POR ACEPTAR";
    switch (item) {
      case "CRE":
        status = "POR ACEPTAR";
        break;
      case "ACE":
        status = "POR ACEPTAR";
        break;
      case "EXP":
        status = "EXPIRADO";
        break;
      case "REC":
        status = "RECHAZADO";
        break;
      case "REQ":
        status = "RECHAZADO";
        break;
      case "FIC":
        status = "FINALIZADO"; //cambio
        break;
      case "FIQ":
        status = "FINALIZADO"; //cambio
        break;
      case "COV":
        status = "CONFLICTO";
        break;
      case "CON":
        status = "CONFLICTO";
        break;
      case "ANU":
        status = "ANULADO";
        break;
      case "VAL":
        status = "VALIDADO";
        break;
      case "ENV":
        status = checkDeliveryType() ? "POR ENVIAR" : "LISTO PARA ROCOJO";
        break;
      case "RCB":
        status = "POR ENTREGAR";
        break;
      case "CNF":
        status = "POR CONFIRMAR";
        break;
      case "CAN":
        status = "CANCELADO";
        break;
    }
    return status;
  };

  function formatColor(item) {
    var color = "#000";
    switch (item) {
      case "REC":
        color = "#C62105";
        break;
      case "REQ":
        color = "#C62105";
        break;
      case "CRE":
        color = "#09564F";
        break;
      case "ACE":
        color = "#3279D7";
        break;
      case "EXP":
        color = "#000000";
        break;
      case "VAL":
        color = "#38BBDF";
        break;
      case "ENV":
        color = "#871C98";
        break;
      case "RCB":
        color = "#2AB361";
        break;
      case "CNF":
        color = "#FF551E";
        break;
      case "CAN":
        color = "#C62105";
        break;
      case "COV":
        color = "#FFAF00";
        break;
      case "CON":
        color = "#FFAF00";
        break;
      case "FIQ":
        color = "#000000";
        break;
      case "ANU":
        color = "#C62105";
        break;
    }
    return color;
  }

  useEffect(() => {
    var lastStatus;
    var timeL = [];
    if (item.transaccionEstados != null) {
      item.transaccionEstados.map((i, index) => {
        /* if (lastStatus != i.transaccionEstado && i.transaccionEstado != "CRE") timeL.push(timeLItem(i.transaccionEstado))
        lastStatus = i.transaccionEstado */
        if (i.transaccionEstado == "CON" || i.transaccionEstado == "COV")
          lastStatus = i;
        else if (i.transaccionEstado == "ANU") lastStatus = i;
        else if (i.transaccionEstado == "REC") lastStatus = i;
        else if (i.transaccionEstado == "REQ") lastStatus = i;
        else if (i.transaccionEstado == "EXP") lastStatus = i;
        else if (i.transaccionEstado == "CAN") lastStatus = i;
        else lastStatus = null;
      });
      //&& !["ANU", "REC", "REQ", "EXP", "CON", "CAN"].includes(lastStatus)
      var stat = "ACE";
      while (stat != null) {
        if (!lastStatus) {
          timeL.push(timeLItem(stat));
          stat = nextStep(stat);
        } else if (!compareDates(checkDate(stat), lastStatus?.fecha)) {
          timeL.push(timeLItem(stat));
          stat = nextStep(stat);
          if (!stat) {
            if (
              lastStatus &&
              !compareDates(lastStatus?.fecha, checkDate("CNF"))
            )
              timeL.push(timeLItem(lastStatus.transaccionEstado));
          }
        } else {
          //timeL.push(timeLItem(stat));
          timeL.push(timeLItem(lastStatus.transaccionEstado));
          stat = null;
        }
      }
    }

    setTimeLine(
      /* timeLItem("ACE"),
      timeLItem("VAL"),
      timeLItem("ENV"),
      timeLItem("RCB"),
      timeLItem("CNF"), */
      timeL
    );
    /* setTimeRemainingAceptacion()
    setTimeRemainingEntrega()
    setTimeRemainingConfirmacion() */
  }, [item, tiempoAceptacion, tiempoConfirmacion, tiempoEntrega]);

  function timeLItem(status) {
    return {
      title: checkDate(status)
        ? formatStatus(status) + showRefund(status)
        : formatStatusN(status) + showTimeExpired(status),
      code: checkDate(status)
        ? null
        : status == "ENV" || status == "RCB"
          ? index == 2
            ? checkCodeConfirmed()
            : checkCodeCancelled()
          : null,
      description: checkDate(status) ? formatDate(checkDate(status)) : "-----",
      nextStep: checkDate(status) ? null : nextStep2(status),
      isDone: checkDate(status) ? true : false,
      color: checkDate(status) ? formatColor(status) : "#989898",
    };
  }

  const nextStep = (status) => {
    switch (status) {
      case "CRE":
        return "ACE";
      case "ACE":
        return "VAL";
      case "VAL":
        return "ENV";
      case "ENV":
        return "RCB";
      case "RCB":
        return "CNF";
      case "CNF":
        return null;
      case "EXP":
        return null;
      case "REC":
        return null;
      case "REQ":
        return null;
      case "FIC":
        return null;
      case "FIQ":
        return null;
      case "CON":
        return null;
      case "CAN":
        return null;
    }
    return null;
  };

  /* const formattiempoAceptacionExpired = () => {
    const x = setInterval(() => {
      let time = tiempoAceptacion
      if (time <= 0) clearInterval(x)
      setTiempoAceptacion(time - 1000);
    }, 1000); */

  useEffect(() => {
    var timeCreated = new Date(item?.fechaCreacion);
    var timeValidated = new Date(item?.fechaAceptacionQury);
    var timeRcb = new Date(item?.fechaAceptacionComprador);

    var now = new Date();

    var timeExpired;

    timeExpired = new Date(
      timeCreated.getTime() + parseInt(item?.tiempoAceptacion) * 3600000
    );
    setTiempoAceptacion(timeExpired.getTime() - now.getTime());

    timeExpired = new Date(
      timeValidated.getTime() + item?.tiempoEntrega * 86400000
    );
    setTiempoEntrega(timeExpired.getTime() - now.getTime());

    timeExpired = new Date(
      timeRcb.getTime() + parseInt(item?.tiempoConfirmacion) * 3600000
    );
    setTiempoConfirmacion(timeExpired.getTime() - now.getTime());
  }, [item]);

  useEffect(() => {
    switch (item.estadoTransaccion) {
      case "CRE":
        if (index == 1)
          setActions([
            {
              code: 1,
              title: "ACEPTAR",
              color: "#3279D7",
              icon: Images.greencheck,
              action: () => {
                navigation.navigate("ETAccepted", { tx: item });
              },
            },
            {
              code: 112,
              title: "RECHAZAR",
              color: "#C62105",
              icon: Images.redclose,
              action: () => {
                navigation.navigate("ETRejected", { tx: item });
              },
            },
          ]);
        if (index == 2)
          setActions([
            {
              code: 2,
              title: "ANULAR",
              color: "#C62105",
              icon: Images.redclose,
              action: () => {
                navigation.navigate("ETAnnulled", { tx: item });
              },
            },
          ]);
        break;
      case "ACE":
        if (index == 1)
          setActions([
            {
              code: 22,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.danger,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            },
          ]);
        if (index == 2)
          setActions([
            {
              code: 221,
              title: "ANULAR",
              color: "#C62105",
              icon: Images.redclose,
              action: () => {
                navigation.navigate("ETAnnulled", { tx: item });
              },
            },
            {
              code: 21,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.check,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            },
          ]);

        break;
      case "VAL":
        if (index == 1) {
          setActions([
            {
              code: 3,
              title: checkDeliveryType() ? "ENVIAR" : "LISTO PARA RECOGER",
              color: "#E29085",
              icon: Images.check,
              action: () => {
                navigation.navigate("ETDelivered", { tx: item });
              },
            },
            {
              code: 31,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.danger,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            },
          ]);
        } else {
          setActions(
            isExpired || tiempoEntrega <= 0
              ? [
                {
                  code: 331,
                  title: "CANCELAR",
                  color: "#C62105",
                  icon: Images.redclose,
                  action: () => {
                    navigation.navigate("ETCancelled", { tx: item });
                  },
                },
                {
                  code: 32,
                  title: "RECLAMAR",
                  color: "#ECBD51",
                  icon: Images.danger,
                  action: () => {
                    navigation.navigate("ETClaim", { tx: item });
                  },
                },
              ]
              : [
                {
                  code: 3131,
                  title: "CANCELAR",
                  color: "#C62105",
                  icon: Images.redclose,
                  action: () => {
                    navigation.navigate("ETCancelled", { tx: item });
                  },
                },
              ]
          );
        }
        break;
      case "APR":
        break;
      case "EXP":
        setActions([
          {
            code: 96,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
      case "REC":
        setActions([
          {
            code: 97,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
      case "REQ":
        setActions([
          {
            code: 98,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
      case "RCB":
        if (index == 2) {
          setActions([
            {
              code: 6,
              title: "CONFIRMAR",
              color: "#000",
              icon: Images.check,
              action: () => {
                navigation.navigate("ETConfirmed", { tx: item });
              },
            },
            {
              code: 622,
              title: "CANCELAR",
              color: "#C62105",
              icon: Images.redclose,
              action: () => {
                navigation.navigate("ETCancelled", { tx: item });
              },
            },
            {
              code: 61,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.danger,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            },
          ]);
        } else {
          setActions([
            /* {
              code: 62,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.check,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            }, */
            {
              code: 94,
              title: "No hay acciones disponibles",
              color: "#000",
              icon: null,
              action: () => { },
            },
          ]);
        }
        break;
      case "CNF":
        if (index == 1) {
          setActions([
            {
              code: 9191,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.danger,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            },
          ]);
        } else {
          setActions([
            {
              code: 93,
              title: "No hay acciones disponibles",
              color: "#000",
              icon: null,
              action: () => { },
            },
          ]);
        }
        break;
      case "FIQ":
        setActions([
          {
            code: 99,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
      case "COV":
        setActions([
          {
            code: 92,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
      case "CON":
        setActions([
          {
            code: 91,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
      case "CAN":
        setActions([
          {
            code: 95,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
        break;
        break;

      case "ENV":
        //agrega tiempoEntrega
        if (index == 1) {
          setActions([
            {
              code: 4,
              title: "ENTREGAR",
              color: "#2AB361",
              icon: Images.check,
              action: () => {
                navigation.navigate("ETReceived", { tx: item });
              },
            },
            /* {
              code: 41,
              title: "RECLAMAR",
              color: "#ECBD51",
              icon: Images.check,
              action: () => {
                navigation.navigate("ETClaim", { tx: item });
              },
            }, */
          ]);
        } else if (index == 2) {
          setActions(
            isExpired || tiempoEntrega <= 0
              ? [
                {
                  code: 422,
                  title: "CANCELAR",
                  color: "#C62105",
                  icon: Images.redclose,
                  action: () => {
                    navigation.navigate("ETCancelled", { tx: item });
                  },
                },
                {
                  code: 42,
                  title: "RECLAMAR",
                  color: "#ECBD51",
                  icon: Images.danger,
                  action: () => {
                    navigation.navigate("ETClaim", { tx: item });
                  },
                },
              ]
              : [
                {
                  code: 4242,
                  title: "CANCELAR",
                  color: "#C62105",
                  icon: Images.redclose,
                  action: () => {
                    navigation.navigate("ETCancelled", { tx: item });
                  },
                },
              ]
          );
        }
        break;
      default:
        setActions([
          {
            code: 9,
            title: "No hay acciones disponibles",
            color: "#000",
            icon: null,
            action: () => { },
          },
        ]);
    }
  }, [item, isExpired]);

  const goProducts2 = () => {
    const dataUsurio = {
      id: item.vendedor.id,
      // name: response[0].nombres + " " + response[0].apellidos,
      name: item.vendedor.nombres,
      surname: item.vendedor.apellidos,
      user: item.vendedor.userLogin,
      quryId: item.vendedor.quryId,
    };

    navigation.navigate("ECart", {
      productos: catalogue,
      vendedor: dataUsurio,
    });
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 60;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="30%" y="0" rx="8" ry="8" width="40%" height="30" />
          {/* Timelime */}
          <Rect x="0" y="70" rx="8" ry="8" width="100%" height="400" />
          {/* Description */}
          <Rect x="5%" y="94" rx="6" ry="6" width="12" height="12" />
          <Rect x="11%" y="90" rx="8" ry="8" width="100" height="18" />
          <Rect x="11%" y="125" rx="8" ry="8" width="130" height="16" />
          <Rect x="70%" y="90" rx="8" ry="8" width="100" height="18" />
          <Rect x="65%" y="125" rx="8" ry="8" width="120" height="16" />
          {/* Separator */}
          <Rect x="2%" y="155" rx="8" ry="8" width="96%" height="1" />
          {/* Vertical Line */}
          <Rect x="6.2%" y="192" rx="8" ry="8" width="1" height="65" />
          <Rect x="6.2%" y="265" rx="8" ry="8" width="1" height="70" />
          <Rect x="6.2%" y="345" rx="8" ry="8" width="1" height="70" />
          {/* Timelime Estados */}
          <Rect x="5%" y="180" rx="6" ry="6" width="12" height="12" />
          <Rect x="15%" y="175" rx="8" ry="8" width="100" height="16" />
          <Rect x="15%" y="205" rx="8" ry="8" width="65%" height="14" />
          <Rect x="5%" y="255" rx="6" ry="6" width="12" height="12" />
          <Rect x="15%" y="250" rx="8" ry="8" width="100" height="16" />
          <Rect x="15%" y="280" rx="8" ry="8" width="65%" height="14" />
          <Rect x="5%" y="335" rx="6" ry="6" width="12" height="12" />
          <Rect x="15%" y="330" rx="8" ry="8" width="100" height="16" />
          <Rect x="15%" y="360" rx="8" ry="8" width="65%" height="14" />
          <Rect x="5%" y="415" rx="6" ry="6" width="12" height="12" />
          <Rect x="15%" y="410" rx="8" ry="8" width="100" height="16" />
          <Rect x="15%" y="440" rx="8" ry="8" width="65%" height="14" />
          {/* Acciones */}
          <Rect x="0" y="485" rx="8" ry="8" width="100%" height="70" />
          <Rect x="5%" y="495" rx="6" ry="6" width="90" height="18" />
          <Rect x="5%" y="525" rx="6" ry="6" width="110" height="18" />
          {/* Detalles */}
          <Rect x="0" y="570" rx="8" ry="8" width="100%" height="200" />
          <Rect x="4%" y="590" rx="20" ry="20" width="40" height="40" />
          <Rect x="18%" y="600" rx="6" ry="6" width="100" height="18" />
          <Rect x="72%" y="595" rx="6" ry="6" width="80" height="30" />
          {/* Separator */}
          <Rect x="2%" y="645" rx="8" ry="8" width="96%" height="1" />
          {/*Detalles 2*/}
          <Rect x="3%" y="660" rx="8" ry="8" width="100" height="18" />
          <Rect x="3%" y="695" rx="8" ry="8" width="70" height="35" />
          <Rect x="26%" y="701" rx="6" ry="6" width="100" height="22" />
          <Rect x="70%" y="701" rx="6" ry="6" width="100" height="20" />
          {/* Separator */}
          <Rect x="2%" y="748" rx="8" ry="8" width="96%" height="1" />
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "#F6F5F5" }}
      >
        {alertVisible ? (
          <AlertView
            title={"Detalle del reclamo"}
            message={item.reclamos[0].texto}
            onPressOk={() => {
              setAlertVisible(false);
            }}
          />
        ) : null}
        <Spinner visible={spinner} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {
                getTransaction();
                getTransactiondetail();
              }}
            />
          }
        >
          <View
            style={[styles.headerView, { borderBottomColor: colors.border }]}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#EEECEC",
                width: 204,
                height: 37,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>
                PEDIDO <Text bold>{"#" + item.id}</Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "94%",
                marginHorizontal: 16,
                marginTop: 16,
                borderRadius: 4,
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 16,
                  alignItems: "center",
                }}
              >
                <StatusLine
                  title={formatStatus(item.estadoTransaccion)}
                  price={"S/ " + item.precioTotal}
                  date={formatDate(item.fechaCreacion)}
                  // <<<<<<< HEAD
                  //                   color={formatColor()}
                  //                   //newStep={nextStep()}
                  //                   // style={{ padding: 20 }}
                  color={formatColor(item.estadoTransaccion)}
                //newStep={nextStep()}
                // style={{ padding: 20 }}
                />
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginVertical: 10,
                  }}
                />
                <View
                  style={{
                    //flex: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    paddingBottom: 10,
                  }}
                >
                  <TimeLine
                    data={timeLine}
                    style={{ paddingHorizontal: 0 }}
                    onPressAction={() => setAlertVisible(true)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                width: "94%",
                marginHorizontal: 16,
                marginTop: 5,
                borderRadius: 4,
                marginBottom: 10,
                paddingBottom: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 16,
                  alignItems: "flex-start",
                }}
              >
                <Text
                  bold
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    marginVertical: 5,
                  }}
                >
                  ACCIONES
                </Text>

                {actions.length > 0
                  ? actions.map((item, index, key) => (
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                      }}
                      key={item.code.toString()}
                    >
                      <TouchableOpacity
                        style={{
                          marginVertical: 5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onPress={item.action}
                      >
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }}
                          source={item.icon}
                        />
                        <Text
                          bold
                          style={{
                            color: item.color,
                            fontWeight: "500",
                          }}
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                  : null}
              </View>
            </View>
            {checkDate("ENV") && !checkDate("RCB") && index == 1 && item?.tipoEntrega == "ENVIO" ?
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "94%",
                  marginHorizontal: 16,
                  marginTop: 5,
                  borderRadius: 4,
                  marginBottom: 10,
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    bold
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      marginVertical: 5,
                    }}
                  >
                    LINK PARA EL REPARTIDOR
                  </Text>
                  <TouchableOpacity
                    style={{ height: 32, flexDirection: "row", }}
                    onPress={() => {
                      let link = "http://qury.com.pe/pe=" + item.id;
                      Clipboard.setString(link);
                      const text = Clipboard.getString(link);
                      text.then((res) => {
                        //alert("Codiado a portapapeles: " + qid);
                        setCopied(true);
                      });
                      //shareImage();
                    }}
                  >
                    <View
                      style={{
                        marginTop: 0,
                        borderWidth: 2,
                        borderColor: copied ? "#1dcc89" : "#bcbcbc",
                        backgroundColor: copied ? "#1dcc89" : "#bcbcbc",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        flexDirection: "row",
                      }}
                    >
                      <Text semibold style={{ color: "white" }}>
                        {"http://qury.com.pe/pe=" + item.id}
                      </Text>
                      <Image source={Images.copy} style={[styles.imageWishlist, { marginLeft: 8, }]} />
                    </View>


                  </TouchableOpacity>
                  <View >
                    {copied ? (
                      <View style={{ width: "100%", backgroundColor: "#fff", }}>
                        <Text style={{ textAlign: "center" }}>
                          Copiado al portapapeles
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
              : null}
            <View
              style={{
                backgroundColor: "#fff",
                width: "94%",
                marginHorizontal: 16,
                marginTop: 0,
                borderRadius: 4,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 16,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginVertical: 10,
                  }}
                />
                <ShipperLine
                  title={getName()}
                  inicial={getFirstLetter().toUpperCase()}
                  imagePhone={index == 2 ? "phone-alt" : null}
                  imageMessage={"comment-alt"}
                  onPressMessage={() => {
                    navigation.navigate("Messages", { itemInit: item });
                  }}
                />
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginVertical: 10,
                  }}
                />
                <PaymentLine index={index} paymethod={item.metodoPago} />
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginTop: 10,
                  }}
                />
                <AddressLine
                  title={"Lugar de entrega"}
                  address={item.direccion}
                />
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginBottom: 10,
                  }}
                />
                <View style={{ alignSelf: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      marginVertical: 10,
                    }}
                  >
                    Productos
                  </Text>
                  <View style={{ alignSelf: "flex-start" }}>
                    {txDetail.map((item, index) => (
                      <View key={index.toString()} style={{ width: "100%" }}>
                        <CatalogoList2
                          title={item.producto.descripcion}
                          description={formatQuryID(item.producto.quryId)}
                          description2={
                            !item.metadata
                              ? null
                              : item.metadata.talla
                                ? "Talla: " + item.metadata.talla
                                : null
                          }
                          description3={
                            !item.metadata
                              ? null
                              : item.metadata.color
                                ? "Color: " + item.metadata.color
                                : null
                          }
                          salePrice={"S/ " + item.precio}
                          image={URLS3 + item.producto.imagen1}
                          style={{ width: "100%", marginTop: 10 }}
                        />
                      </View>
                    ))}
                  </View>
                </View>
                {item.usuario_id_vendedor == userId ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      //navigation.navigate("EHome");
                      setLoading(true);

                      dispatch(SearchCatalogueService(item.vendedor.quryId));
                      setTimeout(() => {
                        setLoading(false);
                        if (catalogue) {
                          if (catalogue.length > 1) {
                            goProducts2();
                          } else {
                            //goProductDetail(store.getState().product.catalogo[0]);
                            console.log("no existe CATALOGO");
                          }
                        }
                      }, 2500);
                    }}
                    style={{ marginTop: 38, marginBottom: 45 }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#0191CB",
                        textDecorationLine: "underline",
                      }}
                    >
                      Ver Catálogo
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styleItem1}
                  onPress={() => {
                    navigation.navigate("EProductStoreProfile", { user: user });
                  }}
                >
                  <Text body1>{t("Políticas del vendedor")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={"#9B9998"}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={index == 1 ? "Detalle de Venta" : "Detalle de Compra"}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {loading ? renderPlaceholder() : renderContent()}
      {/* <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Button onPress={() => navigation.navigate("EHome")}>
          {t("home")}
        </Button>
      </View> */}
    </SafeAreaView>
  );
};

export default ETrackOrder;
