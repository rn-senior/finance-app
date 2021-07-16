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

const EProductSharedInstagramPost = (props) => {
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
          <ImageViewer
            ref={viewRef}
            backgroundColor={"white"}
            imageUrls={[
              {
                url: imgSelect,
              },
            ]}
            renderIndicator={() => null}
          />
          {/* <ImageBackground
            ref={viewRef}
            source={{ uri: imgSelect }}
            style={{
              flex: 3,
              alignItems: "center",
              justifyContent: checked ? "space-between" : "flex-end",
            }}
          >
            {checked ? (
              <View
                style={{
                  width: "75%",
                  height: 32,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  borderRadius: 10,
                  position: "relative",
                  top: 5,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: "bold",
                    fontWeight: "500",
                  }}
                >
                  {nombre}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
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
                  bottom: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 23,
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
                  bottom: 20,
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
          </ImageBackground> */}
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              // height: 40,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setChecked(!checked);
              }}
            >
              <Icon name={checked ? "check-square" : "square"} size={12} />
              <Text style={{ marginLeft: 8, fontSize: 12 }}>
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

export default EProductSharedInstagramPost;
