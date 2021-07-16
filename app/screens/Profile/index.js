import { AuthActions } from "@actions";
import { Button, Icon, ProfileDetail, SafeAreaView, Text } from "@components";
import { BaseStyle, useTheme, Images } from "@config";
import { UserData } from "@data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector, useStore } from "react-redux";
import styles from "./styles";
const { authentication } = AuthActions;
import { Auth } from "aws-amplify";

const Profile = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserData[0]);
  const { id, nombres, apellidos, quryId, nombreEmpresa } = useSelector(
    (state) => state.auth.login.success.profile
  );
  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  // const onLogOut = () => {
  //   setLoading(true);
  //   dispatch(
  //     authentication(false, (response) => {
  //       setLoading(false);
  //     })
  //   );
  //   navigation.navigate("SplashScreen");
  // };

  async function signOut() {
    setLoading(true);
    try {
      await Auth.signOut();
      dispatch(
        authentication(
          {
            success: false,
            profile: {
              apellidos: "",
              arn: "",
              arnEstandar: null,
              arnGeneral: null,
              arnNoticias: null,
              arnPremium: null,
              disclaimer: "",
              envio: -1,
              esEmpresa: null,
              estado: -1,
              estadoCatalogo: -1,
              fechaCreacion: "",
              fechaNacimiento: "",
              fechaUltimaModificacion: "",
              hash: "",
              id: -1,
              nombreEmpresa: null,
              nombres: "",
              numeroDocumento: "",
              numeroMovil: "",
              quryId: "",
              recojo: -1,
              tiempoEntrega: -1,
              tipoDocumento: "",
              userLogin: "",
              visitas: -1,
            },
          },
          (response) => {
            setLoading(false);
          }
        )
      );
      navigation.reset({
        index: 0,
        actions: navigation.navigate("SplashScreen"),
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  const styleItem2 = {
    ...styles.profileItem2,
    borderBottomColor: colors.border,
    borderTopColor: colors.border,
  };

  const names = () => {
    if (nombreEmpresa) {
      return nombreEmpresa;
    }
    return nombres + " " + apellidos;
  };

  const iniciales = () => {
    if (nombreEmpresa) {
      let arr = nombreEmpresa.split("");
      const whiteSpace = (element) => {
        return element === " ";
      };
      let i = arr.findIndex(whiteSpace);
      if (i != -1) {
        return nombreEmpresa[0] + nombreEmpresa[i + 1];
      }
      return nombreEmpresa[0] + nombreEmpresa[1];
    }
    // return userData.name && userData.surname
    //   ? userData.name.charAt(0) + userData.surname.charAt(0)
    //   : "";
    return nombres.charAt(0) + apellidos.charAt(0);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <View style={[BaseStyle.container, { flex: 1 }]}>
        <View style={{ marginBottom: 20, width: "100%" }}>
          <Text bold headerTitle>
            {"Mi qury"}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <ProfileDetail
              inicial={iniciales()}
              textFirst={names()}
              point={userData.point}
              textSecond={"Ver mi perfil"}
              onPress={() => {
                navigation.navigate("EUserProfile", { id: id });
              }}
            />
            <View style={{ width: "100%", marginTop: 24 }}>
              <TouchableOpacity
                style={styleItem2}
                onPress={() => {
                  navigation.navigate("ENotification");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={"bell"}
                    size={17}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Notificaciones")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("ProfileEdit");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    size={16}
                    name={"address-card"}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Editar perfil")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("ShippingPick");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={"map-marker-alt"}
                    size={17}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Mis direcciones")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("Payment");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <Image
                    source={Images.card}
                    style={{
                      width: 16,
                      height: 18,
                      marginLeft: 6,
                      marginRight: 14,
                    }}
                  /> */}
                  <Icon
                    name={"credit-card"}
                    size={17}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Métodos de pago")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>

              {quryId ? (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("ProfileSeller");
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Image
                      source={Images.notification}
                      style={{
                        width: 16,
                        height: 18,
                        marginLeft: 6,
                        marginRight: 14,
                      }}
                    /> */}
                    <Icon
                      name={"book"}
                      size={17}
                      style={{ marginLeft: 6, marginRight: 14 }}
                      color={colors.orangeColor}
                    />
                    <Text body1>{"Políticas de venta"}</Text>
                  </View>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.orangeColor}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <Image
                    source={Images.configuracion}
                    style={{
                      width: 16,
                      height: 18,
                      marginLeft: 6,
                      marginRight: 14,
                    }}
                  /> */}
                  <Icon
                    name={"cog"}
                    size={17}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Configuración")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("TermsAndConditions");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={"users"}
                    size={17}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Términos y condiciones qury")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={"users"}
                    size={17}
                    style={{ marginLeft: 6, marginRight: 14 }}
                    color={colors.orangeColor}
                  />
                  <Text body1>{t("Acerca de qury")}</Text>
                </View>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.orangeColor}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ paddingVertical: 20 }}>
        <Button
          loading={loading}
          onPress={() => signOut()}
          style={{ alignSelf: "center" }}
        >
          {t("sign_out")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
