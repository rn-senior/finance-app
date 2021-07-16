import { Button, Header, Icon, Image, SafeAreaView, Text } from "@components";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import { EFilterColors, EFilterSizes } from "@data";
import * as Utils from "@utils";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useStore } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Animated,
  I18nManager,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from "react-native";

import styles from "./styles";

const News = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { noticia } = route.params;
  const { colors } = useTheme();
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [numLines, setNumLines] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  const { titulo, texto, link, imagen, fechaCreacion } = noticia;

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const formatDate = (date) => {
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

  const OpenURLButton = ({ url, text }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Aviso", `No se pudo abrir la url: ${url}`);
      }
    }, [url]);

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 5 }}>
          Fuente:
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={{
              color: "#0191CB",
              fontSize: 16,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              fontWeight: "600",
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.content}>
        <View style={{ position: "relative", left: "80%", top: 10 }}>
          <Text>{formatDate(fechaCreacion)}</Text>
        </View>
        <View
          style={{
            marginBottom: 10,
            marginTop: 15,
          }}
        >
          <Text
            title4
            regular
            style={{
              fontSize: 22,
              fontWeight: "bold",
              lineHeight: 27,
            }}
          >
            {titulo}
          </Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          {/* <Text>{texto}</Text> */}
          <Text
            onTextLayout={({ nativeEvent: { lines } }) => {
              setNumLines(lines.length);
            }}
            // numberOfLines={40}
          >
            {texto}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <OpenURLButton url={link} text={"Enlace de la noticia"} />
        </View>
        {/* <View style={styles.separator} />

        <View style={styles.separator} /> */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: "always", bottom: "always" }}
      >
        {/* <Header title={"TITULO"} /> */}
        <Header title={"Noticia"} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          overScrollMode={"never"}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ height: 325 - heightHeader }} />

          {renderContent()}
        </ScrollView>
        <View style={styles.footer}>
          {/* <Image
            source={Images.danger}
            style={{
              width: 18,
              height: 18,
              marginRight: 10,
              // alignSelf: "flex-start",
            }}
          /> */}

          <Text bold>
            Nota: qury no se hace responsable por el contenido de esta noticia.
          </Text>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}
      >
        <Image source={{ uri: imagen }} style={{ flex: 1 }} />
      </Animated.View>
      <Animated.View style={[styles.headerStyle, { position: "absolute" }]}>
        <SafeAreaView
          style={{ width: "100%" }}
          forceInset={{ top: "always", bottom: "never" }}
        >
          <Header
            title=""
            renderLeft={true}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default News;
