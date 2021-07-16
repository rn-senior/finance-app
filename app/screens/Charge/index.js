import {
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
  CategoryBoxColor4,
} from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Switch,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import { useStore } from "react-redux";
import { getAsync } from "../../services/ConnectApi";
import TextInputMask from "react-native-text-input-mask";
import { postAsync } from "../../services/ConnectApi";
import { useIsFocused } from "@react-navigation/native";

export default function Charge({ route, navigation }) {
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);
  const [numTarjeta, setNumTarjeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [titular, setTitular] = useState("");
  const [marcaTarget, setMarcaTarget] = useState("");
  const [add, setAdd] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [success, setSuccess] = useState({
    numTarjeta: false,
    fecha: false,
    codigo: false,
    titular: false,
    marca: false,
  });
  const [paymentEntry, setPaymentEntry] = useState({});
  const [chargeChoosed, setChargeChoosed] = useState({});
  const store = useStore();
  const userId = store.getState().auth.login.success.profile.id;
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [paymentEntryEdit, setPaymentEntryEdit] = useState({});
  const [pressButton, setPressButton] = useState(false);

  /**
   *
   * Called when process checkout
   */
  const onMyQury = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 500);
  };

  const handleChooseEdit = (item) => {
    setPaymentEntryEdit(item);
  };

  const onChangType = (item) => {
    setType(item);
  };

  const validateNumTarjeta = () => {
    // let firstLetter = numTarjeta.charAt(0)
    // if(firstLetter == "4" || firstLetter === "3" || firstLetter === "5"){
    //   return true
    // }
    // const reg = /^[0-9]{13,18}$/;
    // return reg.test(numTarjeta);
    const reg = /^[345]+[0-9]{12,17}$/;
    return reg.test(numTarjeta);
  };

  const validateCodigo = () => {
    const reg = /^[0-9]{3,5}$/;
    return reg.test(codigo);
  };

  const validateFecha = () => {
    if (fecha.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateTitular = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(titular);
  };

  const validateMarca = () => {
    const reg = /^[A-Z\s]{4,}$/;
    return reg.test(marcaTarget);
  };

  const listPaymentEntry = () => {
    getAsync(
      "/paymententry?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          setPaymentEntry(response);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  const addPaymentEntry = (body) => {
    body.usuario_id = userId;
    postAsync(
      "/paymententry",
      {
        onSuccess: (response) => {
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "Payment" }],
          // });
          setAdd(false);
          listPaymentEntry();
        },
        onError: (error) => {},
        data: body, // id:Session.user.id,
      },
      null
    );
  };

  const onPressTarjeta = () => {
    setPressButton(true);
    if (
      !validateNumTarjeta() ||
      !validateFecha() ||
      !validateCodigo() ||
      !validateTitular() ||
      !validateMarca()
    ) {
      setSuccess({
        ...success,
        numTarjeta: validateNumTarjeta() ? true : false,
        fecha: validateFecha() ? true : false,
        codigo: validateCodigo() ? true : false,
        titular: validateTitular() ? true : false,
        marca: validateMarca() ? true : false,
      });
    } else {
      setSuccess({
        ...success,
        numTarjeta: true,
        fecha: true,
        codigo: true,
        titular: true,
        marca: true,
      });

      addPaymentEntry({
        nombre: titular,
        tipo: "TC",
        marca: marcaTarget,
        //entidad: "Interbank",
        moneda: "SOLES",
        numero: numTarjeta,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      listPaymentEntry();
    }
  }, [isFocused]);

  const handleChoose = (item) => {
    setChargeChoosed(item);
  };

  const renderAgregarMetodoPago = () => {
    return (
      <View style={{ marginTop: 15 }}>
        <Text headline>{t("Agregar Método de Cobro")}</Text>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "rgb(251,251,251)",
          }}
        >
          {renderTarjeta()}
        </View>
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginBottom: "2%",
            alignItems: "center",
          }}
          onPress={() => {
            onPressTarjeta();
          }}
        >
          <Text
            style={{
              color: "#3279D7",
              fontSize: 14,
              textDecorationLine: "underline",
            }}
          >
            Guardar método de cobro
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPaymethod = () => {
    return (
      <>
        {paymentEntry.length > 0 ? (
          <>
            {paymentEntry.map((item, index) => {
              const num = item.numero.length;
              return (
                <CategoryBoxColor4
                  key={item.id}
                  id={item.id}
                  checked={chargeChoosed.id == item.id}
                  nombre={!item.nombre ? item.entidad : item.nombre}
                  numTarjeta={"*".repeat(4) + " " + item.numero.slice(num - 4)}
                  appear={true}
                  numCuenta={
                    "**** " +
                    "**** " +
                    "****" +
                    "**** " +
                    "**** " +
                    item.numero.slice(num - 4)
                  }
                  onPress={() => handleChoose(item)}
                  onEdit={() => {
                    handleChooseEdit(item);
                    navigation.navigate("ECharge", {
                      id: item.id,
                      nombre: item.nombre,
                      numero: item.numero,
                      tipo: item.tipo,
                      moneda: item.moneda,
                      marca: item.marca,
                    });
                  }}
                  onDelete={listPaymentEntry}
                  style={{ marginBottom: 22 }}
                />
              );
            })}
          </>
        ) : (
          <View
            style={[
              styles.content,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
              }}
            >
              No hay métodos de cobro registrados
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderTarjeta = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ backgroundColor: colors.backgroundContain }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 1.8,
              borderColor: marcaTarget === "VISA" ? "#0191CB" : "#EEECEC",
              width: 50,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#fff",
            }}
          >
            <Image source={Images.tarjVisa} style={{ width: 36, height: 17 }} />
          </View>
          <View
            style={{
              borderWidth: 1.8,
              borderColor: marcaTarget === "MASTERCARD" ? "#0191CB" : "#EEECEC",
              width: 50,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#fff",
              marginHorizontal: 5,
            }}
          >
            <Image
              source={Images.tarjMastercard}
              style={{ width: 36, height: 17 }}
            />
          </View>
          <View
            style={{
              borderWidth: 1.8,
              borderColor:
                marcaTarget === "AMERICAN EXPRESS" ? "#0191CB" : "#EEECEC",
              width: 50,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#006FCF",
            }}
          >
            <Image
              source={Images.tarjAmerican}
              style={{ width: 36, height: 17 }}
              resizeMode="cover"
            />
          </View>
        </View>
        <Text
          medium
          style={{
            color: "#747474",
            fontSize: 16,
            marginBottom: 8,
            marginTop: "2%",
          }}
        >
          Número de tarjeta
        </Text>

        <TextInputMask
          onChangeText={(formatted, extracted) => {
            setNumTarjeta(extracted);
            if (numTarjeta.length > 3) {
              if (numTarjeta[0] === "3" && numTarjeta[1] === "4") {
                setMarcaTarget("AMERICAN EXPRESS");
              } else if (numTarjeta[0] === "4") {
                setMarcaTarget("VISA");
              } else if (numTarjeta[0] === "5") {
                setMarcaTarget("MASTERCARD");
              }
            } else {
              setMarcaTarget("");
            }
          }}
          autoCorrect={false}
          placeholder={"Ingresa el número de tu tarjeta"}
          placeholderTextColor={BaseColor.grayColor}
          value={numTarjeta}
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.numTarjeta ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          mask={"[0000]-[0000]-[0000]-[0000]"}
          onKeyPress={() => {
            if (!success.numTarjeta) {
              setSuccess({
                ...success,
                numTarjeta: true,
              });
            }
          }}
        />
        {success.numTarjeta || !pressButton ? null : (
          <Text style={{ color: "#C62105", marginTop: 5 }}>
            Ingrese un número de tarjeta válido
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            marginTop: "6%",
          }}
        >
          <View style={{ flex: 5.5, marginHorizontal: "2%" }}>
            <Text
              style={{
                color: "#747474",
                marginVertical: "6%",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Fecha de expiración
            </Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setFecha(formatted);
              }}
              autoCorrect={false}
              placeholder={t("Fecha")}
              placeholderTextColor={BaseColor.grayColor}
              value={fecha}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.fecha ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  backgroundColor: colors.card,
                  color: colors.text,
                },
              ]}
              mask={"[00]/[00]"}
              onKeyPress={() => {
                if (!success.fecha) {
                  setSuccess({
                    ...success,
                    fecha: true,
                  });
                }
              }}
            />
            {success.fecha || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese una fecha
              </Text>
            )}
          </View>
          <View style={styles.inputItem}>
            <Text
              style={{
                color: "#747474",
                marginVertical: "6%",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              CVV/CVV2
            </Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setCodigo(extracted);
              }}
              autoCorrect={false}
              placeholder={t("Código")}
              placeholderTextColor={BaseColor.grayColor}
              value={codigo}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.codigo ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  backgroundColor: colors.card,
                  color: colors.text,
                },
              ]}
              mask={"[0000]"}
              onKeyPress={() => {
                if (!success.codigo) {
                  setSuccess({
                    ...success,
                    codigo: true,
                  });
                }
              }}
            />
            {success.codigo || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese su CVV
              </Text>
            )}
          </View>
        </View>
        <Text
          medium
          style={{
            color: "#747474",
            fontSize: 16,
            marginBottom: 8,
            marginTop: "10%",
          }}
        >
          Titular de la tarjeta
        </Text>
        <TextInput
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.titular ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
              marginBottom: 12,
            },
          ]}
          onChangeText={(text) => {
            text = text.replace(/[0-9]/g, "");
            setTitular(text);
          }}
          autoCorrect={false}
          placeholder={"Ingresa nombre del titular de tu tarjeta"}
          autoCapitalize="sentences"
          value={titular}
          onKeyPress={() => {
            if (!success.titular) {
              setSuccess({
                ...success,
                titular: true,
              });
            }
          }}
        />
        {success.titular || !pressButton ? null : (
          <Text style={{ color: "#C62105", marginTop: 5 }}>
            Ingrese un nombre válido
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "rgb(246,245,245)" }}
      >
        <Header
          title={t("Método de Cobro")}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: "#fff", marginBottom: 20 }}
        />

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          {renderPaymethod()}
          {add ? renderAgregarMetodoPago() : null}

          <View
            style={{
              height: 40,
              flex: 1,
              marginBottom: 14,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                setAdd(!add);
                setPressButton(false);
              }}
            >
              <Icon name={add ? "times" : "plus"} size={16} color={"#0191CB"} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: "#0191CB",
                  marginLeft: 8,
                }}
              >
                {add ? "Cerrar" : "Agregar nuevo método de cobro"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
