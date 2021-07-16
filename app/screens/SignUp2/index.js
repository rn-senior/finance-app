import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import React, { useRef, useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Animated, StyleSheet } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const successInit = {
  password: false,
  confPassword: false,
  errorPassword: false,
  errorConfPassword: false,
};

const SignUp2 = (props) => {
  let animation = useRef(new Animated.Value(0));
  const { route, navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const {
    name,
    apellidos,
    email,
    document,
    numeroDocumento,
    business,
  } = route.params;
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [progress, setProgress] = useState(33);
  const [pressButton, setPressButton] = useState(false);

  const width = animation.current.interpolate({
    inputRange: [33, 100],
    outputRange: ["33%", "100%"],
    extrapolate: "clamp",
  });

  const limpiarValores = () => {
    setPassword("");
    setConfPassword("");
  };

  const validateNavigate = () => {
    if (password.length == 0 || confPassword.length == 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 700,
    }).start();
  }, [progress]);

  useInterval(() => {
    if (progress < 66) {
      setProgress(progress + 33);
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

  const validatePassword = () => {
    const reg = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]\S{6,}$/;
    return reg.test(password);
  };

  const validateConfPassword = () => {
    const reg = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]\S{6,}$/;
    return reg.test(confPassword);
  };

  const onSignUp = () => {
    setPressButton(true);
    if (!validatePassword() || !validateConfPassword()) {
      setSuccess({
        ...success,
        password: validatePassword() ? true : false,
        confPassword: validateConfPassword() ? true : false,
        errorPassword: false,
      });
      limpiarValores();
    } else {
      if (password !== confPassword) {
        setSuccess({
          ...success,
          password: false,
          confPassword: false,
          errorConfPassword: false,
        });
        limpiarValores();
      } else {
        setSuccess({
          ...success,
          password: true,
          confPassword: true,
          errorPassword: true,
          errorConfPassword: true,
        });
        limpiarValores();
        navigation.navigate("PhoneNumber", {
          name: name,
          apellidos: apellidos,
          email: email,
          document: document,
          numeroDocumento: numeroDocumento,
          business: business,
          password: password,
        });
      }
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("sign_up")}
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
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            styles.contain,
            { backgroundColor: colors.backgroundContain },
          ]}
        >
          <Text
            regular
            style={{
              fontSize: 18,
              color: "#1B1B1B",
              textAlign: "left",
              marginTop: 12,
            }}
          >
            {"Crea una contraseña para acceder"}
          </Text>
          <Text
            medium
            style={{
              color: "#747474",
              fontSize: 16,
              marginTop: 36,
            }}
          >
            Contraseña
          </Text>
          <TextInput
            style={[
              BaseStyle.textInput,
              {
                marginTop: 12,
                borderColor: success.password ? "#0191CB" : "#C9C9C9",
                borderBottomWidth: 1,
              },
            ]}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            placeholder={"Ingresa una contraseña"}
            secureTextEntry={true}
            autoCapitalize="sentences"
            value={password}
            onKeyPress={() => {
              if (!success.password) {
                setSuccess({
                  ...success,
                  password: true,
                  errorPassword: true,
                });
              }
            }}
          />
          {success.errorPassword || !pressButton ? null : (
            <Text style={{ color: "#C62105", marginTop: 5 }}>
              Ingrese una contraseña válida
            </Text>
          )}
          <Text
            medium
            style={{
              color: "#747474",
              fontSize: 16,
              marginTop: 30,
            }}
          >
            Repetir contraseña
          </Text>
          <TextInput
            style={[
              BaseStyle.textInput,
              {
                marginTop: 12,
                borderColor: success.confPassword ? "#0191CB" : "#C9C9C9",
                borderBottomWidth: 1,
              },
            ]}
            onChangeText={(text) => setConfPassword(text)}
            autoCorrect={false}
            placeholder={"Repite tu contraseña"}
            secureTextEntry={true}
            autoCapitalize="sentences"
            value={confPassword}
            onKeyPress={() => {
              if (!success.confPassword) {
                setSuccess({
                  ...success,
                  confPassword: true,
                  errorConfPassword: true,
                });
              }
            }}
          />
          {success.errorConfPassword || !pressButton ? null : (
            <Text style={{ color: "#C62105", marginTop: 5 }}>
              Error al confirmar contraseña
            </Text>
          )}
          <View style={{ marginVertical: 30 }}>
            <Text
              style={{ color: "#1B1B1B", textAlign: "center", fontSize: 16 }}
            >
              Su contraseña debe contener al menos 6 caracteres, una letra
              mayúscula y un número
            </Text>
          </View>

          <View style={{ width: "100%" }}>
            <Button
              style={{
                marginTop: 30,
                alignSelf: "center",
                opacity: validateNavigate() ? 0.6 : 1,
                backgroundColor: colors.orangeColor,
              }}
              loading={loading}
              onPress={() => onSignUp()}
              disabled={validateNavigate()}
            >
              {/* {t("sign_up")} */}
              {t("Continuar")}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp2;
