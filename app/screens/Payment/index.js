import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
  CategoryBoxColor4,
} from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import { useSelector, useStore } from "react-redux";
import { getAsync } from "../../services/ConnectApi";
import TextInputMask from "react-native-text-input-mask";
import RNPickerSelect from "react-native-picker-select";
import { postAsync } from "../../services/ConnectApi";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function Payment({ route, navigation }) {
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const adressChoosed = route.params?.adressChoosed;
  const userData = route.params?.userData;
  const ttlPrice = route.params?.ttlPrice;
  const numProducts = route.params?.numProducts;
  const selectProducts = route.params?.selectProducts;
  const [bankName, setBankName] = useState("");
  const [loadingPlaceholder, setLoadingPlaceholder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [numTarjeta, setNumTarjeta] = useState("");
  const [numCuenta, setNumCuenta] = useState("");
  const [entFinanciera, setEntFinanciera] = useState("");
  const [fecha, setFecha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [titular, setTitular] = useState("");
  const [add, setAdd] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [success, setSuccess] = useState({
    numTarjeta: false,
    numCuenta: false,
    entFinanciera: false,
    fecha: false,
    codigo: false,
    titular: false,
    marca: false,
  });

  const [paymethod, setPaymethod] = useState({});
  const [paymethodChoosed, setPaymethodChoosed] = useState({});
  const store = useStore();
  const { id, tiempoEntrega } = useSelector(
    (state) => state.auth.login.success.profile
  );
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [paymentEdit, setPaymentEdit] = useState({});
  const [marcaTarget, setMarcaTarget] = useState("");
  const [paymentEntry, setPaymentEntry] = useState({});

  const [pressButton, setPressButton] = useState(false);

  const listPayment = () => {
    getAsync(
      "/payment?usuario_id=" + id,
      {
        onSuccess: (response) => {
          setPaymethod(response);
        },
        onError: (error) => { },
      },
      null
    );
  };

  const listPaymetnEntry = () => {
    getAsync(
      "/paymententry?usuario_id=" + userData.id,
      {
        onSuccess: (response) => {
          setPaymentEntry(response[0]);
        },
        onError: (error) => { },
      },
      null
    );
  };

  useEffect(() => {
    listPayment();
    if (userData) {
      listPaymetnEntry();
    }
    const timeout = setTimeout(() => {
      setLoadingPlaceholder(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocused]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     listPayment();
  //     listPaymetnEntry();
  //     setTimeout(() => {
  //       setLoadingPlaceholder(false);
  //     }, 2000);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  /**
   *
   * Called when process checkout
   */
  const onCheckOut = () => {
    navigation.navigate("Summary", {
      userData: userData,
      numProducts: numProducts,
      ttlPrice: ttlPrice,
      adressChoosed: adressChoosed,
      payment: paymethodChoosed,
      paymethodChoosed: paymethodChoosed,
      id: id,
      paymentEntry: paymentEntry,
      tiempoEntrega: tiempoEntrega,
      selectProducts: selectProducts,
      body: {
        usuarioIdVendedor: userData.id,
        usuarioIdComprador: id,
        metodoCobro: paymentEntry.id,
        metodoPago: paymethodChoosed.id,
        cantidad: numProducts,
        precioTotal: ttlPrice,
        estadoTransaccionNuevo: "CRE",
        tipoEntrega: adressChoosed.tipoEntrega,
        descripcion: "",
        codigoTransaccion: -1,
        direccionId: adressChoosed.id,
        tiempoEntrega: tiempoEntrega,
        codigoConfirmacionIn: -1,
        codigoCancelacionIn: -1,
        detalleTransaccion: selectProducts.map((producto) => {
          return {
            producto_id: producto.id,
            metadata: producto.metadata,
            precio: producto.price,
            cantidad: producto.cantidad,
            estado: "1",
          };
        }),
      }
    });
  };

  const renderPlaceholder = () => {
    let y = 0;
    let height = 100;

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
            <Rect x="15" y={50} rx="8" ry="8" width="10" height={10} />
            <Rect x="40" y={15} rx="8" ry="8" width="60" height={25} />
            <Rect x="115" y={22} rx="8" ry="8" width="90" height={12} />
            <Rect x="40" y={60} rx="8" ry="8" width="25%" height={10} />
            <Rect x="75%" y={40} rx="8" ry="8" width="20%" height={10} />
          </Fragment>
        </ContentLoader>
      </View>
    );
  };

  const handleChooseEdit = (item) => {
    setPaymentEdit(item);
  };

  const onChangType = (item) => {
    setType(item);
  };

  const validateNumTarjeta = () => {
    const reg = /^[0-9]{13,18}$/;
    return reg.test(numTarjeta);
  };

  const validateCodigo = () => {
    const reg = /^[0-9]{3,5}$/;
    return reg.test(codigo);
  };

  const validateFecha = () => {
    if (fecha.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateTitular = () => {
    const reg = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
    return reg.test(titular);
  };

  const validateMarca = () => {
    const reg = /^[A-Z\s]{4,}$/;
    return reg.test(marcaTarget);
  };

  const validateNumCuenta = () => {
    const reg = /^[0-9]{20}$/;
    return reg.test(numCuenta);
  };

  const validateFinanciera = () => {
    if (marcaTarget.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const onPressTarjeta = () => {
    setPressButton(true);
    if (
      !validateNumTarjeta() ||
      !validateFecha() ||
      !validateCodigo() ||
      !validateTitular() ||
      !validateMarca()
    ) {
      setSuccess({
        ...success,
        numTarjeta: validateNumTarjeta() ? true : false,
        fecha: validateFecha() ? true : false,
        codigo: validateCodigo() ? true : false,
        titular: validateTitular() ? true : false,
        marca: validateMarca() ? true : false,
      });
    } else {
      setSuccess({
        ...success,
        numTarjeta: true,
        fecha: true,
        codigo: true,
        titular: true,
        marca: true,
      });

      addPaymethod({
        nombre: titular,
        tipo: "TC",
        marca: marcaTarget,
        moneda: "SOLES",
        numero: numTarjeta,
      });
    }
  };

  // const onPressFinanciera = () => {
  //   setPressButton(true);
  //   if (!validateNumCuenta() || !validateFinanciera()) {
  //     setSuccess({
  //       ...success,
  //       numCuenta: validateNumTarjeta() ? true : false,
  //       entFinanciera: validateFecha() ? true : false,
  //     });
  //   } else {
  //     setSuccess({
  //       ...success,
  //       numCuenta: true,
  //       entFinanciera: true,
  //     });

  //     addPaymethod({
  //       // nombre: "",
  //       tipo: "TI",
  //       entidad: entFinanciera,
  //       moneda: "SOLES",
  //       numero: numCuenta,
  //     });
  //   }
  // };

  const limpiarValores = () => {
    setNumTarjeta("");
    setFecha("");
    setCodigo("");
    setTitular("");
    setMarcaTarget("");
    setSuccess({
      ...success,
      numTarjeta: false,
      fecha: false,
      codigo: false,
      titular: false,
      marca: false,
    });
  };

  const addPaymethod = (body) => {
    body.usuario_id = id;
    postAsync(
      "/payment",
      {
        onSuccess: (response) => {
          setAdd(false);
          listPayment();
          limpiarValores();
        },
        onError: (error) => { },
        data: body, // id:Session.user.id,
      },
      null
    );
  };

  const handleChoose = (item) => {
    setPaymethodChoosed(item);
    //onChange(item);
  };

  const renderAgregarMetodoPago = () => {
    return (
      <View
        style={{ marginTop: 15, backgroundColor: colors.backgroundContain }}
      >
        <Text headline>{t("Agregar Método de Pago")}</Text>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 10,
            marginTop: 10,
            backgroundColor: colors.backgroundContain,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setChecked1(true);
              setChecked2(false);
              setPressButton(false);
            }}
          >
            <View
              style={{
                width: 167,
                height: 63,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#fff",
                backgroundColor: colors.ventasColorDownBox,
                marginHorizontal: 10,
                borderWidth: checked1 ? 2 : 0,
                borderColor: checked1 ? "#0191CB" : "none",
              }}
            >
              <Text style={{ width: 116, textAlign: "center" }}>
                Tarjeta de crédito o débito
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChecked1(false);
              setChecked2(true);
              setPressButton(false);
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
                borderColor: checked2 ? "#0191CB" : "none",
              }}
            >
              <Text style={{ width: 116, textAlign: "center" }}>
                Transferencia bancaria
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.background,
          }}
        >
          {renderTarjeta()}
        </View>
        <TouchableOpacity
          style={{
            marginVertical: 30,
            alignItems: "center",
          }}
          onPress={() => {
            onPressTarjeta();
          }}
        >
          <Text
            style={{
              color: "#3279D7",
              fontSize: 14,
              textDecorationLine: "underline",
            }}
          >
            Guardar método de pago
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPaymethod = () => {
    return (
      <>
        {paymethod.length > 0 ? (
          <>
            {paymethod.map((item, index) => {
              const num = item.numero.length;
              return (
                <CategoryBoxColor4
                  key={item.id}
                  id={item.id}
                  checked={paymethodChoosed.id == item.id}
                  nombre={!item.nombre ? item.entidad : item.nombre}
                  numTarjeta={"*".repeat(4) + " " + item.numero.slice(num - 4)}
                  image={item.marca.charAt(0).toLowerCase()}
                  appear={true}
                  onPress={() => handleChoose(item)}
                  onEdit={() => {
                    handleChooseEdit(item);
                    navigation.navigate("EPayment", {
                      id: item.id,
                      nombre: item.nombre,
                      numero: item.numero,
                      tipo: item.tipo,
                      moneda: item.moneda,
                      marca: item.marca,
                    });
                  }}
                  onDelete={listPayment}
                  style={{ marginBottom: 22 }}
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
              No hay métodos de pago registrados
            </Text>
          </View>
        )}
        <View
          style={{
            paddingVertical: 10,
            paddingRight: 10,
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
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              limpiarValores();
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
              {add ? "Cerrar" : "Agregar método de pago"}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // const renderTransferencia = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   return (
  //     <View style={{ backgroundColor: colors.backgroundContain }}>
  //       <Text
  //         medium
  //         style={{
  //           color: "#747474",
  //           fontSize: 16,
  //           marginBottom: 8,
  //           marginTop: "2%",
  //         }}
  //       >
  //         Número de cuenta
  //       </Text>
  //       <TextInputMask
  //         onChangeText={(formatted, extracted) => {
  //           setNumCuenta(extracted);
  //         }}
  //         autoCorrect={false}
  //         placeholder={"Ingrese su número de cuenta"}
  //         value={numCuenta}
  //         placeholderTextColor={BaseColor.grayColor}
  //         style={[
  //           BaseStyle.textInput,
  //           {
  //             borderColor: success.numCuenta ? "#79A4DD" : "#C9C9C9",
  //             borderBottomWidth: 1,
  //             backgroundColor: colors.card,
  //             color: colors.text,
  //           },
  //         ]}
  //         mask={"[00000]-[00000]-[00000]-[00000]"}
  //         onKeyPress={() => {
  //           if (!success.numCuenta) {
  //             setSuccess({
  //               ...success,
  //               numCuenta: true,
  //             });
  //           }
  //         }}
  //       />
  //       {success.numCuenta || !pressButton ? null : (
  //         <Text style={{ color: "#C62105", marginTop: 5 }}>
  //           Ingrese un nro de cuenta válido
  //         </Text>
  //       )}
  //       <Text
  //         medium
  //         style={{
  //           color: "#747474",
  //           fontSize: 16,
  //           marginBottom: 8,
  //           marginTop: "10%",
  //         }}
  //       >
  //         Entidad Financiera
  //       </Text>
  //       <RNPickerSelect
  //         placeholder={{ label: "Selecciona tu entidad financiera" }}
  //         items={bancos}
  //         doneText="Cerrar"
  //         onValueChange={(value) => setEntFinanciera(value)}
  //         Icon={() => {
  //           return (
  //             <Icon
  //               name={arrow ? "chevron-up" : "chevron-down"}
  //               size={12}
  //               solid
  //               color={arrow ? "#3279D7" : BaseColor.grayColor}
  //             />
  //           );
  //         }}
  //         onOpen={() => {
  //           setSuccess({
  //             ...success,
  //             entFinanciera: true,
  //           });
  //           setArrow(true);
  //         }}
  //         onClose={() => {
  //           setArrow(false);
  //         }}
  //         value={entFinanciera}
  //         style={{
  //           inputIOS: {
  //             marginTop: 10,
  //             paddingVertical: 12,
  //             paddingHorizontal: 10,
  //             borderBottomWidth: 1,
  //             borderBottomColor: success.entFinanciera ? "#79A4DD" : "#C9C9C9",
  //             borderRadius: 4,
  //             width: "100%",
  //             alignSelf: "center",
  //             // color: success.departamento ? "#1B1B1B" : "#C9C9C9",
  //             color: colors.text,
  //             backgroundColor: colors.card,
  //             marginBottom: 12,
  //           },
  //           inputAndroid: {
  //             marginTop: 10,
  //             paddingHorizontal: 10,
  //             paddingVertical: 8,
  //             borderBottomWidth: 1,
  //             borderBottomColor: success.entFinanciera ? "#79A4DD" : "#C9C9C9",
  //             borderRadius: 8,
  //             width: "100%",
  //             alignSelf: "center",
  //             color: colors.text,
  //             backgroundColor: colors.card,
  //             marginBottom: 12,
  //           },
  //           placeholder: {
  //             color: BaseColor.grayColor,
  //             backgroundColor: colors.card,
  //           },
  //           iconContainer: {
  //             top: 25,
  //             right: 15,
  //           },
  //         }}
  //       />
  //       {success.entFinanciera || !pressButton ? null : (
  //         <Text style={{ color: "#C62105", marginTop: 5 }}>
  //           Escoja su entidad financiera
  //         </Text>
  //       )}
  //     </View>
  //   );
  // };

  const renderTarjeta = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ backgroundColor: colors.backgroundContain }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: marcaTarget === "VISA" ? "#0191CB" : "#EEECEC",
              width: 55,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={Images.tarjVisa2}
              style={{ width: 52, height: 32 }}
            />
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: marcaTarget === "MASTERCARD" ? "#0191CB" : "#EEECEC",
              width: 55,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#fff",
              marginHorizontal: 5,
            }}
          >
            <Image
              source={Images.tarjMastercard2}
              style={{ width: 45, height: 28 }}
            />
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor:
                marcaTarget === "AMERICAN EXPRESS" ? "#0191CB" : "#EEECEC",
              width: 55,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              backgroundColor: "#006FCF",
            }}
          >
            <Image
              source={Images.tarjAmerican3}
              style={{ width: 53, height: 30 }}
              resizeMode="cover"
            />
          </View>
        </View>
        {success.marca || !pressButton ? null : (
          <Text style={{ color: "#C62105", marginVertical: 5 }}>
            Su número no coincide con ninguna de estas tarjetas
          </Text>
        )}
        <Text
          medium
          style={{
            color: "#747474",
            fontSize: 16,
            marginBottom: 8,
            marginTop: "2%",
          }}
        >
          Número de tarjeta
        </Text>

        <TextInputMask
          onChangeText={(formatted, extracted) => {
            setNumTarjeta(extracted);
            if (numTarjeta.length > 3) {
              if (numTarjeta[0] === "3" && numTarjeta[1] === "4") {
                setMarcaTarget("AMERICAN EXPRESS");
              } else if (numTarjeta[0] === "4") {
                setMarcaTarget("VISA");
              } else if (numTarjeta[0] === "5") {
                setMarcaTarget("MASTERCARD");
              }
            } else {
              setMarcaTarget("");
            }
          }}
          autoCorrect={false}
          placeholder={"Ingresa el número de tu tarjeta"}
          placeholderTextColor={BaseColor.grayColor}
          value={numTarjeta}
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.numTarjeta ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          mask={"[0000]-[0000]-[0000]-[0000]"}
          onKeyPress={() => {
            if (!success.numTarjeta) {
              setSuccess({
                ...success,
                numTarjeta: true,
              });
            }
            if (!success.marca) {
              setSuccess({
                ...success,
                marca: true,
              });
            }
          }}
        />
        {success.numTarjeta || !pressButton ? null : (
          <Text style={{ color: "#C62105", marginTop: 5 }}>
            Ingrese un número de tarjeta válido
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            marginTop: "6%",
          }}
        >
          <View style={{ flex: 5, marginHorizontal: "2%" }}>
            <Text
              style={{
                color: "#747474",
                marginVertical: "6%",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Fecha expiración
            </Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setFecha(formatted);
              }}
              autoCorrect={false}
              placeholder={t("Fecha")}
              placeholderTextColor={BaseColor.grayColor}
              value={fecha}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.fecha ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  backgroundColor: colors.card,
                  color: colors.text,
                },
              ]}
              mask={"[00]/[00]"}
              onKeyPress={() => {
                if (!success.fecha) {
                  setSuccess({
                    ...success,
                    fecha: true,
                  });
                }
              }}
            />
            {success.fecha || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese una fecha
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
              CVV/CVV2
            </Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setCodigo(extracted);
              }}
              autoCorrect={false}
              placeholder={t("Código")}
              placeholderTextColor={BaseColor.grayColor}
              value={codigo}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: success.codigo ? "#79A4DD" : "#C9C9C9",
                  borderBottomWidth: 1,
                  backgroundColor: colors.card,
                  color: colors.text,
                },
              ]}
              mask={"[0000]"}
              onKeyPress={() => {
                if (!success.codigo) {
                  setSuccess({
                    ...success,
                    codigo: true,
                  });
                }
              }}
            />
            {success.codigo || !pressButton ? null : (
              <Text style={{ color: "#C62105", marginTop: 5 }}>
                Ingrese su CVV
              </Text>
            )}
          </View>
        </View>
        <Text
          medium
          style={{
            color: "#747474",
            fontSize: 16,
            marginBottom: 8,
            marginTop: "10%",
          }}
        >
          Titular de la tarjeta
        </Text>
        <TextInput
          style={[
            BaseStyle.textInput,
            {
              borderColor: success.titular ? "#79A4DD" : "#C9C9C9",
              borderBottomWidth: 1,
              marginBottom: 12,
            },
          ]}
          onChangeText={(text) => {
            text = text.replace(/[0-9]/g, "");
            setTitular(text);
          }}
          autoCorrect={false}
          placeholder={"Ingresa nombre del titular de tu tarjeta"}
          autoCapitalize="sentences"
          value={titular}
          onKeyPress={() => {
            if (!success.titular) {
              setSuccess({
                ...success,
                titular: true,
              });
            }
          }}
        />
        {success.titular || !pressButton ? null : (
          <Text style={{ color: "#C62105", marginTop: 5 }}>
            Ingrese un nombre válido
          </Text>
        )}
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
          title={t("Método de Pago")}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          style={{ backgroundColor: colors.background, marginBottom: 20 }}
        />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            backgroundColor: colors.backgroundContain,
          }}
        >
          {loadingPlaceholder ? renderPlaceholder() : renderPaymethod()}
          {/* {renderPlaceholder()} */}
          {add ? renderAgregarMetodoPago() : null}
        </ScrollView>
        {route.params ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginBottom: 25,
            }}
          >
            <Button
              style={{
                alignSelf: "center",
                backgroundColor:
                  paymethodChoosed.id == null || add
                    ? "#EEECEC"
                    : colors.primaryYellow,
              }}
              loading={loading}
              onPress={() => {
                onCheckOut();
              }}
              styleText={{
                color: paymethodChoosed.id == null || add ? "#CDCACA" : "#fff",
              }}
              disabled={paymethodChoosed.id == null || add ? true : false}
            >
              {t("Confirmar")}
            </Button>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
