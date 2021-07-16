import {
  Button,
  Icon,
  SafeAreaView,
  Text,
  Header,
  CheckBox,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
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

const EShared = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { quryId, arrImg, nombre } = route.params;
  const { t, i18n } = useTranslation();
  const [redes, setRedes] = useState([
    "Instagram Post",
    "Instagram Historia",
    "WhatsApp Historia",
    "Link / URL",
    "Código QR",
  ]);
  const [ruta, setRuta] = useState("");
  let screens = [
    "EProductSharedWsp",
    "EProductShared",
    "EProductShared",
    "QLink",
    "QRShare",
  ];
  const [type, setType] = useState("");

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "#FFF" }}
      >
        <Header
          title={""}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        > */}
        <View style={[styles.headerView, { borderBottomColor: colors.border }]}>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Text
              style={{
                // marginTop: "5%",
                // marginBottom: "7%",
                fontSize: 24,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Elige el canal donde compartirás tu producto
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Puedes generar una imagen, un link o un código QR para promocionar
              tu producto en redes sociales, webs o impresiones.
            </Text>
          </View>
          <View
            style={{
              flex: 1.2,
              justifyContent: "space-around",
              alignItems: "baseline",
              marginHorizontal: 20,
            }}
          >
            {redes.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",
                    // marginVertical: "4%",
                    // marginHorizontal: "10%",
                  }}
                  key={index.toString()}
                  onPress={() => {
                    type != item ? setType(item) : setType("");
                    setRuta(screens[index]);
                  }}
                >
                  <Icon
                    solid={type == item ? true : false}
                    name="circle"
                    size={20}
                    color={colors.primaryBlueColor}
                  />
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text
                      numberOfLines={1}
                      solid
                      style={{
                        // color: "#2AB361",
                        color: type == item ? colors.primaryBlueColor : "#000",
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              flex: 1.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              disabled={type ? false : true}
              // style={{ opacity: type ? 1 : 0.6 }}
              style={{ backgroundColor: type ? colors.orangeColor : "#CDCACA" }}
              onPress={() => {
                navigation.navigate(ruta, {
                  nombre: nombre,
                  quryId: quryId,
                  arrImg: arrImg,
                });
              }}
            >
              {"Generar"}
            </Button>
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EShared;
