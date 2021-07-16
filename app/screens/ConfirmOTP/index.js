import { Header, Icon, SafeAreaView, Text } from "@components";
import { BaseStyle, useTheme } from "@config";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";

const successInit = {
  code: true,
};

const ConfirmOTP = (props) => {
  let textInput = useRef(null);
  const lenghtInput = 6;
  let clockCall = null;
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { email, phone } = route.params;
  const [success, setSuccess] = useState(successInit);
  const defaultCountDown = 60;
  const [internalVal, setInternalVal] = useState("");
  const [countDown, setCountDown] = useState(defaultCountDown);
  const [enableResend, setEnableResend] = useState(false);

  const lastDigits = phone.substring(phone.length - 4, phone.length);

  const onChangeText = (val) => {
    setInternalVal(val);
    if (val.length === lenghtInput) {
      confirmSignUp(val);
    }
  };

  async function confirmSignUp(val) {
    try {
      const confirm = await Auth.confirmSignUp(email, val);
      navigation.navigate("SignIn");
    } catch (error) {
      setInternalVal("");
      Alert.alert("Error", "Codigo de verificacion inválido", [
        { text: "Aceptar", onPress: () => {} },
      ]);
    }
  }

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const onResendOTP = () => {
    if (enableResend) {
      setCountDown(defaultCountDown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock(0);
      }, 1000);
    }
  };

  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "rgb(251,251,251)" }}
      >
        <Header
          title={t("reset_password")}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: "white" }}
        />
        <View
          style={{
            alignItems: "center",
            padding: 20,
            width: "100%",
          }}
        >
          <Text
            semibold
            style={{
              fontSize: 18,
              marginVertical: "4%",
              textAlign: "center",
            }}
          >
            Introduce el código de 6 dígitos
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginVertical: "4%",
              textAlign: "center",
            }}
          >
            {"Tu código se ha enviado por sms al\n" + "*****" + lastDigits}
          </Text>
          <TextInput
            ref={(input) => (textInput = input)}
            style={{ width: 0, height: 0 }}
            onChangeText={onChangeText}
            value={internalVal}
            maxLength={lenghtInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {Array(lenghtInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "white",
                    paddingVertical: 11,
                    width: 45,
                    height: 45,
                    margin: 4,
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor:
                      index === internalVal.length ? "#3279D7" : "#E1E4E8",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color: "#0070AE",
                    }}
                    onPress={() => textInput.focus()}
                  >
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ""}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <TouchableOpacity style={{ marginLeft: "13%" }} onPress={onResendOTP}>
          <Text
            style={{
              fontSize: 14,
              color: enableResend ? "black" : "#9F9F9F",
            }}
          >
            {"Volver a enviar el codigo " + countDown}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConfirmOTP;
