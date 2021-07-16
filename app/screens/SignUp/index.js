import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
  Switch,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import TextInputMask from "react-native-text-input-mask";

const successInit = {
  name: false,
  apellidos: false,
  email: false,
  telefono: false,
  document: false,
  numeroDocumento: false,
  business: false,
};

const SignUp = (props) => {
  let animation = useRef(new Animated.Value(0));
  // const refInput = useRef(null);
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState("Felipe");
  const [apellidos, setApellidos] = useState("Souza Lin");
  const [email, setEmail] = useState("felipe@gmail.com");
  const [document, setDocument] = useState("DNI");
  const [numeroDocumento, setNumeroDocumento] = useState("02381923");
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [arrow, setArrow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState(false);
  const [pressButton, setPressButton] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);

  const [pressSwitch, setPressSwitch] = useState(false);

  const colorSuccess = "#0191CB";
  const colorNotSucess = "#c9c9c9";

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 700,
    }).start();
  }, [progress]);

  useInterval(() => {
    if (progress < 33) {
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

  const validateBusiness = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü-\s]{3,}$/;
    return reg.test(business);
  };

  const validateName = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü-\s]{3,}$/;
    return reg.test(name);
  };

  const validateApellidos = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü-\s]{3,}$/;
    return reg.test(apellidos);
  };

  const validateEmail = () => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(email);
  };

  const validateNumberDocument = () => {
    const reg = /^[0-9]{8,}$/;
    return reg.test(numeroDocumento);
  };

  const validateDocument = () => {
    if (document.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const onPasswordNotEnabled = () => {
    setTimeout(() => {
      navigation.navigate("SignUp2", {
        name: name,
        apellidos: apellidos,
        email: email,
        document: document,
        numeroDocumento: numeroDocumento,
      });
    }, 1000);
  };

  const onPasswordEnabled = () => {
    setTimeout(() => {
      navigation.navigate("SignUp2", {
        name: name,
        apellidos: apellidos,
        email: email,
        document: document,
        numeroDocumento: numeroDocumento,
        business: business,
      });
    }, 1000);
  };

  const validateNotEnabled = () => {
    setPressButton(true);
    setPressSwitch(true);
    if (
      !validateName() ||
      !validateApellidos() ||
      !validateEmail() ||
      !validateDocument() ||
      !validateNumberDocument()
    ) {
      setSuccess({
        ...success,
        name: validateName(),
        apellidos: validateApellidos(),
        email: validateEmail(),
        document: validateDocument(),
        numeroDocumento: validateNumberDocument(),
      });
    } else {
      setSuccess({
        ...success,
        name: true,
        apellidos: true,
        email: true,
        telefono: true,
        document: true,
        numeroDocumento: true,
      });
      onPasswordNotEnabled();
    }
  };

  const validateEnabled = () => {
    setPressSwitch(true);
    setPressButton(true);
    if (
      !validateName() ||
      !validateApellidos() ||
      !validateEmail() ||
      !validateDocument() ||
      !validateNumberDocument() ||
      !validateBusiness()
    ) {
      setSuccess({
        ...success,
        name: validateName(),
        apellidos: validateApellidos(),
        email: validateEmail(),
        document: validateDocument(),
        numeroDocumento: validateNumberDocument(),
        business: validateBusiness(),
      });
    } else {
      setSuccess({
        ...success,
        name: true,
        apellidos: true,
        email: true,
        telefono: true,
        document: true,
        numeroDocumento: true,
        business: true,
      });
      onPasswordEnabled();
    }
  };

  const onSignUp = () => {
    isEnabled ? validateEnabled() : validateNotEnabled();
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setPressSwitch(false);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={t("sign_up")}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
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
        <View style={styles.container}>
          <View style={styles.progressBar}>
            <Animated.View
              style={
                ([StyleSheet.absoluteFill],
                { backgroundColor: "#0191CB", width })
              }
            />
          </View>
        </View>
        <ScrollView style={{ backgroundColor: colors.backgroundContain }}>
          <View style={[styles.contain]}>
            <Text
              regular
              style={{
                fontSize: 18,
                color: colors.text,
                textAlign: "left",
                marginTop: 14,
              }}
            >
              {"Para empezar necesitamos algunos datos."}
            </Text>
            <View>
              <Text medium style={styles.firstText}>
                Nombres
              </Text>
              <TextInput
                style={[
                  BaseStyle.textInput,
                  {
                    borderColor: success.name ? colorSuccess : colorNotSucess,
                    borderBottomWidth: 2,
                    marginTop: 12,
                  },
                ]}
                onChangeText={(text) => {
                  text = text.replace(/[0-9]/g, "");
                  setName(text);
                }}
                value={name}
                autoCorrect={false}
                placeholder={"Ingresa tus nombres"}
                autoCapitalize="sentences"
                onKeyPress={() => {
                  if (!success.name) {
                    setSuccess({
                      ...success,
                      name: true,
                    });
                  }
                }}
              />
              {success.name || !pressButton ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese nombres válidos
                </Text>
              )}
            </View>
            <Text medium style={styles.otherText}>
              Apellidos
            </Text>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  marginTop: 12,
                  borderColor: success.apellidos
                    ? colorSuccess
                    : colorNotSucess,
                  borderBottomWidth: 2,
                },
              ]}
              onChangeText={(text) => {
                text = text.replace(/[0-9]/g, "");
                setApellidos(text);
              }}
              value={apellidos}
              autoCorrect={false}
              placeholder={"Ingresa tus apellidos"}
              // placeholder={t("last_names")}
              autoCapitalize="sentences"
              onKeyPress={() => {
                if (!success.apellidos) {
                  setSuccess({
                    ...success,
                    apellidos: true,
                  });
                }
              }}
            />
            {success.apellidos || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese apellidos válidos
              </Text>
            )}
            <Text medium style={styles.otherText}>
              Email
            </Text>
            <TextInput
              blurOnSubmit={true}
              style={[
                BaseStyle.textInput,
                {
                  marginTop: 12,
                  borderColor: success.email ? colorSuccess : colorNotSucess,
                  borderBottomWidth: 2,
                },
              ]}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              onKeyPress={() => {
                if (!success.email) {
                  setSuccess({
                    ...success,
                    email: true,
                  });
                }
              }}
              // placeholder={t("input_email")}
              placeholder={"Ingresa tu email"}
              keyboardType="email-address"
              value={email}
              // clearButtonMode="always"
            />
            {success.email || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese un email válido
              </Text>
            )}
            <Text medium style={styles.otherText}>
              Tipo de documento
            </Text>
            <RNPickerSelect
              placeholder={{ label: "Selecciona tu documento" }}
              value={"DNI"}
              items={[
                { label: "DNI", value: "DNI", key: "dni" },
                {
                  label: "Carnet de extranjería",
                  value: "Carnet de extranjería",
                  key: "carnet",
                },
                { label: "RUC", value: "RUC", key: "ruc" },
              ]}
              doneText="Cerrar"
              onValueChange={(value) => setDocument(value)}
              Icon={() => {
                return (
                  <Icon
                    name={arrow ? "chevron-up" : "chevron-down"}
                    size={12}
                    solid
                    color={arrow ? "#3279D7" : BaseColor.grayColor}
                  />
                );
              }}
              onOpen={() => {
                setSuccess({
                  ...success,
                  document: true,
                });
                setArrow(true);
              }}
              onClose={() => {
                setArrow(false);
              }}
              pickerProps={{
                style: {
                  overflow: "hidden",
                  //height: 300,
                },
              }}
              style={{
                modalViewBottom: { height: 180 },
                inputIOS: {
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: success.document
                    ? colorSuccess
                    : colorNotSucess,
                  borderRadius: 4,
                  width: "100%",
                  alignSelf: "center",
                  // color: "#1B1B1B",
                  color: colors.text,
                  backgroundColor: colors.card,
                  marginTop: 12,
                },
                inputAndroid: {
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderBottomWidth: 2,
                  borderBottomColor: success.document
                    ? colorSuccess
                    : colorNotSucess,
                  borderRadius: 8,
                  width: "100%",
                  alignSelf: "center",
                  color: colors.text,
                  backgroundColor: colors.card,
                  marginTop: 12,
                },
                placeholder: {
                  color: "#C9C9C9",
                  backgroundColor: "white",
                },
                iconContainer: {
                  top: 25,
                  right: 15,
                },
              }}
            />
            {success.document || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Elija su tipo de documento
              </Text>
            )}
            <View style={{ marginBottom: 22 }}>
              <Text medium style={styles.otherText}>
                Número de documento
              </Text>
              <TextInputMask
                onChangeText={(formatted, extracted) => {
                  setNumeroDocumento(extracted);
                }}
                autoCorrect={false}
                placeholder={t("Ingresa tu número")}
                // placeholderTextColor={BaseColor.grayColor}
                value={numeroDocumento}
                style={[
                  BaseStyle.textInput,
                  {
                    borderBottomWidth: 2,
                    borderColor: success.numeroDocumento
                      ? colorSuccess
                      : colorNotSucess,
                    backgroundColor: colors.card,
                    color: colors.text,
                    marginTop: 12,
                  },
                ]}
                mask={"[000000000000]"}
                keyboardType="numeric"
                onKeyPress={() => {
                  if (!success.numeroDocumento) {
                    setSuccess({
                      ...success,
                      numeroDocumento: true,
                    });
                  }
                }}
              />
              {success.numeroDocumento || !pressButton ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese su número de documento
                </Text>
              )}
            </View>
            <Text style={{ marginBottom: 15, fontSize: 15 }}>
              ¿Eres una empresa?
            </Text>
            <Switch value={isEnabled} onValueChange={toggleSwitch} />
            {isEnabled ? (
              <View style={{ flex: 1, marginTop: 25 }}>
                <Text medium style={styles.businessText}>
                  Nombre de empresa
                </Text>
                <TextInput
                  style={[
                    BaseStyle.textInput,
                    {
                      marginTop: 12,
                      borderColor: success.business
                        ? colorSuccess
                        : colorNotSucess,
                      borderBottomWidth: 2,
                    },
                  ]}
                  onChangeText={(text) => {
                    setBusiness(text);
                  }}
                  value={business}
                  autoCorrect={false}
                  placeholder={"Ingresa el nombre de la empresa"}
                  autoCapitalize="sentences"
                  onKeyPress={() => {
                    if (!success.business) {
                      setSuccess({
                        ...success,
                        business: true,
                      });
                    }
                  }}
                />
                {success.business || !pressSwitch ? null : (
                  <Text style={{ color: "#C62105", marginTop: 5 }}>
                    Ingrese un nombre válido
                  </Text>
                )}
              </View>
            ) : null}
            <View style={{ width: "100%", marginTop: 35 }}>
              <Button
                style={{
                  alignSelf: "center",
                  backgroundColor: colors.orangeColor,
                }}
                loading={loading}
                onPress={onSignUp}
              >
                {"Continuar"}
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
