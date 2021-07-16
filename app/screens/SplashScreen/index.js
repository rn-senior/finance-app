import { Button, AlertView, Text } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import React, { useRef, useState } from "react";
import { View, ImageBackground, Image } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Provider, useStore } from "react-redux";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { ApplicationActions } from "@actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const SplashScreen = (props) => {
  const store = useStore();
  const st = store.getState();
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { onSetNotificationTKN } = ApplicationActions;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const v8 = require("v8");
  // const totalHeapSize = v8.getHeapCodeStatistics().total_available_size;
  // let totalHeapSizeInGb = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);

  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    senderID: "536387957209",
    onRegister: function (token) {
      dispatch(onSetNotificationTKN({ deviceToken: token }));
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification
      // if (notification.foreground) {
      //   PushNotification.localNotification({
      //     title: notification.title,
      //     message: notification.data.default,
      //   });
      // }
      let message = notification?.data?.default; // this seems weird to me. My data is always a string - I can Parse the JSON if it is JSON here or send only a string and display (as shown below)
      if (!notification.userInteraction) {
        PushNotification.presentLocalNotification({
          message: message || "New notification",
          channelId: "default-channel-id",
        });
      }
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  return (
    <View style={BaseStyle.safeAreaView}>
      {modalVisible ? (
        <AlertView
          title={"Bienvenido!"}
          message={"Ya eres parte de qury"}
          type={"confirm"}
          onPressConfirm={() => {
            setModalVisible(false);
          }}
        />
      ) : null}

      <ImageBackground
        source={Images.splashImage}
        style={{ flex: 0.6 }}
        resizeMode={"stretch"}
      />
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors.text, fontSize: RFValue(20) }]}
        >
          {"Te damos la "}
          <Text style={{ fontWeight: "600" }}>bienvenida</Text>
          {" a qury"}
        </Text>
        <Button
          styleText={{
            // fontSize: RFValue(12),
            fontSize: 16,
            fontWeight: "600",
          }}
          loading={loading}
          style={[
            styles.firstButton,
            { backgroundColor: colors.primaryButtonColor },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          {"Registrar"}
        </Button>

        <Button
          styleText={{
            // fontSize: RFValue(14),
            fontSize: 18,
            color: colors.primaryButtonColor,
            fontWeight: "600",
          }}
          loading={loading}
          style={{
            height: 48,
            width: "80%",
            backgroundColor: colors.background,
          }}
          onPress={() => navigation.navigate("SignIn")}
        >
          {"Iniciar Sesión"}
        </Button>
      </View>
    </View>
  );
};

export default SplashScreen;
