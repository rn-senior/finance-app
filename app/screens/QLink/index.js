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
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Clipboard from "@react-native-clipboard/clipboard";

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import styles from "./styles";

const QLink = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { quryId, arrImg, nombre } = route.params;
  const { t, i18n } = useTranslation();
  const viewRef = useRef();
  const [link, setLink] = useState("https://www.qury.com/?qid=" + quryId);

  const [redes, setRedes] = useState([
    "Instagram",
    "WhatsApp",
    "Link / URL",
    "Código QR",
  ]);
  const [msg, setMsg] = useState(false);

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `quryid: ${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };
  // const opacityHeader = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [1, 0],
  //   extrapolate: "clamp",
  //   useNativeDriver: true,
  // });
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
              Link / Url
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Se generó un link el cual puedes copiar o compartir a tus clientes
              para que accedan directamente a tu producto
            </Text>
          </View>

          <View
            ref={viewRef}
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 20,
              // height: "100%",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                //backgroundColor: "#0191CB",
                borderRadius: 5,
                paddingHorizontal: 4,
                paddingTop: 4,
                paddingBottom: 3,
                fontSize: 26,
              }}
            >
              <TextInput
                style={[
                  //BaseStyle.textInput,
                  {
                    borderWidth: 2,
                    // borderColor: success.password ? "#0191CB" : "#C9C9C9",
                    borderColor: "#0191CB",
                    height: 250,
                    fontSize: 26,
                  },
                ]}
                editable={false}
                secureTextEntry={true}
                //value={link}
                selectionColor={"#0191CB"}
                multiline={true}
              >
                <Text style={{ fontSize: 26 }}>{link}</Text>
              </TextInput>
            </View>
            {/* <Animated.View
              style={{
                flex: 1,
                opacity: 1,
                justifyContent: "center",
              }}
            >
              {"componentLeft"}
            </Animated.View> */}
            {msg && (
              <View
                style={{
                  width: "80%",
                  height: 40,
                  backgroundColor: "#dadada",
                  justifyContent: "center",
                  borderRadius: 10,
                  //position: "relative",
                  top: 20,
                  paddingTop: 2,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontSize: 13,
                  }}
                >
                  {"Link copiado al portapapeles"}
                </Text>
              </View>
            )}
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
                Clipboard.setString(link);
                const text = Clipboard.getString();
                text.then((res) => {
                  //alert("Codiado a portapapeles: " + res);
                  setMsg(true);
                });
              }}
            >
              {"Copiar"}
            </Button>
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default QLink;
