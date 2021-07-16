import {
  Button,
  CheckBox,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
  CategoryBoxColor3,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import { useSelector, useStore, useDispatch } from "react-redux";
import { postAsync, patchAsync } from "../../services/ConnectApi";
import TextInputMask from "react-native-text-input-mask";

export default function EShipping({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const store = useStore();
  const { id } = route.params;
  const [street, setStreet] = useState(route.params.direccion);
  const [contactName, setContactName] = useState(route.params.contactName);
  const [phone, setPhone] = useState(route.params.telefono);
  const [referencia, setReferencia] = useState(route.params.referencia);
  const [departamento, setDepartamento] = useState(route.params.departamento);
  const [provincia, setProvincia] = useState(route.params.provincia);
  const [distrito, setDistrito] = useState(route.params.distrito);
  const [arrow, setArrow] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = store.getState().auth.login.success.profile.id;

  const [success, setSuccess] = useState({
    contactName: true,
    telefono: true,
    referencia: true,
    street: true,
    departamento: true,
    provincia: true,
    distrito: true,
  });

  const departamentos = [
    { label: "Amazonas", value: "Amazonas", key: "amazonas" },
    {
      label: "Ancash",
      value: "Ancash",
      key: "ancash",
    },
    { label: "Apurímac", value: "Apurímac", key: "apurimac" },
    { label: "Arequipa", value: "Arequipa", key: "arequipa" },
    { label: "Ayacucho", value: "Ayacucho", key: "ayacucho" },
    { label: "Cajamarca", value: "Cajamarca", key: "cajamarca" },
    { label: "Cuzco", value: "Cuzco", key: "cuzco" },
    {
      label: "Huancavelica",
      value: "Huancavelica",
      key: "huancavelica",
    },
    { label: "Huánuco", value: "Huánuco", key: "huanuco" },
    { label: "Ica", value: "Ica", key: "ica" },
    { label: "Junín", value: "Junín", key: "junin" },
    {
      label: "La Libertad",
      value: "La Libertad",
      key: "lalibertad",
    },
    {
      label: "Lambayeque",
      value: "Lambayeque",
      key: "lambayeque",
    },
    { label: "Lima", value: "Lima", key: "lima" },
    { label: "Loreto", value: "Loreto", key: "loreto" },
    {
      label: "Madre de Dios",
      value: "Madre de Dios",
      key: "madrededios",
    },
    { label: "Moquegua", value: "Moquegua", key: "moquegua" },
    { label: "Pasco", value: "Pasco", key: "pasco" },
    { label: "Piura", value: "Piura", key: "piura" },
    { label: "Puno", value: "Puno", key: "puno" },
    {
      label: "San Martín",
      value: "San Martín",
      key: "sanmartin",
    },
    { label: "Tacna", value: "Tacna", key: "tacna" },
    { label: "Tumbes", value: "Tumbes", key: "Tumbes" },
    { label: "Ucayali", value: "Ucayali", key: "ucayali" },
  ];

  const validateDireccion = () => {
    if (street.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const validateDepartamento = () => {
    if (departamento.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const validateProvincia = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(provincia);
  };

  const validateDistrito = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(distrito);
  };

  const validateReferencia = () => {
    if (referencia.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const validateContactName = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(contactName);
  };

  const validatePhone = () => {
    const reg = /^[0-9]{9}$/;
    return reg.test(phone);
  };

  const onPress = () => {
    if (contactName) {
      if (
        !validateDireccion() ||
        !validateDepartamento() ||
        !validateProvincia() ||
        !validateDistrito() ||
        !validateReferencia() ||
        !validateContactName() ||
        !validatePhone()
      ) {
        setSuccess({
          ...success,
          street: validateDireccion() ? true : false,
          departamento: validateDepartamento() ? true : false,
          provincia: validateProvincia() ? true : false,
          distrito: validateDistrito() ? true : false,
          referencia: validateReferencia() ? true : false,
          contactName: validateContactName() ? true : false,
          telefono: validatePhone() ? true : false,
        });
      } else {
        setSuccess({
          ...success,
          street: true,
          departamento: true,
          provincia: true,
          distrito: true,
          referencia: true,
          contactName: true,
          telefono: true,
        });
        editAdress();
      }
    } else {
      if (
        !validateDireccion() ||
        !validateDepartamento() ||
        !validateProvincia() ||
        !validateDistrito() ||
        !validateReferencia() ||
        !validatePhone()
      ) {
        setSuccess({
          ...success,
          street: validateDireccion() ? true : false,
          departamento: validateDepartamento() ? true : false,
          provincia: validateProvincia() ? true : false,
          distrito: validateDistrito() ? true : false,
          referencia: validateReferencia() ? true : false,
          telefono: validatePhone() ? true : false,
        });
      } else {
        setSuccess({
          ...success,
          street: true,
          departamento: true,
          provincia: true,
          distrito: true,
          referencia: true,
          telefono: true,
        });
        editAdress();
      }
    }
  };

  const onDelete = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const deleteAdress = () => {
    patchAsync(
      "/direccion",
      {
        onSuccess: (response) => {
          onDelete();
          //listAdress()
        },
        onError: (error) => {},
        data: { id: id, estado: "0" }, // id:Session.user.id,
      },
      null
    );
  };

  const editAdress = () => {
    const body = {
      id: route.params.id,
      nombre: contactName,
      telefono: phone,
      direccion: street,
      departamento: departamento,
      provincia: provincia,
      distrito: distrito,
      referencia: referencia,
      usuario_id: userId,
    };

    patchAsync(
      "/direccion",
      {
        onSuccess: (response) => {
          const screenName = contactName ? "Shipping" : "ShippingPick";
          navigation.navigate(screenName);
        },
        onError: (error) => {
          Alert.alert("Error", error);
        },
        data: body, // id:Session.user.id,
      },
      null
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{
          flex: 1,
          backgroundColor: colors.backgroundContain,
        }}
      >
        <Header
          // title={t("Shipping")}
          title={t("Editar dirección")}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: colors.background }}
        />
        <ScrollView>
          <View
            style={{
              display: "flex",
              paddingHorizontal: 20,
              paddingTop: 20,
              marginTop: 8,
            }}
          >
            <View>
              <Text
                style={{ color: "#747474", fontSize: 16, fontWeight: "600" }}
              >
                Dirección
              </Text>
              <TextInput
                style={{
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderColor: success.street ? "#79A4DD" : "#C9C9C9",
                }}
                onChangeText={(text) => setStreet(text)}
                placeholder={t("Ingresa tu dirección de calle")}
                value={street}
                onKeyPress={() => {
                  if (!success.street) {
                    setSuccess({
                      ...success,
                      street: true,
                    });
                  }
                }}
              />
              {success.street ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese una dirección válida
                </Text>
              )}
              <Text
                style={{
                  color: "#747474",
                  fontSize: 16,
                  marginTop: "7%",
                  fontWeight: "600",
                }}
              >
                Departamento
              </Text>
              <RNPickerSelect
                placeholder={{ label: "Selecciona tu departamento" }}
                items={departamentos}
                doneText="Cerrar"
                onValueChange={(value) => setDepartamento(value)}
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
                    departamento: true,
                  });
                  setArrow(true);
                }}
                onClose={() => {
                  setArrow(false);
                }}
                value={departamento}
                style={{
                  inputIOS: {
                    marginTop: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: success.departamento
                      ? "#79A4DD"
                      : "#C9C9C9",
                    borderRadius: 4,
                    width: "100%",
                    alignSelf: "center",
                    // color: success.departamento ? "#1B1B1B" : "#C9C9C9",
                    backgroundColor: colors.card,
                    color: colors.text,
                  },
                  inputAndroid: {
                    marginTop: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: success.departamento
                      ? "#79A4DD"
                      : "#C9C9C9",
                    borderRadius: 8,
                    width: "100%",
                    alignSelf: "center",
                    // color: "#1B1B1B",
                    color: colors.text,
                    backgroundColor: colors.card,
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
              {success.departamento ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Escoja su departamento
                </Text>
              )}

              <View style={{ flexDirection: "row", marginTop: 14 }}>
                <View style={{ flex: 5.0, paddingRight: 8 }}>
                  <Text
                    style={{
                      color: "#747474",
                      marginVertical: "6%",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Provincia
                  </Text>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: success.provincia ? "#79A4DD" : "#C9C9C9",
                    }}
                    onChangeText={(text) => {
                      text = text.replace(/[0-9]/g, "");
                      setProvincia(text);
                    }}
                    placeholder={t("Ingresa tu provincia")}
                    value={provincia}
                    onKeyPress={() => {
                      if (!success.provincia) {
                        setSuccess({
                          ...success,
                          provincia: true,
                        });
                      }
                    }}
                  />
                </View>
                {success.provincia ? null : (
                  <Text style={{ color: "#C62105", marginTop: 5 }}>
                    Ingrese una provincia válida
                  </Text>
                )}
                <View style={styles.inputItem}>
                  <Text
                    style={{
                      color: "#747474",
                      marginVertical: "6%",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Distrito
                  </Text>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: success.distrito ? "#79A4DD" : "#C9C9C9",
                    }}
                    onChangeText={(text) => {
                      text = text.replace(/[0-9]/g, "");
                      setDistrito(text);
                    }}
                    keyboardType="numeric"
                    placeholder={t("Ingresa tu distrito")}
                    value={distrito}
                    onKeyPress={() => {
                      if (!success.distrito) {
                        setSuccess({
                          ...success,
                          distrito: true,
                        });
                      }
                    }}
                  />
                </View>
              </View>
              {success.distrito ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese un distrito válido
                </Text>
              )}
              <Text
                style={{
                  color: "#747474",
                  fontSize: 16,
                  marginTop: "7%",
                  fontWeight: "600",
                }}
              >
                Referencia
              </Text>
              <TextInput
                style={{
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderColor: success.referencia ? "#79A4DD" : "#C9C9C9",
                }}
                onChangeText={(text) => setReferencia(text)}
                placeholder={t("Ingresa una referencia")}
                value={referencia}
                onKeyPress={() => {
                  if (!success.referencia) {
                    setSuccess({
                      ...success,
                      referencia: true,
                    });
                  }
                }}
              />
              {success.referencia ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese una referencia
                </Text>
              )}
              {!contactName ? null : (
                <Text headline semibold style={{ marginTop: 35 }}>
                  {t("Datos de la persona")}
                </Text>
              )}
              {!contactName ? null : (
                <Text
                  style={{
                    color: "#747474",
                    fontSize: 16,
                    marginTop: "6.5%",
                    fontWeight: "600",
                  }}
                >
                  Nombre
                </Text>
              )}
              {!contactName ? null : (
                <TextInput
                  style={{
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderColor: success.contactName ? "#79A4DD" : "#C9C9C9",
                  }}
                  onChangeText={(text) => {
                    text = text.replace(/[0-9]/g, "");
                    setContactName(text);
                  }}
                  placeholder={t("Ingresa tu nombre")}
                  value={contactName}
                  onKeyPress={() => {
                    if (!success.contactName) {
                      setSuccess({
                        ...success,
                        contactName: true,
                      });
                    }
                  }}
                />
              )}
              {!contactName ? null : success.contactName ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese un nombre válido
                </Text>
              )}
              <Text
                style={{
                  color: "#747474",
                  fontSize: 16,
                  marginTop: "6.5%",
                  fontWeight: "600",
                }}
              >
                Teléfono de contacto
              </Text>
              <TextInputMask
                style={[
                  BaseStyle.textInput,
                  {
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderColor: success.telefono ? "#79A4DD" : "#C9C9C9",
                    backgroundColor: colors.card,
                    color: colors.text,
                  },
                ]}
                onChangeText={(formatted, extracted) => {
                  setPhone(extracted);
                }}
                placeholder={t("Ingresa tu número de teléfono")}
                value={phone}
                mask={"[000] [000] [000]"}
                keyboardType="numeric"
                onKeyPress={() => {
                  if (!success.telefono) {
                    setSuccess({
                      ...success,
                      telefono: true,
                    });
                  }
                }}
              />
              {success.telefono ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese un número válido
                </Text>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => onPress()}>
              <Text
                style={{
                  color: "#3279D7",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Guardar cambios
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
              }}
              onPress={deleteAdress}
            >
              <Text
                style={{
                  color: "#C62105",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Eliminar dirección
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
