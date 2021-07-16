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

const ETConfirmed = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { tx } = route.params;
  const [spinner, setSpinner] = useState(false);
  const [optionChossed, setOptionChoosed] = useState("");

  const updateTransaction = () => {
    setSpinner(true);
    const body = {
      usuarioIdVendedor: -1,
      usuarioIdComprador: -1,
      metodoCobro: -1,
      metodoPago: -1,
      cantidad: -1,
      precioTotal: -1,
      estadoTransaccionNuevo: "CNF",
      descripcion: "",
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
              style={{
                width: 40,
                height: 40,
                marginTop: 100,
                marginBottom: 30,
              }}
            />

            <Text
              style={{
                marginBottom: 10,
                fontSize: 28,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Confirmar el pedido
            </Text>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              {"Al aceptar se notificará a qury la recepción del pedido y este pasará a CONFIRMADO. Se le enviará un mensaje al vendedor."}
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
              <Icon solid name="circle" size={8} solid color={"#000"} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  numberOfLines={1}
                  solid
                  style={{ color: "#000", fontSize: 16, fontWeight: "700" }}
                >
                  {"CONFIRMADO"}
                </Text>
              </View>
            </View>

            <View style={styles.separator} />

            <Text style={{ marginVertical: 30 }}>
              {"¿Está seguro de confirmar el pedido?"}
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
                }}
                onPress={() => {
                  updateTransaction();
                }}
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

export default ETConfirmed;
