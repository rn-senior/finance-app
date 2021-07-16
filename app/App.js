import { useTheme } from "@config";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getHeightDevice, getWidthDevice } from "@utils";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DarkModeProvider } from "react-native-dark-mode";
import SplashScreen from "react-native-splash-screen";
import { Text } from "./components";
import { Images } from "./config";
import ECommerce from "./modules/e-commerce/navigation";
import Qury from "./modules/news/navigation";
import SignIn from "./screens/SignIn";

const RootStack = createStackNavigator();

const MENUS = [
  {
    id: 1,
    name: "Qury",
    description: "News & Magazine React Native UI Kit",
  },
  {
    id: 2,
    name: "ECommerce",
    description: "ECommerce React Native UI Kit",
  },
];

const Menu = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [windowData, setWindowData] = useState(() => ({
    width: getWidthDevice() - 16,
    height: getHeightDevice() - 60,
  }));

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const onChange = ({ window }) => {
    setWindowData({
      width: window.width - 16,
      height: window.height - 60,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        contentContainerStyle={{
          margin: 8,
          backgroundColor: "transparent",
        }}
        data={MENUS}
        keyExtractor={(ỉtem, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: windowData.width,
              height: windowData.height / 2,
              backgroundColor: colors.background,
              borderColor: colors.border,
              // padding: 8,
              // paddingVertical: 8,
              marginVertical: 4,
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 4,
              ...Platform.select({
                android: {
                  elevation: 1,
                },
                default: {
                  shadowColor: "rgba(0,0,0, .2)",
                  shadowOffset: { height: 0, width: 0 },
                  shadowOpacity: 3,
                  shadowRadius: 3,
                },
              }),
            }}
            onPress={() => navigation.navigate(item.name)}
          >
            <View style={{ flex: 1 }}>
              <ImageBackground
                style={{
                  height: "100%",
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  overflow: "hidden",
                }}
                source={Images.mazi}
                resizeMode="cover"
              />
            </View>
            <View style={{ padding: 8, paddingBottom: 16 }}>
              <Text title3 semibold style={{ marginTop: 8 }}>
                {item.name}
              </Text>
              <Text subhead>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const App = () => {
  const { theme, colors } = useTheme();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <DarkModeProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          mode="modal"
          headerMode="none"
          // initialRouteName="EComerce"
          initialRouteName="SignIn"
        >
          {/* <RootStack.Screen name="Menu" component={Menu} /> */}
          {/* <RootStack.Screen name="Qury" component={Qury} /> */}
          <RootStack.Screen name="ECommerce" component={ECommerce} />
        </RootStack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default App;
