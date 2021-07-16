import { Button, Icon, SafeAreaView, Text, Header } from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getAsync } from "../../services/ConnectApi";
import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";
import ImageViewer from "react-native-image-zoom-viewer";

import {
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "./styles";

const EProductSharedWsp = (props) => {
  const { navigation, route } = props;
  const { quryId, arrImg, nombre } = route.params;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const viewRef = useRef();
  const [checked, setChecked] = useState(true);

  const [indexSelected, setIndexSelected] = useState(0);
  let arr = arrImg.filter((v) => v != null);
  const [imgSelect, setImgselect] = useState(arrImg[0]);

  const images = [
    {
      url: imgSelect,
    },
  ];

  const onTouchImage = (touched) => {
    if (touched == indexSelected) return;
    setImgselect(arr[touched]);
    setIndexSelected(touched);
  };

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
          renderRight={() => {
            return (
              <Image source={Images.close} style={{ width: 20, height: 20 }} />
            );
          }}
          onPressRight={() => {
            navigation.goBack();
          }}
        />

        <View style={[styles.headerView, { borderBottomColor: colors.border }]}>
          <View
            //source={{ uri: imgSelect }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                //backgroundColor: "red",
                width: "100%",
                alignItems: "center",
                height: 450,
                // paddingTop: 80,
                // paddingBottom: 50,
              }}
            >
              {checked ? (
                <View
                  style={{
                    width: "75%",
                    backgroundColor: "white",
                    // justifyContent: "center",
                    borderRadius: 10,
                    position: "absolute",
                    zIndex: 1,
                    top: 15,
                    // bottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      textAlign: "center",
                      fontSize: 13,
                      //fontWeight: "bold",
                      fontWeight: "500",
                    }}
                  >
                    {nombre}
                  </Text>
                </View>
              ) : null}
              <ImageViewer
                ref={viewRef}
                backgroundColor={"white"}
                style={{
                  //backgroundColor: "red",
                  width: "100%",
                  alignItems: "center",

                  height: "100%",
                }}
                imageUrls={[
                  {
                    url: imgSelect,
                  },
                ]}
                renderIndicator={() => null}
              />
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 10,
                }}
              >
                <View
                  style={{
                    width: "75%",
                    height: 32,
                    backgroundColor: "#000",
                    justifyContent: "center",
                    borderRadius: 10,
                    position: "relative",
                    //bottom: 180,
                  }}
                >
                  <Text
                    numberOfLines={1}
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
                <View
                  style={{
                    width: "75%",
                    height: 32,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    borderRadius: 10,
                    position: "relative",
                    // bottom: 180,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      textAlign: "center",
                      fontSize: 12,
                      // fontWeight: "bold",
                      // fontWeight: "500",
                    }}
                  >
                    Descarga la App de qury para iOS y Android
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Fuera de canvas */}
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              //height: 20,
              margin: 13,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setChecked(!checked);
              }}
            >
              <Icon name={checked ? "check-square" : "square"} size={12} />
              <Text style={{ marginLeft: 8, fontSize: 16 }}>
                {"Incluir nombre"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            {arr.map((item, key) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onTouchImage(key.toString());
                  }}
                  activeOpacity={0.9}
                  key={key.toString()}
                >
                  <Image
                    key={key.toString()}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: 3,
                      borderRadius: 8,
                      borderColor:
                        key == indexSelected
                          ? colors.primaryLight
                          : BaseColor.grayColor,
                      borderWidth: 2,
                    }}
                    source={{ uri: item }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
              marginTop: 15,
            }}
          >
            <Button
              onPress={() => {
                // navigation.goBack();
                shareImage();
              }}
            >
              {"Guardar / Copiar"}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EProductSharedWsp;
