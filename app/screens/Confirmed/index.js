import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Header,
  StatusLine,
  ShipperLine,
  PaymentLine,
  AddressLine,
  CatalogoList2,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { Products } from "@data/eConfirmed";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAsync } from "../../services/ConnectApi";
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
import { URLS3 } from "../../utils/environment";

export default function Confirmed({ route, navigation }) {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    userData,
    numProducts,
    ttlPrice,
    status,
    adressChoosed,
    idTx,
    date,
    payment,
  } = route.params;
  const [txDetail, setTxDetail] = useState([]);

  const styleItem1 = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
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

  /**
   *
   * Called when process checkout
   */
  const onCheckOut = () => {
    const bookingType = route.params?.bookingType;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("EMyOrder");
    }, 500);
  };

  const getTransactiondetail = () => {
    getAsync(
      "/transactiondetail/" + idTx,
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
    getTransactiondetail();
    timeout = setTimeout(() => {
      setLoading(false);
    }, 3500); //Math.floor(Math.random() * 1000) + 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const formatDate = () => {
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

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };

  const formatStatus = () => {
    var stat = "POR ACEPTAR";
    switch (status) {
      case "CRE":
        stat = "POR ACEPTAR";
        break;
      case "ACE":
        stat = "VALIDADO";
        break;
      case "APR":
        stat = "ACEPTADO";
        break;
      case "EXP":
        stat = "EXPIRADO";
        break;
      case "REC":
        stat = "RECHAZADO";
        break;
      case "REQ":
        stat = "RECHAZADO";
        break;
      case "FIC":
        stat = "ENVIADO";
        break;
      case "FIQ":
        stat = "RECIBIDO";
        break;
      case "COV":
        stat = "CONFLICTO";
        break;
      case "CON":
        stat = "CONFLICTO";
        break;
      case "ANU":
        stat = "ANULADO";
        break;
      case "VAL":
        status = "VALIDADO";
        break;
      case "ENV":
        status = "ENVIADO";
        break;
      case "RCB":
        status = "ENTREGADO";
        break;
    }
    return stat;
  };

  const formatColor = () => {
    var color = "#09564F";
    switch (status) {
      case "CRE":
        color = "#09564F";
        break;
      case "ACE":
        color = "#3279D7";
        break;
      case "APR":
        color = "#3279D7";
        break;
      case "EXP":
        color = "#000000";
        break;
      case "REC":
        color = "#000000";
        break;
      case "REQ":
        color = "#000000";
        break;
      case "RCB":
        color = "#2AB361";
        break;
      case "FIQ":
        color = "#003C75";
        break;
      case "COV":
        color = "#ECBD51";
        break;
      case "CON":
        color = "#ECBD51";
        break;
      case "CAN":
        color = "#C62105";
        break;
      case "ENV":
        color = "#E29085";
        break;
      case "VAL":
        color = "#38BBDF";
        break;
    }
    return color;
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "#F6F5F5" }}
      >
        <Header
          title={""}
          renderRight={() => {
            return (
              <Image source={Images.close} style={{ width: 20, height: 20 }} />
            );
          }}
          onPressRight={() => {
            navigation.navigate("EHome");
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
            <View
              style={[
                styles.viewCart,
                {
                  backgroundColor: "#fff",
                  borderColor: colors.orangeColor,
                  borderWidth: 2,
                },
              ]}
            >
              {/* <Icon
                name={"cart-plus"}
                style={{ fontSize: 32, color: BaseColor.whiteColor }}
              /> */}
              {/* <Image
                source={Images.check}
                style={{ width: 13.33, height: 10 }}
              /> */}
              <Icon name={"check"} size={14} color={colors.orangeColor} />
            </View>
            <Text style={{ marginBottom: 10, fontSize: 28, fontWeight: "700" }}>
              ¡Felicitaciones!
            </Text>
            <Text>
              Su pedido está en proceso de aceptación por el vendedor.
            </Text>

            {/* <Text
              headline
              bold
              style={{ textTransform: "uppercase", marginTop: 30 }}
            >
              Estimated dilivery
            </Text>
            <Text body1 light style={{ marginTop: 4 }}>
              29 July 2020
            </Text> */}
            <View
              style={{
                borderWidth: 1,
                borderColor: "#EEECEC",
                width: 204,
                height: 37,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text style={{ color: colors.orangeColor }}>
                PEDIDO{" "}
                <Text bold style={{ color: colors.orangeColor }}>
                  #{idTx}
                </Text>
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
                marginBottom: 50,
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
                  title={formatStatus()}
                  price={"S/ " + ttlPrice}
                  date={formatDate()}
                  color={formatColor()}
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
                <ShipperLine
                  title={userData.name + " " + userData.surname}
                  inicial={
                    userData.name.charAt(0).toUpperCase() +
                    userData.surname.charAt(0).toUpperCase()
                  }
                  imagePhone={"phone-alt"}
                  imageMessage={"comment-alt"}
                />
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginVertical: 10,
                  }}
                />
                <PaymentLine index={2} paymethod={payment} />
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#EEECEC",
                    marginVertical: 10,
                  }}
                />
                <AddressLine
                  title={"Lugar de entrega"}
                  address={adressChoosed ? adressChoosed : "S/N"}
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ECart");
                  }}
                  style={{ marginTop: 38, marginBottom: 45 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.primaryBlueColor,
                      textDecorationLine: "underline",
                    }}
                  >
                    Ver Catálogo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleItem1}
                  onPress={() => {
                    navigation.navigate("AboutUs");
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
              {/* <FlatList
                scrollEnabled={false}
                // contentContainerStyle={styles.paddingFlatList}
                data={Products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1, padding: 4 }}>
                    <ProductCard2
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      salePrice={item.salePrice}
                      secondDescription={item.secondDescription}
                      color={item.color}
                      size={item.size}
                      quantity={item.quantity}
                    />
                  </View>
                )}
              /> */}
            </View>
          </View>
        </ScrollView>
        {/* <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onCheckOut();
            }}
          >
            {t("track_order")}
          </Button>
        </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
