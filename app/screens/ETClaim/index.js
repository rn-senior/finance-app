import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Header,
  ProductMetadata,
  TextInput,
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
import { useSelector, useDispatch, useStore } from "react-redux";

const ETClaim = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { tx } = route.params;
  const [spinner, setSpinner] = useState(false);
  const [optionChossed, setOptionChoosed] = useState("");
  const [complain, setComplain] = useState("");
  const store = useStore();

  const userId = store.getState().auth.login.success.profile.id;
  const idVendedor = tx.usuario_id_vendedor

  const updateTransaction = () => {
    setSpinner(true);
    const body = {
      usuarioIdVendedor: -1,
      usuarioIdComprador: -1,
      metodoCobro: -1,
      metodoPago: -1,
      cantidad: -1,
      precioTotal: -1,
      estadoTransaccionNuevo: userId == tx.usuario_id_vendedor ? "COV" : "CON",
      descripcion: complain,
      codigoTransaccion: tx.id,
      direccionId: -1,
      detalleTransaccion: -1,
      codigoConfirmacionIn: -1,
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
              source={Images.close}
              style={{ width: 40, height: 40, marginTop: 60, marginBottom: 30 }}
            />

            <Text style={{ marginBottom: 10, fontSize: 28, fontWeight: "700" }}>
              Reclamar Pedido
            </Text>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              {"Al realizar un reclamo se notificará a Qury para que lo revise y trate de buscar una solución. El estado del pedido pasará a CONFLICTO. Se le enviará un mensaje al " + (idVendedor == userId ? "comprador" : "vendedor") + "."}
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
              <Icon solid name="circle" size={8} solid color={"#ECBD51"} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  numberOfLines={1}
                  solid
                  style={{ color: "#ECBD51", fontSize: 16, fontWeight: "700" }}
                >
                  {"CONFLICTO"}
                </Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                width: "100%",
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  marginHorizontal: 20,
                  //backgroundColor: "#0191CB",
                  borderRadius: 5,
                  paddingHorizontal: 4,
                  paddingTop: 4,
                  paddingBottom: 3,
                }}
              >
                <TextInput
                  onChangeText={(text) => {
                    if (text.length <= 512) setComplain(text);
                  }}
                  style={[
                    BaseStyle.textInput,
                    {
                      borderWidth: 2,
                      // borderColor: success.password ? "#0191CB" : "#C9C9C9",
                      borderColor: false ? "#0191CB" : "#C9C9C9",
                      height: 100,
                    },
                  ]}
                  autoCorrect={false}
                  placeholder={t("Ingrese aquí el detalle de su reclamo...")}
                  secureTextEntry={true}
                  value={complain}
                  selectionColor={"#0191CB"}
                  multiline={true}
                />
              </View>
            </View>

            <Text style={{ marginVertical: 20 }}>{"¿Esta seguro de enviar este reclamo?"}</Text>

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
                    complain.length <= 0 ? "#C9C9C9" : colors.orangeColor,
                }}
                onPress={() => {
                  updateTransaction();
                }}
                disabled={complain.length <= 0 ? true : false}
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

export default ETClaim;
