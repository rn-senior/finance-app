import { Button, Header, Icon, SafeAreaView, Text } from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
import React, { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import { postAsync, patchAsync, getAsync } from "../../services/ConnectApi";
import { useSelector, useStore } from "react-redux";
import TextInputMask from "react-native-text-input-mask";
import RNPickerSelect from "react-native-picker-select";
import ContentLoader, { Rect } from "react-content-loader/native";
import Spinner from "react-native-loading-spinner-overlay";

export default function ECharge({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [paymentEntry, setPaymentEntry] = useState(route.params?.paymentEntry);
  const [id, setId] = useState(0);
  const [titular, setTitular] = useState("");
  const [numCuenta, setNumCuenta] = useState("");
  const [entFinanciera, setEntFinanciera] = useState("");
  const [pressButton, setPressButton] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const userId = useSelector((state) => state.auth.login.success.profile.id);

  const [success, setSuccess] = useState({
    numCuenta: true,
    entFinanciera: true,
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
  ];

  const listPaymentEntry = () => {
    if (paymentEntry[0]) {
      setId(paymentEntry[0].id);
      setEntFinanciera(paymentEntry[0].entidad);
      setNumCuenta(paymentEntry[0].numero);
      setTitular(paymentEntry[0].nombre);
    } else {
      setSuccess({
        ...success,
        numCuenta: false,
        entFinanciera: false,
        titular: false,
      });
    }
  };

  // const listPaymentEntry = () => {
  //   getAsync(
  //     "/paymententry?usuario_id=" + userId,
  //     {
  //       onSuccess: (response) => {
  //         console.log(response);
  //         if (response[0]) {
  //           let { id, entidad, numero, nombre } = response[0];
  //           setPaymentEntry(response[0]);
  //           setId(id);
  //           setEntFinanciera(entidad);
  //           setNumCuenta(numero);
  //           setTitular(nombre);
  //         } else {
  //           setSuccess({
  //             ...success,
  //             numCuenta: false,
  //             entFinanciera: false,
  //             titular: false,
  //           });
  //         }
  //       },
  //       onError: (error) => {}, // id:Session.user.id,
  //     },
  //     null
  //   );
  // };

  useEffect(() => {
    listPaymentEntry();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const validateNumCuenta = () => {
    const reg = /^[0-9]{20}$/;
    return reg.test(numCuenta);
  };

  const validateFinanciera = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(entFinanciera);
  };

  const validateTitular = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(titular);
  };

  const onDelete = () => {
    setSpinner(true);
    patchAsync(
      "/paymententry",
      {
        onSuccess: (response) => {},
        onError: (error) => {},
        data: { id: id, estado: "0" },
      },
      null
    );
    patchAsync(
      "/usuarios",
      {
        onSuccess: (response) => {},
        onError: (error) => {},
        data: { id: userId, estadoCatalogo: "0" },
      },
      null
    );
    setTimeout(() => {
      setSpinner(false);
      navigation.goBack();
    }, 1000);
  };

  const deletePaymethod = () => {
    Alert.alert(
      "Aviso",
      "Estas seguro de aplicar los cambios? \n Esto desactivará tu catalogo",
      [
        { text: "Cancel", style: "destructive" },
        { text: "Confirmar", onPress: onDelete },
      ]
    );
  };

  const addPaymentEntry = (body) => {
    body.usuario_id = userId;
    postAsync(
      "/paymententry",
      {
        onSuccess: (response) => {},
        onError: (error) => {},
        data: body,
      },
      null
    );
  };

  const editPaymetEntry = (body) => {
    body.id = id;
    patchAsync(
      "/paymententry",
      {
        onSuccess: (response) => {
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert("Error", error);
        },
        data: body,
      },
      null
    );
  };

  const onPressFinanciera = () => {
    setPressButton(true);
    if (!validateNumCuenta() || !validateFinanciera() || !validateTitular()) {
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
      if (!id) {
        addPaymentEntry({
          nombre: titular,
          tipo: "TI",
          entidad: entFinanciera,
          moneda: "SOLES",
          numero: numCuenta,
        });
      }
      editPaymetEntry({
        entidad: entFinanciera,
        numero: numCuenta,
        nombre: titular,
      });
    }
  };

  const renderPlaceholder = () => {
    let y = 10;
    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Fragment>
            <Rect x="0" y={y + 5} rx="8" ry="8" width="60%" height={20} />
            <Rect x="0" y={y + 40} rx="4" ry="4" width="100%" height={40} />
            <Rect x="0" y={y + 120} rx="8" ry="8" width="60%" height={20} />
            <Rect x="0" y={y + 155} rx="4" ry="4" width="100%" height={40} />
            <Rect x="0" y={y + 235} rx="8" ry="8" width="60%" height={20} />
            <Rect x="0" y={y + 270} rx="4" ry="4" width="100%" height={40} />
            <Rect x="25%" y={y + 350} rx="4" ry="4" width="50%" height={20} />
            <Rect x="25%" y={y + 385} rx="4" ry="4" width="50%" height={20} />
          </Fragment>
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            marginTop: 20,
          }}
        >
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
              mask={"[00000000000000000000]"}
            />
            {success.numCuenta || !pressButton ? null : (
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
              // pickerProps={{ style: { overflow: "hidden" } }}
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
                  borderBottomColor: success.entFinanciera
                    ? "#79A4DD"
                    : "#C9C9C9",
                  borderRadius: 4,
                  width: "100%",
                  alignSelf: "center",
                  backgroundColor: "white",
                },
                inputAndroid: {
                  marginTop: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: success.entFinanciera
                    ? "#79A4DD"
                    : "#C9C9C9",
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
            {success.entFinanciera || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Elija su entidad financiera
              </Text>
            )}
            <Text
              medium
              style={{
                color: "#747474",
                fontSize: 16,
                marginBottom: 8,
                marginTop: 35,
              }}
            >
              Titular de la cuenta
            </Text>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.titular ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  marginBottom: 12,
                  backgroundColor: colors.card,
                },
              ]}
              onChangeText={(text) => {
                text = text.replace(/[0-9]/g, "");
                setTitular(text);
              }}
              autoCorrect={false}
              placeholder={"Ingresa el nombre del titular"}
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              onPressFinanciera();
            }}
          >
            <Text
              style={{
                color: "#3279D7",
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              {id ? "Guardar cambios" : "Agregar método de cobro"}
            </Text>
          </TouchableOpacity>
          {id ? (
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
                Eliminar método
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <Header
          title={
            loading
              ? ""
              : id
              ? "Editar método de cobro"
              : "Agregar método de cobro"
          }
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: "white" }}
        />
        <Spinner visible={spinner} />
        <View style={{ flex: 1, backgroundColor: colors.backgroundContain }}>
          {loading ? renderPlaceholder() : renderContent()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
