import { Header, Icon, SafeAreaView, Text, TextInput } from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  View,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import { useStore } from "react-redux";
import TextInputMask from "react-native-text-input-mask";
import RNPickerSelect from "react-native-picker-select";
import { patchAsync } from "../../services/ConnectApi";

export default function EPayment({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { id } = route.params;
  const [numTarjeta, setNumTarjeta] = useState(route.params.numero);
  const [numCuenta, setNumCuenta] = useState(route.params.numero);
  const [entFinanciera, setEntFinanciera] = useState(route.params.entidad);
  const [titular, setTitular] = useState(route.params.nombre);
  const [tipo, setTipo] = useState(route.params.tipo);
  const [fecha, setFecha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [arrow, setArrow] = useState(false);
  const [marcaTarget, setMarcaTarget] = useState(route.params.marca);

  const store = useStore();
  const userId = store.getState().auth.login.success.profile.id;

  const [success, setSuccess] = useState({
    numTarjeta: true,
    numCuenta: true,
    entFinanciera: true,
    fecha: true,
    codigo: true,
    titular: true,
  });

  const bancos = [
    { label: "Interbank", value: "Interbank", key: "interbank" },
    {
      label: "Scotiabank",
      value: "Scotiabank",
      key: "scotiabank",
    },
    { label: "BBVA", value: "BBVA", key: "bbva" },
    {
      label: "Banco de Crédito del Perù",
      value: "Banco de Crédito del Perù",
      key: "bcp",
    },
    { label: "Mi Banco", value: "Mi Banco", key: "mibanco" },
    {
      label: "Banco Falabella",
      value: "Banco Falabella",
      key: "bancofalabella",
    },
    { label: "Citibank", value: "Citibank", key: "citibank" },
    {
      label: "BanBif",
      value: "BanBif",
      key: "banbif",
    },
  ];

  const validateNumTarjeta = () => {
    const reg = /^[0-9]{13,18}$/;
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

  const validateNumCuenta = () => {
    const reg = /^[0-9]{20}$/;
    return reg.test(numCuenta);
  };

  const validateFinanciera = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(entFinanciera);
  };

  const onDelete = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const deletePaymethod = () => {
    patchAsync(
      "/payment",
      {
        onSuccess: (response) => {
          onDelete();
          //listAdress()
        },
        onError: (error) => {},
        data: { id: id, estado: "0" }, // id:Session.user.id,
      },
      null
    );
  };

  const onPressTarjeta = () => {
    if (
      !validateNumTarjeta() ||
      !validateFecha() ||
      !validateCodigo() ||
      !validateTitular()
    ) {
      setSuccess({
        ...success,
        numTarjeta: validateNumTarjeta() ? true : false,
        fecha: validateFecha() ? true : false,
        codigo: validateCodigo() ? true : false,
        titular: validateTitular() ? true : false,
      });
    } else {
      setSuccess({
        ...success,
        numTarjeta: true,
        fecha: true,
        codigo: true,
        titular: true,
      });

      editPaymethod({
        nombre: titular,
        numero: numTarjeta,
      });
    }
  };

  const onPressFinanciera = () => {
    if (!validateNumCuenta() || !validateFinanciera()) {
      setSuccess({
        ...success,
        numCuenta: validateNumCuenta() ? true : false,
        entFinanciera: validateFinanciera() ? true : false,
      });
    } else {
      setSuccess({
        ...success,
        numCuenta: true,
        entFinanciera: true,
      });

      // addPaymethod({
      //   // nombre: "",
      //   tipo: "TI",
      //   entidad: entFinanciera,
      //   moneda: "SOLES",
      //   numero: numTarjeta,
      // });

      editPaymethod({
        entidad: entFinanciera,
        numero: numCuenta,
      });
    }
  };

  const editPaymethod = (body) => {
    body.id = route.params.id;
    patchAsync(
      "/payment",
      {
        onSuccess: (response) => {
          navigation.navigate("Payment");
        },
        onError: (error) => {
          Alert.alert("Error", error);
        },
        data: body, // id:Session.user.id,
      },
      null
    );
  };

  /**
   *
   * Called when process checkout
   */
  const onCheckOut = () => {
    const bookingType = route.params?.bookingType;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("EConfirmed");
    }, 500);
  };

  const onChangType = (item) => {
    setType(item);
  };

  const renderTransferencia = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ backgroundColor: colors.backgroundContain }}>
        <Text
          medium
          style={[
            styles.generalText,
            {
              marginTop: 7,
            },
          ]}
        >
          Número de cuenta
        </Text>
        <TextInputMask
          onKeyPress={() => {
            if (!success.numCuenta) {
              setSuccess({
                ...success,
                numCuenta: true,
              });
            }
          }}
          onChangeText={(formatted, extracted) => {
            setNumCuenta(extracted);
          }}
          autoCorrect={false}
          placeholder={"Ingrese su número de cuenta"}
          value={numCuenta}
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.numCuenta ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
              backgroundColor: "#fff",
            },
          ]}
          mask={"[00000]-[00000]-[00000]-[00000]"}
        />
        {success.numCuenta ? null : (
          <Text style={{ color: "#C62105", marginTop: 5 }}>
            Ingrese un nro de cuenta válido
          </Text>
        )}

        <Text
          medium
          style={[
            styles.generalText,
            {
              marginTop: 35,
            },
          ]}
        >
          Entidad Financiera
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Selecciona tu entidad financiera" }}
          items={bancos}
          doneText="Cerrar"
          onValueChange={(value) => setEntFinanciera(value)}
          Icon={() => {
            return (
              <Icon
                name={arrow ? "chevron-up" : "chevron-down"}
                size={12}
                solid
                color={arrow ? "#3279D7" : BaseColor.grayColor}
              />
            );
          }}
          onOpen={() => {
            setSuccess({
              ...success,
              entFinanciera: true,
            });
            setArrow(true);
          }}
          onClose={() => {
            setArrow(false);
          }}
          value={entFinanciera}
          style={{
            inputIOS: {
              marginTop: 10,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: success.entFinanciera ? "#79A4DD" : "#C9C9C9",
              borderRadius: 4,
              width: "100%",
              alignSelf: "center",
              // color: success.departamento ? "#1B1B1B" : "#C9C9C9",
              backgroundColor: "white",
            },
            inputAndroid: {
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: success.entFinanciera ? "#79A4DD" : "#C9C9C9",
              borderRadius: 8,
              width: "100%",
              alignSelf: "center",
              color: "#1B1B1B",
              backgroundColor: "white",
            },
            placeholder: {
              color: "#C9C9C9",
              backgroundColor: "white",
            },
            iconContainer: {
              top: 25,
              right: 15,
            },
          }}
        />
        {success.entFinanciera ? null : (
          <Text style={{ color: "#C62105", marginTop: 5 }}>
            Elija su entidad financiera
          </Text>
        )}
      </View>
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
            style={[
              styles.tarjets,
              {
                borderColor: marcaTarget === "VISA" ? "#0191CB" : "#EEECEC",
                backgroundColor: "#fff",
              },
            ]}
          >
            <Image
              source={Images.tarjVisa2}
              style={{ width: 52, height: 32 }}
            />
          </View>
          <View
            style={[
              styles.tarjets,
              {
                borderColor:
                  marcaTarget === "MASTERCARD" ? "#0191CB" : "#EEECEC",
                backgroundColor: "#fff",
                marginHorizontal: 5,
              },
            ]}
          >
            <Image
              source={Images.tarjMastercard2}
              style={{ width: 45, height: 28 }}
            />
          </View>
          <View
            style={[
              styles.tarjets,
              {
                borderColor:
                  marcaTarget === "AMERICAN EXPRESS" ? "#0191CB" : "#EEECEC",
                backgroundColor: "#006FCF",
              },
            ]}
          >
            <Image
              source={Images.tarjAmerican3}
              style={{ width: 53, height: 30 }}
            />
          </View>
        </View>
        <Text
          medium
          style={[
            styles.generalText,
            {
              marginTop: 7,
            },
          ]}
        >
          Número de tarjeta
        </Text>

        <TextInputMask
          // onChangeText={(formatted, extracted) => {
          //   setNumTarjeta(extracted);
          //   if (numTarjeta.length > 3) {
          //     if (numTarjeta[0] === "3" && numTarjeta[1] === "4") {
          //       setMarcaTarget("AMERICAN EXPRESS");
          //     } else if (numTarjeta[0] === "4") {
          //       setMarcaTarget("VISA");
          //     } else if (numTarjeta[0] === "5") {
          //       setMarcaTarget("MASTERCARD");
          //     }
          //   } else {
          //     setMarcaTarget("");
          //   }
          // }}
          autoCorrect={false}
          placeholder={"Ingresa el número de tu tarjeta"}
          value={numTarjeta}
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.numTarjeta ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
              backgroundColor: "#fff",
            },
          ]}
          editable={false}
          mask={"[0000]-[0000]-[0000]-[0000]"}
          // onFocus={() => {
          //   setSuccess({
          //     ...success,
          //     numTarjeta: true,
          //   });
          // }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <View style={{ flex: 5.5, marginHorizontal: 7 }}>
            <Text style={styles.rowText}>Fecha de expiración</Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setFecha(formatted);
              }}
              autoCorrect={false}
              placeholder={t("Fecha")}
              value={fecha}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.fecha ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  backgroundColor: "#fff",
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
            {success.fecha ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese una fecha válida
              </Text>
            )}
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.rowText}>CVV/CVV2</Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setCodigo(extracted);
              }}
              autoCorrect={false}
              placeholder={t("Código")}
              value={codigo}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.codigo ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  backgroundColor: "#fff",
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
            {success.codigo ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese un código válido
              </Text>
            )}
          </View>
        </View>
        <Text
          medium
          style={[
            styles.generalText,
            {
              marginTop: 35,
            },
          ]}
        >
          Titular de la tarjeta
        </Text>
        <TextInput
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.titular ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
            },
          ]}
          editable={false}
          // onChangeText={(text) => {
          //   text = text.replace(/[0-9]/g, "");
          //   setTitular(text);
          // }}
          autoCorrect={false}
          placeholder={"Ingresa nombre del titular de tu tarjeta"}
          autoCapitalize="sentences"
          value={titular}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: colors.backgroundContain }}
      >
        <Header
          title={t("Editar Método de Pago")}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: colors.background }}
        />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              marginTop: 20,
              // paddingHorizontal: 20,
            }}
          >
            {/* {tipo == "TC" ? renderTarjeta() : renderTransferencia()} */}
            {renderTarjeta()}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => {
                // tipo == "TC" ? onPressTarjeta() : onPressFinanciera();
                onPressTarjeta();
              }}
            >
              <Text
                style={{
                  color: "#3279D7",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Guardar cambios
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
              }}
              onPress={deletePaymethod}
            >
              <Text
                style={{
                  color: "#C62105",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Eliminar método de pago
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
