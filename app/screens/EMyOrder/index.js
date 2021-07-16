import {
  ProductOrderItemList,
  SafeAreaView,
  Tag,
  Text,
  Header,
  Icon,
  Image,
  ProductList6,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { CompletedOrders } from "@data";
import React, { Fragment, useEffect, useState, useRef } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  RefreshControl,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { enableExperimental } from "@utils";
import { or, round } from "react-native-reanimated";
import styles from "./styles";
import ModalFilter from "./ModalFilter";
import ModalSort from "./ModalSort";
import { getAsync } from "../../services/ConnectApi";
import { useSelector, useStore, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const date1 = new Date("06-06-2020");
const DATA = [
  {
    id: 1,
    title: "(4 Productos)",
    order: "1234",
    status: "VALIDADO",
    salePrice: "199.00",
    date: "02 Nov. 2020",
    color: "#38BBDF",
    isCompleted: true,
    isRequested: false,
    isCancelled: true,
  },
  {
    id: 4,
    title:
      "(5 Productos) - Black T-shirt with simple focs one text larger than screen",
    order: "3124",
    status: "VALIDADO",
    salePrice: "499.00",
    date: "03 Nov. 2020",
    color: "#38BBDF",
    isCompleted: true,
    isRequested: false,
    isCancelled: true,
  },
  {
    id: 2,
    title:
      "(2 Productos) - Black T-shirt with simple focs one text larger than screen",
    order: "5678",
    status: "CONFIRMADO",
    salePrice: "299.00",
    date: "03 Nov. 2020",
    color: "#229B6C",
    isCompleted: false,
    isRequested: true,
    isCancelled: false,
  },
  {
    id: 3,
    title:
      "(7 Productos) - Black T-shirt with simple focs one text larger than screen",
    order: "8790",
    status: "VALIDADO",
    salePrice: "399.00",
    date: "03 Nov. 2020",
    color: "#38BBDF",
    isCompleted: false,
    isRequested: true,
    isCancelled: false,
  },
];

const EMyOrder = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [modalSortVisible, setModalSortVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const store = useStore();
  const userId = store.getState().auth.login.success.profile.id;
  const tabSelect = route.params?.tabSelect;

  const flatlistRef = useRef();

  const TABS = [
    {
      id: 2,
      title: formatTitle(2),
      key: "isRequested",
      key1: "usuario_id_comprador",
    },
    {
      id: 1,
      title: formatTitle(1),
      key: "isCompleted",
      key1: "usuario_id_vendedor",
    },
  ];

  const [tabChoosed, setTabChoosed] = useState(TABS[0]);

  function formatTitle(index) {
    var q = 0;
    var text;
    if (index == 2) {
      q = transactions.filter(
        (order) =>
          order.usuario_id_comprador == userId &&
          ["ENV"].includes(order.estadoTransaccion)
      ).length;
      text = q > 0 ? "Compras (" + q + ")" : "Compras";
    }
    if (index == 1) {
      q = transactions.filter(
        (order) =>
          order.usuario_id_vendedor == userId &&
          ["CRE", "VAL"].includes(order.estadoTransaccion)
      ).length;
      text = q > 0 ? "Ventas (" + q + ")" : "Ventas";
    }
    return text;
  }

  useEffect(() => {
    navigation.setOptions({ tabBarBadge: 6 });
    // enableExperimental();
    if (tabChoosed.id == 1) {
      setProducts(
        transactions.filter((order) => order.usuario_id_vendedor == userId)
      );
    } else if (tabChoosed.id == 2) {
      setProducts(
        transactions.filter((order) => order.usuario_id_comprador == userId)
      );
    }
    //setProducts(DATA.filter((order) => order[tabChoosed.key]));
  }, [tabChoosed, transactions]);

  const listTransactions = () => {
    getAsync(
      "/transactions/" + userId,
      {
        onSuccess: (response) => {
          setLoading(false);
          setTransactions(response);
          /* if (tabChoosed.id == 1) {
            setProducts(
              response.filter((order) => order.usuario_id_vendedor == userId)
            );
          } else if (tabChoosed.id == 2) {
            setProducts(
              response.filter((order) => order.usuario_id_comprador == userId)
            );
          } */
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
        isFocused ? listTransactions() : "none";
      }
    }, 500); //Math.floor(Math.random() * 1000) + 1000);
  }, [isFocused]);

  const sortArray = (index) => {
    var sortedData;
    if (tabChoosed.id == 1) {
      sortedData = transactions.filter(
        (order) => order.usuario_id_vendedor == userId
      );
    } else {
      sortedData = transactions.filter(
        (order) => order.usuario_id_comprador == userId
      );
    }
    switch (index) {
      case 1:
        setProducts(
          sortedData
            .slice()
            .sort(
              (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
            )
        );
        break;
      case 2:
        setProducts(
          sortedData.slice().sort((a, b) => b.precioTotal - a.precioTotal)
        );
        break;
    }
    if (products.length > 0) {
      flatlistRef.current.scrollToIndex({ index: 0 });
    }
  };

  const filterArray = (status) => {
    var filteredArray;
    if (tabChoosed.id == 1) {
      filteredArray = transactions.filter(
        (order) => order.usuario_id_vendedor == userId
      );
    } else {
      filteredArray = transactions.filter(
        (order) => order.usuario_id_comprador == userId
      );
    }
    if (status != "") {
      setProducts(
        filteredArray.filter((obj) => obj.estadoTransaccion == status)
      );
    } else {
      setProducts(filteredArray);
    }

    if (products.length > 0) {
      flatlistRef.current.scrollToIndex({ index: 0 });
    }
  };

  function checkDeliveryType(item) {
    return item?.tipoEntrega == "ENVIO" ? true : false;
  }

  function formatStatus(item) {
    var status = "POR ACEPTAR";
    switch (item.estadoTransaccion) {
      case "CRE":
        status = "POR ACEPTAR";
        break;
      case "ACE":
        status = "ACEPTADO";
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
        status = "ENVIADO";
        break;
      case "FIQ":
        status = "FINALIZADO";
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
        status = checkDeliveryType(item) ? "ENVIADO" : "LISTO PARA ROCOJO";
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
  }

  function formatColor(item) {
    var color = "#09564F";
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
      // <<<<<<< HEAD
      //       case "ENV":
      //         color = "#E29085";
      //         break;
      //       case "VAL":
      //         color = "#38BBDF";
      //         break;
      //       case "CNF":
      //         color = "#000";
      //         break;
      //       case "CAN":
      //         color = "#C62105";
      //         break;
    }

    return color;
  }

  const formatDate = (date) => {
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
      dateString.getFullYear()
    );
  };
  const formatQuantity = (item) => {
    return item.cantidad == 1
      ? "(" + item.cantidad + " Producto)"
      : "(" + item.cantidad + " Productos)";
  };

  const checkTimeRemaining = (item) => {
    if (item.estadoTransaccion == "VAL" || item.estadoTransaccion == "ENV") {
      return setTimeRemaining(item);
    }
    return null;
  };

  const setTimeRemaining = (item) => {
    // <<<<<<< HEAD
    //     var timeValidated = new Date(item?.fechaAceptacionQury);
    //     var timeExpired = new Date(
    //       timeValidated.getTime() + item?.tiempoEntrega * 86400000
    //     );
    //     var now = new Date();
    //     return msToTime(timeExpired.getTime() - now.getTime());
    //   };
    var timeValidated = new Date(item?.fechaAceptacionQury);
    var timeExpired = new Date(
      timeValidated.getTime() + item?.tiempoEntrega * 86400000
    );
    var now = new Date();
    return timeExpired.getTime() - now.getTime() > 0
      ? dhm(timeExpired.getTime() - now.getTime())
      : "Expirado";
  };

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

  const renderPlaceholder = () => {
    let holders = Array.from(Array(4));
    let y = 0;
    let height = 120;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />
          <Rect x="20" y="60" rx="8" ry="8" width="35%" height="20" />
          <Rect x="220" y="60" rx="8" ry="8" width="35%" height="20" />
          <Rect x="0" y="110" rx="8" ry="8" width="100" height="20" />
          <Rect x="120" y="110" rx="8" ry="8" width="100" height="20" />

          {holders.map((item, index) => {
            y = index == 0 ? height + 40 : y + height + 20;
            return (
              <Fragment key={index}>
                <Rect x="0" y={y} rx="8" ry="8" width="100%" height={height} />
                <Rect x="20" y={y + 10} rx="8" ry="8" width="110" height={10} />
                <Rect x="20" y={y + 30} rx="8" ry="8" width="85%" height={10} />
                <Rect x="20" y={y + 52} rx="8" ry="8" width="85%" height={1} />
                <Rect x="20" y={y + 70} rx="8" ry="8" width="110" height={10} />
                <Rect x="20" y={y + 90} rx="8" ry="8" width="20%" height={10} />
                <Rect
                  x="70%"
                  y={y + 80}
                  rx="8"
                  ry="8"
                  width="20%"
                  height={10}
                />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const listEmptyComponent = () => (
    <View
      style={{
        height: 500,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 20 }}>Pedidos no disponibles</Text>
    </View>
  );

  const renderContent = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: colors.backgroundContain }}
      >
        <View
          style={[
            styles.headerView,
            {
              borderBottomColor: colors.border,
              backgroundColor: colors.background,
            },
          ]}
        >
          <View style={{ marginBottom: 5 }}>
            <Text numberOfLines={1} style={{ fontWeight: "700", fontSize: 24 }}>
              {t("Pedidos")}
            </Text>
          </View>
          <View
          //style={[{ flex: 1, }]}
          >
            <View
              style={{
                flexDirection: "row",
                //paddingHorizontal: 20,
                paddingVertical: 16,
              }}
            >
              {TABS.map((tab) => (
                <View key={tab.id} style={{ flex: 1, padding: 4 }}>
                  <Tag
                    primary={true}
                    style={{
                      backgroundColor:
                        tab.id == tabChoosed.id
                          ? colors.orangeColor
                          : colors.ventasColorDownBox,
                    }}
                    textStyle={{
                      color:
                        tab.id == tabChoosed.id
                          ? BaseColor.whiteColor
                          : colors.text,
                    }}
                    onPress={() => setTabChoosed(tab)}
                  >
                    {tab.title}
                  </Tag>
                </View>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                }}
                onPress={() => setModalFilterVisible(true)}
              >
                <Image
                  style={{ width: 24, height: 22, marginRight: 5 }}
                  source={Images.filter}
                />
                <Text bold>Filtrar por estado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setModalSortVisible(true)}
              >
                <Image
                  style={{ width: 24, height: 22, marginRight: 5 }}
                  source={Images.catalogo}
                />
                <Text bold>Ordenar</Text>
              </TouchableOpacity>
            </View>
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
              // backgroundColor: "#F6F5F5",
              backgroundColor: colors.backgroundContain,
              width: "94%",
              marginHorizontal: 16,
              marginTop: 16,
              borderRadius: 4,
              marginBottom: 180,
            }}
          >
            <FlatList
              //contentContainerStyle={{ marginBottom: 500 }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={false}
              ref={flatlistRef}
              ListEmptyComponent={() => listEmptyComponent()}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {
                    listTransactions();
                  }}
                />
              }
              data={products}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item, index }) => (
                <ProductList6
                  description={formatQuantity(item)}
                  order={"#" + item.id}
                  salePrice={"S/" + item.precioTotal}
                  status={formatStatus(item)}
                  color={formatColor(item.estadoTransaccion)}
                  date={formatDate(item.fechaCreacion)}
                  timeLeft={checkTimeRemaining(item)}
                  secondUser={
                    tabChoosed.id == 1
                      ? item.comprador.nombres + " " + item.comprador.apellidos
                      : item.vendedor.nombres + " " + item.vendedor.apellidos
                  }
                  style={{ backgroundColor: colors.ventasColorDownBox }}
                  onPress={() =>
                    navigation.navigate("ETrackOrder", {
                      itemInit: item,
                      txId: item.id,
                      index: tabChoosed.id,
                    })
                  }
                />
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: "always" }}
      >
        {loading ? renderPlaceholder() : renderContent()}
      </SafeAreaView>
      <ModalFilter
        onBackdropPress={() => {
          setModalFilterVisible(false);
        }}
        isVisible={modalFilterVisible}
        onSwipeComplete={() => setModalFilterVisible(false)}
        onApply={(filter) => {
          setModalFilterVisible(false);
          filterArray(filter);
        }}
      />
      <ModalSort
        onBackdropPress={() => {
          setModalSortVisible(false);
        }}
        isVisible={modalSortVisible}
        onSwipeComplete={() => setModalSortVisible(false)}
        onApply={(index) => {
          setModalSortVisible(false);
          sortArray(index);
        }}
      />
    </View>
  );
};

export default EMyOrder;
