import React, { useEffect } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Text } from "@base-components/";
const ECommerce = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <View>
      <Text style={{ fontSize: 16, padding: 30, color: "red" }}>ECommerce</Text>
    </View>
  );
};

export default ECommerce;
