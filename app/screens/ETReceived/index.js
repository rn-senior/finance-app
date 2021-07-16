import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Header,
  StatusLine,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

const ETReceived = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { tx } = route.params;
  const [spinner, setSpinner] = useState(false);
  const [optionChossed, setOptionChoosed] = useState("");
  const [rcbCode, setRcbCode] = useState("");

  const updateTransaction = () => {
    setSpinner(true);
    const body = {
      usuarioIdVendedor: -1,
      usuarioIdComprador: -1,
      metodoCobro: -1,
      metodoPago: -1,
      cantidad: -1,
      precioTotal: -1,
      estadoTransaccionNuevo: "RCB",
      descripcion: "",
      codigoTransaccion: tx.id,
      direccionId: -1,
      detalleTransaccion: -1,
      codigoConfirmacionIn: rcbCode,
      tipoEntrega: -1,
      tiempoEntrega: -1,
      codigoCancelacionIn: -1,
    };
    postAsync(
      "/updatetransaction",
      {
        onSuccess: (response) => {
          setSpinner(false);
          navigation.goBack();
        },
        onError: (error) => {
          setSpinner(false);
          console.log(error);
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
              source={Images.check}
              style={{ width: 40, height: 40, marginTop: 60, marginBottom: 30 }}
            />

            <Text
              style={{
                marginBottom: 10,
                fontSize: 28,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Confirmar entrega del pedido
            </Text>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              {"Ingrese el código de entrega proporcionado por el comprador. Al aceptar se notificará al comprador la entrega del pedido y este pasará a ENTREGADO."}
            </Text>

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
              <Icon solid name="circle" size={8} solid color={"#2AB361"} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  numberOfLines={1}
                  solid
                  style={{ color: "#2AB361", fontSize: 16, fontWeight: "700" }}
                >
                  {"ENTREGADO"}
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
                    setRcbCode(extracted);
                  }}
                  autoCorrect={false}
                  placeholder={"Código"}
                  placeholderTextColor={BaseColor.grayColor}
                  value={rcbCode}
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
                  onKeyPress={() => { }}
                />
              </View>
            </View>

            <Text style={{ marginVertical: 30 }}>
              {"¿Está seguro de confirmar la entrega del pedido?"}
            </Text>

            <View style={{ marginTop: 20, flexDirection: "row" }}>
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
                    rcbCode.length <= 0 ? "#C9C9C9" : colors.orangeColor,
                }}
                onPress={() => {
                  updateTransaction();
                }}
                disabled={rcbCode.length <= 0 ? true : false}
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

export default ETReceived;
