import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Alert,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import styles from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import TextInputMask from "react-native-text-input-mask";
import { Provider, useStore } from "react-redux";

const successInit = {
  phone: false,
};
const PhoneNumber = (props) => {
  let animation = useRef(new Animated.Value(0));
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const {
    name,
    apellidos,
    email,
    document,
    numeroDocumento,
    password,
    business,
  } = route.params;
  const store = useStore();
  // const business = route.params?.business;
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [progress, setProgress] = useState(33);
  const [spinner, setSpinner] = useState(false);
  const [pressButton, setPressButton] = useState(false);

  const width = animation.current.interpolate({
    inputRange: [66, 100],
    outputRange: ["66%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 700,
    }).start();
  }, [progress]);

  useInterval(() => {
    if (progress < 100) {
      setProgress(progress + 34);
    }
  }, 1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const validatePhone = () => {
    const reg = /^[0-9]{9}$/;
    return reg.test(phone);
  };

  async function signUp() {
    setSpinner(true);
    const deviceToken = store.getState().application.deviceToken;
    try {
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email, // optional
          phone_number: "+51" + phone,
          name: name,
          family_name: apellidos,
          "custom:tipoDocumento": document,
          "custom:numeroDocumento": numeroDocumento,
          "custom:nombreEmpresa": business,
          "custom:deviceToken": deviceToken.param.deviceToken.token,
          "custom:deviceTokenOS": deviceToken.param.deviceToken.os,
        },
      });
      setTimeout(() => {
        setSpinner(false);
        navigation.navigate("ConfirmOTP", { email: email, phone: phone });
      }, 500);
      Alert.alert(
        "Validar número de celular",
        "Acabamos de enviar un código de verificación a tu celular",
        [{ text: "Aceptar", onPress: () => {} }]
      );
      setLoading(true);
    } catch (error) {
      setSpinner(false);
      setSuccess({
        ...success,
        email: false,
      });
      console.log(error);
      Alert.alert(
        "Error al registrar usuario",
        "Elija otro correo electrónico",
        [{ text: "Aceptar", onPress: () => {} }]
      );
      navigation.navigate("SignUp", { correo: "" });
    }
  }

  const onSignUp = () => {
    setPressButton(true);
    if (!validatePhone()) {
      setSuccess({
        ...success,
        phone: validatePhone() ? true : false,
      });
    } else {
      setSuccess({
        ...success,
        phone: true,
      });
      Alert.alert("Confirmación", "¿Estás seguro de que este es tú número?", [
        {
          text: "Confirmar",
          onPress: () => {
            signUp();
          },
          style: "default",
        },
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
      ]);
      // signUp();
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Spinner visible={spinner} />
      <Header
        title={t("Regístrate")}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <Animated.View
            style={
              ([StyleSheet.absoluteFill], { backgroundColor: "#0191CB", width })
            }
          />
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ backgroundColor: colors.backgroundContain }}
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <View
          style={{
            padding: 20,
            width: "100%",
          }}
        >
          <Text
            regular
            style={{
              fontSize: 18,
              color: "#1B1B1B",
              textAlign: "left",
              marginTop: 12,
              marginLeft: 10,
            }}
          >
            {"¡Ya casi! Necesitamos validar que\n eres tú."}
          </Text>
          <View style={{ marginTop: 35, marginBottom: 112 }}>
            <Text
              medium
              style={{
                color: "#747474",
                fontSize: 16,
              }}
            >
              Número de celular
            </Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setPhone(extracted);
              }}
              autoCorrect={false}
              placeholder={t("Ingresa tu celular")}
              value={phone}
              style={[
                BaseStyle.textInput,
                {
                  height: 52,
                  borderBottomWidth: 1,
                  borderColor: success.phone ? "#0191CB" : "#C9C9C9",
                  backgroundColor: colors.card,
                  color: colors.text,
                  marginTop: 12,
                  fontSize: 16,
                },
              ]}
              mask={"[000] [000] [000]"}
              keyboardType="numeric"
              onKeyPress={() => {
                if (!success.phone) {
                  setSuccess({
                    ...success,
                    phone: true,
                  });
                }
              }}
            />
            {success.phone || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 8 }}>
                Ingrese un número válido
              </Text>
            )}
          </View>
          <View style={{ width: "100%" }}>
            <Button
              style={{
                alignSelf: "center",
                backgroundColor: colors.orangeColor,
              }}
              onPress={() => {
                onSignUp();
              }}
              loading={loading}
            >
              {t("Enviar código")}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumber;
