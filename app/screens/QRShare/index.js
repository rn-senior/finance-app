import {
  Button,
  Icon,
  SafeAreaView,
  Text,
  Header,
  CheckBox,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState, useEffect, useRef } from "react";
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
import QRCode from "react-native-qrcode-image";
import * as Utils from "@utils";
import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";

const QRShare = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { quryId, arrImg, nombre } = route.params;
  const { t, i18n } = useTranslation();
  const viewRef = useRef();

  const [redes, setRedes] = useState([
    "Instagram",
    "WhatsApp",
    "Link / URL",
    "Código QR",
  ]);
  const [type, setType] = useState("");

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.7,
      });

      await Share.open({ url: uri });
    } catch (err) {
      console.error(err);
    }
  };

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `quryid: ${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };

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
              Código QR
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Se generó un código QR para promocionar tu producto en redes
              sociales, webs o impresiones.
            </Text>
          </View>

          <View
            ref={viewRef}
            collapsable={false}
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 20,
              // height: "100%",
            }}
          >
            <QRCode
              value={`www.google.com/search?q=${quryId}`}
              size={247}
              bgColor="#ffffff"
              fgColor="#2AB361"
            />
            <View
              style={{
                width: "79%",
                height: 32,
                backgroundColor: "#000",
                justifyContent: "center",
                borderRadius: 10,
                //position: "relative",
                top: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  fontWeight: "500",
                }}
              >
                {formatQuryID(quryId)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              // style={{ opacity: type ? 1 : 0.6 }}
              style={{ backgroundColor: "#229B6C" }}
              onPress={() => {
                // navigation.navigate("EProductShared", {
                //   nombre: nombre,
                //   quryId: quryId,
                //   arrImg: arrImg,
                // });
                shareImage();
              }}
            >
              {"Guardar / Copiar"}
            </Button>
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default QRShare;
