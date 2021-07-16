import { Icon, SafeAreaView, Tag, Text, Header } from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
// Load sample data
import React, { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Switch,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import { getAsync, patchAsync } from "../../services/ConnectApi";
import Spinner from "react-native-loading-spinner-overlay";
import ContentLoader, { Rect } from "react-content-loader/native";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

const DataShippingPick = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation, route } = props;
  const [loading, setLoading] = useState(true);
  // const profile = useSelector((state) => state.auth.login.success.profile);
  const profile = route.params?.user;
  const { recojo, envio, id, tiempoEntrega } = profile;
  const [isEnabled, setIsEnabled] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [shippingIsEnabled, setShippingIsEnabled] = useState(
    profile.envio === "1" ? true : false
  );
  const [pickIsEnabled, setPickIsEnabled] = useState(
    profile.recojo === "1" ? true : false
  );
  const [deliveryTime, setDeliveryTime] = useState(
    !profile.tiempoEntrega ? 0 : profile.tiempoEntrega
  );
  const [returnCost, setReturnCost] = useState(
    profile.costoDevolucion === "1" ? true : false
  );
  const [costShipping, setCostShipping] = useState(
    profile.costoEnvio === "1" ? true : false
  );
  const [visibleSave, setVisibleSave] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [arrow, setArrow] = useState(false);

  //         setShippingIsEnabled(usuario[0].envio === "1" ? true : false);
  //         setPickIsEnabled(usuario[0].recojo === "1" ? true : false);
  //         setDeliveryTime(
  //           !usuario[0].tiempoEntrega ? 0 : usuario[0].tiempoEntrega
  //         );

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  const styleItem2 = {
    ...styles.profileItem2,
    borderBottomColor: colors.border,
  };

  const numeros = Array(45).fill(1);

  // const numerosLabel = numeros.map((item, index) => {
  //   return {
  //     label: (index + 1).toString(),
  //     value: index + 1,
  //     key: (index + 1).toString(),
  //   };
  // });

  const numerosLabel = [
    {
      label: (1).toString(),
      value: 1,
    },
    {
      label: (2).toString(),
      value: 2,
    },
    {
      label: (3).toString(),
      value: 3,
    },
    {
      label: (4).toString(),
      value: 4,
    },
    {
      label: (5).toString(),
      value: 5,
    },
    {
      label: (6).toString(),
      value: 6,
    },
    {
      label: (7).toString(),
      value: 7,
    },
    {
      label: (8).toString(),
      value: 8,
    },
    {
      label: (9).toString(),
      value: 9,
    },
    {
      label: (10).toString(),
      value: 10,
    },
    {
      label: (11).toString(),
      value: 11,
    },
    {
      label: (12).toString(),
      value: 12,
    },
    {
      label: (13).toString(),
      value: 13,
    },
    {
      label: (14).toString(),
      value: 14,
    },
    {
      label: (15).toString(),
      value: 15,
    },
    {
      label: (16).toString(),
      value: 16,
    },
    {
      label: (17).toString(),
      value: 17,
    },
  ];

  const handleBackButton = (e) => {
    if (!hasUnsavedChanges) {
      return;
    }
    e.preventDefault();
    Alert.alert(
      "Aviso",
      "Usted tiene cambios no guardados. ¿Estás seguro de descartarlos y salir de la pantalla?",
      [
        { text: "No salir", style: "cancel", onPress: () => {} },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      handleBackButton(e);
    });
  }, [hasUnsavedChanges]);

  useEffect(() => {
    // getOptions();
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const desactivateOption = (body) => {
    patchAsync(
      "/usuarios",
      {
        onSuccess: (response) => {},
        onError: (error) => {},
        data: body,
      },
      null
    );
  };

  const toggleCostShipping = () => {
    setCostShipping((previousState) => !previousState);
    setHasUnsavedChanges(true);
  };
  const toggleReturnCost = () => {
    setReturnCost((previousState) => !previousState);
    setHasUnsavedChanges(true);
  };

  const toggleShippingSwitch = () => {
    setShippingIsEnabled((previousState) => !previousState);
    setHasUnsavedChanges(true);
  };

  const togglePickSwitch = () => {
    setPickIsEnabled((previousState) => !previousState);
    setHasUnsavedChanges(true);
  };

  const onSave = () => {
    let bool = shippingIsEnabled || pickIsEnabled;
    if (!tiempoEntrega || !bool) {
      Alert.alert(
        "Advertencia",
        "Estas seguro de aplicar los cambios? \n Esto desactivará tu catalogo",
        [
          { text: "Cancelar", style: "destructive" },
          {
            text: "Confirmar",
            style: "default",
            onPress: () => {
              setSpinner(true);
              desactivateOption({
                id: id,
                envio: shippingIsEnabled ? "1" : "0",
                recojo: pickIsEnabled ? "1" : "0",
                tiempoEntrega: deliveryTime,
                costoEnvio: costShipping ? "1" : "0",
                costoDevolucion: returnCost ? "1" : "0",
                estadoCatalogo: "0",
              });
              navigation.removeListener("beforeRemove", (e) => {
                handleBackButton(e);
              });
              setHasUnsavedChanges(false);
              setTimeout(() => {
                setSpinner(false);
              }, 2000);
            },
          },
        ]
      );
    } else {
      setSpinner(true);
      desactivateOption({
        id: id,
        envio: shippingIsEnabled ? "1" : "0",
        recojo: pickIsEnabled ? "1" : "0",
        tiempoEntrega: deliveryTime,
      });
      navigation.removeListener("beforeRemove", (e) => {
        handleBackButton(e);
      });
      setHasUnsavedChanges(false);
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
    }
  };

  const saveButton = () => {
    return (
      <TouchableOpacity style={styles.profileItem2} onPress={onSave}>
        <Text style={{ fontSize: 16, color: "#3279D7" }}>Guardar</Text>
      </TouchableOpacity>
    );
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));
    let y = 0;
    let height = 20;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          {holders.map((item, index) => {
            y = index == 0 ? 0 : y + height + 50;
            return (
              <Fragment key={index}>
                <Rect x="10" y={y} rx="8" ry="8" width="30" height={30} />
                <Rect x="50" y={y + 5} rx="8" ry="8" width="50%" height={30} />
                <Rect x="85%" y={y} rx="8" ry="8" width="40" height={40} />
                <Rect x="0" y={y + 50} rx="0" ry="0" width="100%" height={1} />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={styleItem}>
          <Text style={{ fontSize: 16 }}>Incluye costo de envío</Text>
          <Switch value={costShipping} onValueChange={toggleCostShipping} />
        </View>
        <View style={styleItem}>
          <Text style={{ fontSize: 16 }}>Incluye costo de devolución</Text>
          <Switch value={returnCost} onValueChange={toggleReturnCost} />
        </View>
        <View style={styleItem}>
          <Text style={{ fontSize: 16 }}>Envío (delivery)</Text>
          <Switch
            value={shippingIsEnabled}
            onValueChange={toggleShippingSwitch}
          />
        </View>
        <View style={styleItem}>
          <Text style={{ fontSize: 16 }}>Recojo (en tienda)</Text>
          <Switch value={pickIsEnabled} onValueChange={togglePickSwitch} />
        </View>
        <View style={styleItem}>
          <Text>Tiempo envío o recojo: </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RNPickerSelect
              // pickerProps={{
              //   style: {
              //     // height: 200,
              //     overflow: "hidden",
              //     height: "99%",
              //     backgroundColor: "red",
              //   },
              // }}
              value={deliveryTime}
              placeholder={{ label: "Días", value: "" }}
              items={numerosLabel}
              doneText="Cerrar"
              // pickerProps={{ style: { height: 200, overflow: "hidden" } }}
              onValueChange={(value) => {
                setDeliveryTime(value);
              }}
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
                setArrow(true);
                // setVisibleSave(true);
                setHasUnsavedChanges(true);
              }}
              onClose={() => {
                setArrow(false);
              }}
              style={{
                inputIOS: {
                  paddingVertical: 8,
                  // paddingBottom: 8,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  width: 80,
                  alignSelf: "center",
                  backgroundColor: "#fff",
                },
                inputAndroid: {
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  width: 80,
                  alignSelf: "center",
                  color: "#1B1B1B",
                  backgroundColor: "#fff",
                },
                placeholder: {
                  color: "#C9C9C9",
                  backgroundColor: "#fff",
                },
                iconContainer: {
                  top: 10,
                  right: 15,
                },
              }}
            />
            <TextInput />
            <Text>días</Text>
          </View>
        </View>
        {hasUnsavedChanges ? saveButton() : null}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <View style={{ flex: 1 }}>
        <Header
          title={"Datos de envío y recojo"}
          onPressLeft={() => navigation.goBack()}
          renderLeft={true}
        />
        <Spinner visible={spinner} />
        {loading ? renderPlaceholder() : renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default DataShippingPick;
