import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Header,
  ProductMetadata,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import * as Utils from "@utils";
import Spinner from "react-native-loading-spinner-overlay";
import { getAsync, postAsync } from "../../services/ConnectApi";
import TextInputMask from "react-native-text-input-mask";

const ETCancelled = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { tx } = route.params;
  const [spinner, setSpinner] = useState(false);
  const [optionChossed, setOptionChoosed] = useState("");
  const [code, setCode] = useState("");

  const updateTransaction = () => {
    setSpinner(true);
    const body = {
      usuarioIdVendedor: -1,
      usuarioIdComprador: -1,
      metodoCobro: -1,
      metodoPago: -1,
      cantidad: -1,
      precioTotal: -1,
      estadoTransaccionNuevo: "CAN",
      descripcion: "",
      codigoTransaccion: tx.id,
      direccionId: -1,
      detalleTransaccion: -1,
      codigoConfirmacionIn: -1,
      tipoEntrega: -1,
      tiempoEntrega: -1,
      codigoCancelacionIn: code,
    };
    postAsync(
      "/updatetransaction",
      {
        onSuccess: (response) => {
          setSpinner(false);
          if (response[0].respuesta != "CAN|ERROR") {
            navigation.goBack();
          } else {
            Alert.alert("Error", "Vuelva a intentarlo", [
              { text: "Aceptar", onPress: () => {}, style: "cancel" },
            ]);
          }
        },
        onError: (error) => {
          setSpinner(false);
        },
        data: body,
      },
      null
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Spinner visible={spinner} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "#FFF" }}
      >
        <Header
          title={""}
          renderRight={() => {
            return (
              <Image source={Images.close} style={{ width: 20, height: 20 }} />
            );
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: "#fff" }}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[styles.headerView, { borderBottomColor: colors.border }]}
          >
            <Image
              source={Images.close}
              style={{
                width: 40,
                height: 40,
                marginTop: 50,
                marginBottom: 30,
              }}
            />

            <Text style={{ marginBottom: 10, fontSize: 28, fontWeight: "700" }}>
              Cancelar Pedido
            </Text>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              {
                "Al cancelar se procederá con la devolución del dinero aplicando las políticas de devolución aceptadas. Para esto, usted deberá solicitar el código de cancelación al vendedor y deberá ingresarlo debajo."
              }
            </Text>
            {/* <Text style={{ marginVertical: 10 }}>Con esto autoriza la cancelación del pedido y la devolución de la garantía.</Text> */}

            <View
              style={{
                borderWidth: 1,
                borderColor: "#EEECEC",
                width: 204,
                height: 37,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>
                PEDIDO <Text bold>{tx ? "#" + tx.id : "#000000"}</Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Icon solid name="circle" size={8} solid color={"#C62105"} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  numberOfLines={1}
                  solid
                  style={{ color: "#C62105", fontSize: 16, fontWeight: "700" }}
                >
                  {"CANCELADO"}
                </Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                //width: "100%",
                paddingTop: 25,
                alignContent: "center",
              }}
            >
              <View
                style={{
                  marginHorizontal: 10,
                  //backgroundColor: "#0191CB",
                  borderRadius: 3,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
              >
                <TextInputMask
                  onChangeText={(formatted, extracted) => {
                    setCode(extracted);
                  }}
                  autoCorrect={false}
                  placeholder={"Código"}
                  placeholderTextColor={BaseColor.grayColor}
                  value={code}
                  style={[
                    BaseStyle.textInput,
                    {
                      borderColor: true ? "#79A4DD" : "#C9C9C9",
                      borderWidth: 1,
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderRadius: 6,
                      //height: 35,
                      width: 100,
                      //paddingLeft: code.length > 0 ? 33 : 25,
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    },
                  ]}
                  mask={"[0000]"}
                  onKeyPress={() => {}}
                />
              </View>
            </View>

            <Text style={{ marginVertical: 30 }}>
              {"¿Esta seguro de cancelar el pedido?"}
            </Text>

            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Button
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  flex: 1,
                  backgroundColor: "#f5a742",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                {"No"}
              </Button>
              <Button
                style={{
                  marginBottom: 20,
                  marginHorizontal: 10,
                  flex: 1,
                  backgroundColor:
                    code.length <= 0 ? "#C9C9C9" : colors.orangeColor,
                }}
                onPress={() => {
                  updateTransaction();
                }}
                disabled={code.length <= 0 ? true : false}
              >
                {"Sí"}
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ETCancelled;
