import { AuthActions } from "@actions";
import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useStore } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Amplify, Auth } from "aws-amplify";
import Spinner from "react-native-loading-spinner-overlay";
import { getAsync } from "../../services/ConnectApi";

const { authentication } = AuthActions;

import config from "../../../aws-exports";

Amplify.configure(config);

const successInit = {
  email: false,
  password: false,
  invalidUser: false,
};

const SignIn = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  // const [email, setEmail] = useState("luisibarraconsiglieri@gmail.com");
  // const [password, setPassword] = useState("Pazamon$1");
  const [email, setEmail] = useState("brunocardenasmartinez@gmail.com");
  const [password, setPassword] = useState("Qurymon$1");
  const [success, setSuccess] = useState(successInit);
  const [invalidUser, setInvalidUser] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [profile, setProfile] = useState();
  const [count, setCount] = useState(0);

  const validatePassword = () => {
    // const reg = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]\S{6,}$/;
    // return reg.test(password);
    if (password.length > 0) {
      return true;
    }
    return false;
  };

  const store = useStore();

  const onPress = () => setCount((prevCount) => prevCount + 1);

  const validateUser = () => {
    // const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@/;
    // return reg.test(email);
    if (email.length > 0) {
      return true;
    }
    return false;
  };

  const disabledButton = email.length > 0 && password.length > 0 ? false : true;

  const getDataUser = () => {
    getAsync(
      "/usuarios?userLogin=" + email,
      {
        onSuccess: (response) => {
          setProfile(response[0]);
          dispatch(
            authentication(
              {
                success: true,
                profile: response[0],
              },
              (response) => {
                setTimeout(() => {
                  setSpinner(false);
                  if (response) {
                    // setSpinner(false);
                    Alert.alert("Bienvenido", "Ya eres parte de qury");
                    navigation.navigate("EHomeQury");
                  } else {
                    // setSpinner(false);
                    setSuccess({
                      ...success,
                      invalidUser: true,
                    });
                    Alert.alert("Error", "Intente de nuevo");
                  }
                }, 500);
              }
            )
          );
        },
        onError: (error) => {
          Alert.alert("Error", "Intente de nuevo");
        }, // id:Session.user.id,
      },
      null
    );
  };

  const signIn2 = () => {
    getAsync(
      "/usuarios?userLogin=" + email,
      {
        onSuccess: (response) => {
          setProfile(response[0]);
          dispatch(
            authentication(
              {
                success: true,
                profile: response[0],
              },
              (response) => {
                setTimeout(() => {
                  setSpinner(false);
                  if (response) {
                    navigation.navigate("EHomeQury");
                  } else {
                    setSuccess({
                      ...success,
                      invalidUser: true,
                    });
                    Alert.alert("Error", "Intente de nuevo");
                  }
                }, 500);
              }
            )
          );
        },
        onError: (error) => {
          Alert.alert("Error", error);
        }, // id:Session.user.id,
      },
      null
    );
  };

  const onLogin = () => {
    setSpinner(true);
    const deviceToken = store.getState().application.deviceToken;
    var metadata = {
      os: Platform.OS,
      deviceToken: deviceToken ? deviceToken.param.deviceToken.token : "",
    };
    console.log(metadata);
    const loginResult = Auth.signIn(email, password, metadata);
    loginResult
      .then((res) => {
        signIn2();
      })
      .catch((err) => {
        setSpinner(false);
        // setSuccess({ ...success, email: false, password: false });
        setTimeout(() => {
          Alert.alert("Aviso", "Usuario o contraseña incorrecta");
        }, 100);
      });
    //}, 1000);
    // }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Spinner visible={spinner} />
      <Header
        title={"Iniciar Sesión"}
        renderLeft={true}
        onPressLeft={() => {
          navigation.navigate("SplashScreen");
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
          color: colors.background,
        }}
      >
        <View
          style={[
            styles.contain,
            { backgroundColor: colors.backgroundContain },
          ]}
        >
          <Text
            title2
            style={{
              marginVertical: 40,
            }}
          >
            Bienvenido
          </Text>
          <Text
            medium
            style={{
              color: "#747474",
              fontSize: 16,
              marginBottom: 11,
            }}
          >
            Email
          </Text>
          <TextInput
            style={[
              BaseStyle.textInput,
              {
                borderBottomWidth: 2,
                borderColor: validateUser() ? "#0191CB" : "#C9C9C9",
              },
            ]}
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCorrect={false}
            placeholder={"Ingresa tu correo electrónico"}
            value={email}
          />
          <Text
            medium
            style={{ color: "#747474", fontSize: 16, marginTop: 36 }}
          >
            {"Contraseña"}
          </Text>
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={[
              BaseStyle.textInput,
              {
                marginTop: 11,
                borderBottomWidth: 2,
                borderColor: validatePassword() ? "#0191CB" : "#C9C9C9",
              },
            ]}
            autoCorrect={false}
            placeholder={"Ingresa tu contraseña"}
            secureTextEntry={true}
            value={password}
            selectionColor={"#0191CB"}
          />
          <View style={styles.contentActionBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body2 style={{ color: "#586069" }}>
                {"¿Olvidaste tu contraseña?"}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            disabled={disabledButton}
            style={[
              styles.button,
              {
                backgroundColor: colors.primaryButtonColor,
                opacity: disabledButton ? 0.55 : 1,
              },
            ]}
            onPress={onLogin}
            styleText={{ fontSize: 16 }}
          >
            {"Ingresar"}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
