import { Image, Text } from "@components";
import { BaseColor, useTheme } from "@config";
import { Images } from "@config";
import React, { useEffect } from "react";
import { ActivityIndicator, View, ImageBackground } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const Loading = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();

  const onProcess = () => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 500);
  };
  useEffect(() => {
    onProcess();
  }, []);

  return (
    // <View style={styles.container}>
    //   <View style={{ alignItems: "center" }}>
    //     <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
    //     <Text
    //       style={{
    //         marginTop: 10,
    //         color: "white",
    //         fontSize: 70,
    //         fontWeight: "bold",
    //       }}
    //     >
    //       Qury
    //     </Text>
    //   </View>
    //   <ActivityIndicator
    //     size="large"
    //     color={colors.text}
    //     style={{
    //       position: "absolute",
    //       top: 260,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   />
    // </View>
    <ImageBackground source={Images.splash} style={{ flex: 1 }} />
  );
};

export default Loading;
