import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Alert } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { patchAsync } from "../../services/ConnectApi";
import Spinner from "react-native-loading-spinner-overlay";
import { getAsync } from "../../services/ConnectApi";
import TextInputMask from "react-native-text-input-mask";

const ProfileEdit = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const perfil = useSelector((state) => state.auth.login.success.profile);
  const [profile, setProfile] = useState(perfil);
  const [names, setNames] = useState(profile.nombres);
  const [lastNames, setLastNames] = useState(profile.apellidos);
  const [businessName, setBusinessName] = useState(profile.nombreEmpresa);
  const [numero, setNumero] = useState(profile.numeroMovil);
  const [descripcion, setDescripcion] = useState(profile.descripcion);
  const [direccion, setDireccion] = useState(profile.direccion);
  const [website, setWebsite] = useState(profile.website);
  const [instagram, setInstagram] = useState(profile.instagram);
  const [facebook, setFacebook] = useState(profile.facebook);
  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const successInit = {
    names: true,
    lastNames: true,
    numero: true,
  };
  const [success, setSuccess] = useState(successInit);

  const iniciales = () => {
    return names.charAt(0) + lastNames.charAt(0);
  };

  const validateNames = (names) => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü-\s]{3,}$/;
    return reg.test(names);
  };

  const validatePhone = () => {
    const reg = /^[0-9]{9}$/;
    return reg.test(numero);
  };

  const handleBackButton = (e) => {
    if (!hasUnsavedChanges) {
      return;
    }
    e.preventDefault();
    Alert.alert(
      "Aviso",
      "Usted tiene cambios no guardados. ¿Estás seguro de descartar los y salir de la pantalla?",
      [
        { text: "No salir", style: "cancel", onPress: () => {} },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => {
            navigation.dispatch(e.data.action);
          },
        },
      ]
    );
  };

  const getUsuario = () => {
    getAsync(
      "/usuarios/" + profile.id,
      {
        onSuccess: (response) => {
          setProfile(response[0]);
          setLoading(false);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    getUsuario();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      handleBackButton(e);
    });
  }, [hasUnsavedChanges]);

  const actualizarDatos = () => {
    const body = {
      id: profile.id,
      nombres: names,
      apellidos: lastNames,
      nombreEmpresa: businessName,
      descripcion: descripcion,
      direccion: direccion,
      website: website,
      instagram: instagram,
      facebook: facebook,
    };
    patchAsync(
      "/usuarios",
      {
        onSuccess: (response) => {
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
        },
        data: body,
      },
      null
    );
  };

  const onSaveChanges = () => {
    setLoading(true);
    if (validateNames(names) && validateNames(lastNames) && validatePhone()) {
      navigation.removeListener("beforeRemove", (e) => {
        handleBackButton(e);
      });
      setHasUnsavedChanges(false);
      actualizarDatos();
    } else {
      setSuccess({
        ...success,
        names: validateNames(names),
        lastNames: validateNames(lastNames),
        numero: validatePhone(),
      });
      Alert.alert("Error", "Los datos que ingresó no son válidos");
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <View style={{ flex: 1 }}>
        <Header
          title={"Editar Perfil"}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {}}
        />
        <Spinner visible={loading} />
        <ScrollView>
          <View style={styles.contain}>
            <View
              style={[
                styles.thumb,
                { backgroundColor: colors.primaryBlueColor },
              ]}
            >
              <Text style={{ fontSize: 30, color: "#fff" }}>{iniciales()}</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Nombres"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: success.names ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                text = text.replace(/[0-9]/g, "");
                setNames(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Nombres"}
              placeholderTextColor={BaseColor.grayColor}
              value={names}
              onKeyPress={() => {
                if (!success.names) {
                  setSuccess({
                    ...success,
                    names: true,
                  });
                }
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Apellidos"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: success.lastNames ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                text = text.replace(/[0-9]/g, "");
                setLastNames(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Apellidos"}
              placeholderTextColor={BaseColor.grayColor}
              value={lastNames}
              onKeyPress={() => {
                if (!success.lastNames) {
                  setSuccess({
                    ...success,
                    lastNames: true,
                  });
                }
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Nombre de empresa"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: businessName ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                text = text.replace(/[0-9]/g, "");
                setBusinessName(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Nombre de empresa"}
              placeholderTextColor={BaseColor.grayColor}
              value={businessName}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Teléfono"}
              </Text>
            </View>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setNumero(extracted);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Número móvil"}
              value={numero}
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: success.numero ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              mask={"[000000000000]"}
              keyboardType="numeric"
              onKeyPress={() => {
                if (!success.numero) {
                  setSuccess({
                    ...success,
                    numero: true,
                  });
                }
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Descripción"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  height: 120,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: descripcion ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                setDescripcion(text);
                setHasUnsavedChanges(true);
              }}
              multiline={true}
              autoCorrect={false}
              placeholder={"Descripción"}
              placeholderTextColor={BaseColor.grayColor}
              value={descripcion}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Dirección"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: direccion ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                setDireccion(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Dirección"}
              placeholderTextColor={BaseColor.grayColor}
              value={direccion}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Página web"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: website ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                setWebsite(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Página web"}
              placeholderTextColor={BaseColor.grayColor}
              value={website}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Perfil de instagram"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: instagram ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                setInstagram(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Perfil de instagram"}
              placeholderTextColor={BaseColor.grayColor}
              value={instagram}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {"Perfil de facebook"}
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: facebook ? "#0191CB" : "#C9C9C9",
                  marginBottom: 15,
                },
              ]}
              onChangeText={(text) => {
                setFacebook(text);
                setHasUnsavedChanges(true);
              }}
              autoCorrect={false}
              placeholder={"Perfil de facebook"}
              placeholderTextColor={BaseColor.grayColor}
              value={facebook}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            style={{ alignSelf: "center" }}
            // loading={loading}
            onPress={onSaveChanges}
          >
            {"Guardar"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
