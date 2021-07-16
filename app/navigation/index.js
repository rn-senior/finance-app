import { BaseColor, BaseSetting, useTheme } from "@config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "@screens/SignIn";
// import SplashScreen from "@screens/SplashScreen";
import Loading from "@screens/Loading";
import PreviewImage from "@screens/PreviewImage";
import SelectDarkOption from "@screens/SelectDarkOption";
import SelectFontOption from "@screens/SelectFontOption";

// ECommerce
import EFilter from "@screens/EFilter";
import ESearchBarcode from "@screens/ESearchBarcode";

import i18n from "i18next";
import React, { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { Platform, StatusBar } from "react-native";
import { DarkModeProvider, useDarkMode } from "react-native-dark-mode";
import SplashScreen from "react-native-splash-screen";
import { useSelector } from "react-redux";
import Main from "./main";
const RootStack = createStackNavigator();

const Navigator = (props) => {
  const storeLanguage = useSelector((state) => state.application.language);
  const { theme, colors } = useTheme();
  const isDarkMode = useDarkMode();
  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: storeLanguage ?? BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
    });
    SplashScreen.hide();
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content", true);
  }, []);
  return (
    <DarkModeProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName="Loading"
        >
          <RootStack.Screen
            name="Loading"
            component={Loading}
            options={{ gestureEnabled: false }}
          />
          <RootStack.Screen name="Main" component={Main} />
          <RootStack.Screen
            name="PreviewImage"
            component={PreviewImage}
            options={{
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: "clamp",
                  }),
                },
              }),
            }}
          />
          <RootStack.Screen
            name="SelectDarkOption"
            component={SelectDarkOption}
            gestureEnabled={false}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          />
          <RootStack.Screen
            name="SelectFontOption"
            component={SelectFontOption}
            gestureEnabled={false}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          />
          <RootStack.Screen name="SignIn" component={SignIn} />
          {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
          {/** ECommerce */}
          <RootStack.Screen name="EFilter" component={EFilter} />
          <RootStack.Screen name="ESearchBarcode" component={ESearchBarcode} />
        </RootStack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default Navigator;
