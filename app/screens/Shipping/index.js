import {
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
  CategoryBoxColor3,
  Image,
  Button,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { Fragment, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import styles from "./styles";
import { postAsync, getAsync } from "../../services/ConnectApi";
import { useStore } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import TextInputMask from "react-native-text-input-mask";

export default function Shipping({ route, navigation }) {
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { userData, ttlPrice, numProducts, selectProducts } = route.params;

  const [add, setAdd] = useState(false);
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [street, setStreet] = useState("");
  const [referencia, setReferencia] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [arrow, setArrow] = useState(false);

  const [loadingPrincipalAdress, setLoadingPrincipalAdress] = useState(true);
  const [loadingAdress, setLoadingAdress] = useState(false);
  const [adress, setAdress] = useState([]);
  const [adressShipping, setAdressShipping] = useState([]);
  const [adressPick, setAdressPick] = useState([]);
  const [adressChoosed, setAdressChoosed] = useState({});
  const [adressEdit, setAdressEdit] = useState({});
  const [pressButton, setPressButton] = useState(false);
  const store = useStore();
  const userId = store.getState().auth.login.success.profile.id;
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [success, setSuccess] = useState({
    contactName: false,
    telefono: false,
    referencia: false,
    street: false,
    departamento: false,
    provincia: false,
    distrito: false,
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

  const listAdressPick = () => {
    getAsync(
      "/direccion?usuario_id=" + userData.id,
      {
        onSuccess: (response) => {
          const pick = response.filter((item) => {
            return item.tipoEntrega == "RECOJO";
          });
          setAdressPick(pick);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  const listAdress = () => {
    getAsync(
      "/direccion?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          const shipping = response.filter((item) => {
            return item.tipoEntrega == "ENVIO";
          });
          setAdressShipping(shipping);
        },
        onError: (error) => {},
      },
      null
    );
  };

  const listUsers = () => {
    getAsync(
      "/usuarios/" + userData.id,
      {
        onSuccess: (response) => {
          if (response[0].envio == "1") {
            listAdress();
          }
          if (response[0].recojo == "1") {
            listAdressPick();
          }
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    listAdress();
    listAdressPick();
    const timeout = setTimeout(() => {
      setLoadingPrincipalAdress(false);
    }, 2500);
    return () => {
      console.log("Unmounted Shipping");
      clearTimeout(timeout);
    };
  }, [isFocused]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     listUsers();
  //     setTimeout(() => {
  //       setLoadingPrincipalAdress(false);
  //     }, 2000);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  /**
   *
   * Called when process checkout
   */
  const onShipping = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Payment", {
        adressChoosed: adressChoosed,
        userData: userData,
        ttlPrice: ttlPrice,
        numProducts: numProducts,
        selectProducts: selectProducts,
      });
    }, 500);
  };

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
    if (referencia.length === 0) {
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

  const limpiarValores = () => {
    setStreet("");
    setDepartamento("");
    setProvincia("");
    setDistrito("");
    setReferencia("");
    setContactName("");
    setPhone("");
    setSuccess({
      ...success,
      street: false,
      departamento: false,
      provincia: false,
      distrito: false,
      referencia: false,
      contactName: false,
      telefono: false,
    });
  };

  const onPress = () => {
    setPressButton(true);
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
      addAdress();
    }
  };

  const addAdress = () => {
    const body = {
      nombre: contactName,
      telefono: phone,
      direccion: street,
      departamento: departamento,
      provincia: provincia,
      distrito: distrito,
      referencia: referencia,
      usuario_id: userId,
      tipoEntrega: "ENVIO",
    };

    postAsync(
      "/direccion",
      {
        onSuccess: (response) => {
          setAdd(false);
          listAdress();
          limpiarValores();
        },
        onError: (error) => {
          Alert.alert("Error", error);
        },
        data: body,
      },
      null
    );
  };

  const renderPlaceholder = () => {
    let y = 0;
    let height = 150;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"500"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Fragment key="1">
            <Rect x="0" y={y} rx="8" ry="8" width="100%" height={height} />
            <Rect x="15" y={75} rx="8" ry="8" width="10" height={10} />
            <Rect x="40" y={15} rx="8" ry="8" width="80%" height={12} />
            <Rect x="40" y={45} rx="8" ry="8" width="50%" height={10} />
            <Rect x="40" y={68} rx="8" ry="8" width="45%" height={10} />
            <Rect x="40" y={91} rx="8" ry="8" width="45%" height={10} />
            <Rect x="40" y={114} rx="8" ry="8" width="50%" height={10} />
          </Fragment>
        </ContentLoader>
      </View>
    );
  };

  const handleChoose = (item) => {
    setAdressChoosed(item);
  };

  const handleChooseEdit = (item) => {
    setAdressEdit(item);
  };

  const renderAddDireccion = () => {
    return (
      <View
        style={{
          height: 40,
          width: 220,
          marginBottom: 14,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            setAdd(!add);
            setPressButton(false);
          }}
        >
          <Icon
            name={add ? "times" : "plus"}
            size={16}
            color={colors.primaryBlueColor}
          />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: colors.primaryBlueColor,
              marginLeft: 8,
            }}
          >
            {add ? "Cerrar" : "Agregar una nueva dirección"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAdress = (typeAdress, bool) => {
    return (
      <>
        {typeAdress.length > 0 ? (
          <>
            {typeAdress.map((item, index) => {
              return (
                <CategoryBoxColor3
                  key={item.id}
                  id={item.id}
                  select={true}
                  direccion={item.direccion}
                  nombre={item.nombre}
                  telefono={item.telefono}
                  referencia={item.referencia}
                  departamento={item.departamento}
                  provincia={item.provincia}
                  distrito={item.distrito}
                  onDelete={listAdress}
                  checked={adressChoosed.id == item.id}
                  onPress={() => handleChoose(item)}
                  notEdit={bool}
                  onEdit={() => {
                    handleChooseEdit(item);
                    navigation.navigate("EShipping", {
                      id: item.id,
                      contactName: item.nombre,
                      direccion: item.direccion,
                      distrito: item.distrito,
                      provincia: item.provincia,
                      departamento: item.departamento,
                      referencia: item.referencia,
                      telefono: item.telefono,
                    });
                    // setEdit(!edit);
                  }}
                />
              );
            })}
          </>
        ) : (
          <View
            style={[
              styles.content,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
              }}
            >
              No hay direcciones registradas
            </Text>
          </View>
        )}
        {bool ? null : renderAddDireccion()}
      </>
    );
  };
  const renderDireccion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View
        style={{
          display: "flex",
          backgroundColor: colors.backgroundContain,
        }}
      >
        <Text headline>{t("Agregar dirección")}</Text>
        <View style={{ marginTop: "6%" }}>
          <Text style={{ color: "#747474", fontSize: 16, fontWeight: "600" }}>
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
          {success.street || !pressButton ? null : (
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
                borderBottomColor: success.departamento ? "#79A4DD" : "#C9C9C9",
                borderRadius: 4,
                width: "100%",
                alignSelf: "center",
                // color: success.departamento ? "#1B1B1B" : "#C9C9C9",
                backgroundColor: colors.card,
              },
              inputAndroid: {
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: success.departamento ? "#79A4DD" : "#C9C9C9",
                borderRadius: 8,
                width: "100%",
                alignSelf: "center",
                color: "#1B1B1B",
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
          {success.departamento || !pressButton ? null : (
            <Text style={{ color: "#C62105", marginTop: 5 }}>
              Seleccione su departamento
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
              {success.provincia || !pressButton ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese una provincia válida
                </Text>
              )}
            </View>
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
              {success.distrito || !pressButton ? null : (
                <Text style={{ color: "#C62105", marginTop: 5 }}>
                  Ingrese un distrito válido
                </Text>
              )}
            </View>
          </View>

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
          {success.referencia || !pressButton ? null : (
            <Text style={{ color: "#C62105", marginTop: 5 }}>
              Ingrese una referencia válida
            </Text>
          )}
          <Text headline semibold style={{ marginTop: 35 }}>
            {/* {t("contact_details")} */}
            {t("Datos de la persona")}
          </Text>
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
          {success.contactName || !pressButton ? null : (
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
          {success.telefono || !pressButton ? null : (
            <Text style={{ color: "#C62105", marginTop: 5 }}>
              Ingrese un número válido
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginBottom: "2%",
            backgroundColor: colors.backgroundContain,
            alignItems: "center",
          }}
          onPress={() => onPress()}
        >
          <Text
            style={{
              color: "#3279D7",
              fontSize: 14,
              textDecorationLine: "underline",
            }}
          >
            Guardar dirección
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderShippingPick = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            backgroundColor: colors.backgroundContain,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setChecked1(true);
              setChecked2(false);
              // setAdress(adressShipping);
              setAdressChoosed({});
              setLoadingAdress(true);
              setTimeout(() => {
                setLoadingAdress(false);
              }, 1500);
              // setPressButton(false);
            }}
          >
            <View
              style={{
                width: 167,
                height: 63,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.ventasColorDownBox,
                marginHorizontal: 10,
                borderWidth: checked1 ? 2 : 0,
                borderColor: checked1 ? colors.primaryBlueColor : "none",
              }}
            >
              <Text style={{ textAlign: "center" }}>Dirección de envío</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChecked2(true);
              setChecked1(false);
              setAdressChoosed({});
              setLoadingAdress(true);
              setTimeout(() => {
                setLoadingAdress(false);
              }, 1500);
            }}
          >
            <View
              style={{
                width: 167,
                height: 63,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.ventasColorDownBox,
                marginHorizontal: 10,
                borderWidth: checked2 ? 2 : 0,
                borderColor: checked2 ? colors.primaryBlueColor : "none",
              }}
            >
              <Text style={{ textAlign: "center" }}>Dirección de recojo</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loadingAdress
          ? renderPlaceholder()
          : checked1
          ? renderAdress(adressShipping, false)
          : checked2
          ? renderAdress(adressPick, true)
          : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: colors.backgroundContain }}
      >
        <Header
          title={"Entrega"}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: colors.background }}
        />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            backgroundColor: colors.backgroundContain,
          }}
        >
          {loadingPrincipalAdress ? (
            <View style={{ height: 200, width: "100%" }}>
              {renderPlaceholder()}
            </View>
          ) : (
            <View>
              <Text headline style={{ textAlign: "center", marginBottom: 15 }}>
                {adressPick.length > 0 && adressShipping.length > 0
                  ? "Elige tu método de entrega"
                  : adressShipping.length > 0
                  ? "Elige tu dirección de envío"
                  : "Elige una dirección de recojo"}
              </Text>
              {adressPick.length > 0 && adressShipping.length > 0
                ? renderShippingPick()
                : adressShipping.length > 0
                ? renderAdress(adressShipping, false)
                : renderAdress(adressPick, true)}
            </View>
          )}

          {add ? renderDireccion() : null}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: colors.backgroundContain,
          }}
        >
          <Button
            loading={loading}
            style={{
              borderRadius: 50,
              width: 280,
              alignSelf: "center",
              marginBottom: 30,
              backgroundColor:
                adressChoosed.id == null || add
                  ? "#EEECEC"
                  : colors.primaryYellow,
            }}
            onPress={() => {
              onShipping();
            }}
            styleText={{
              fontWeight: "600",
              color: adressChoosed.id == null || add ? "#CDCACA" : "#fff",
            }}
            disabled={adressChoosed.id == null || add ? true : false}
          >
            {t("Continuar con el pago")}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
