import { persistor, store } from "app/store";
// import { ApplicationActions } from "@actions";
import React from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import PushNotification from "react-native-push-notification";
//import PushNotificationIOS from "@react-native-community/push-notification-ios";
console.disableYellowBox = true;

const Qury = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Qury;
