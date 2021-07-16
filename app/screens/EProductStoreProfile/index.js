import { Header, Icon, Image, SafeAreaView, Text, Button } from "@components";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import * as Utils from "@utils";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { useSelector, useStore } from "react-redux";
import { getAsync } from "../../services/ConnectApi";
import ContentLoader, { Rect } from "react-content-loader/native";

const EProductStoreProfile = (props) => {
  const { navigation, route } = props;
  const profile = useSelector((state) => state.auth.login.success.profile);
  const user = route.params?.user;
  const searchId = user ? user.id : profile.id;
  const [perfil, setPerfil] = useState(profile);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUsuario = () => {
    getAsync(
      "/usuarios/" + searchId,
      {
        onSuccess: (response) => {
          setPerfil(response[0]);
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

  const names = () => {
    if (perfil.nombreEmpresa) {
      return perfil.nombreEmpresa;
    }
    return perfil.nombres + " " + perfil.apellidos;
  };

  const iniciales = () => {
    if (perfil.nombreEmpresa) {
      let arr = perfil.nombreEmpresa.split("");
      const whiteSpace = (element) => {
        return element === " ";
      };
      let i = arr.findIndex(whiteSpace);
      if (i != -1) {
        return perfil.nombreEmpresa[0] + perfil.nombreEmpresa[i + 1];
      }
      return perfil.nombreEmpresa[0] + perfil.nombreEmpresa[1];
    }
    return perfil.nombres.charAt(0) + perfil.apellidos.charAt(0);
  };

  const tiempoDelivery = () => {
    let tiempo = perfil.tiempoEntrega
      ? ` ${perfil.tiempoEntrega} días`
      : " No tiene tiempo definido";
    return tiempo;
  };

  const inclyeCostoEnvio = () => {
    let costoEnvio = perfil.costoEnvio;
    if (costoEnvio === "1") {
      return " Sí";
    }
    return " No";
  };

  const inclyeCostoDevolucion = () => {
    let costoEnvio = perfil.costoDevolucion;
    if (costoEnvio === "1") {
      return " Sí";
    }
    return " No";
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 60;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="10" y="0" rx="45" ry="45" width="90" height="90" />
          <Rect x="45%" y="35" rx="6" ry="6" width="50%" height="26" />

          <Rect x="10" y="120" rx="6" ry="6" width="100%" height="1" />

          <Rect x="10" y="140" rx="6" ry="6" width="40%" height="22" />
          <Rect x="10" y="180" rx="6" ry="6" width="80%" height="16" />
          <Rect x="10" y="210" rx="6" ry="6" width="80%" height="16" />
          <Rect x="10" y="240" rx="6" ry="6" width="80%" height="16" />
          <Rect x="10" y="270" rx="6" ry="6" width="80%" height="16" />

          <Rect x="10" y="310" rx="6" ry="6" width="100%" height="1" />

          <Rect x="10" y="330" rx="6" ry="6" width="40%" height="22" />
          <Rect x="10" y="370" rx="6" ry="6" width="80%" height="16" />
          <Rect x="10" y="400" rx="6" ry="6" width="80%" height="16" />
          <Rect x="10" y="430" rx="6" ry="6" width="80%" height="16" />

          {/* {holders.map((item, index) => {
            y = index == 0 ? height : y + height + 20;
            return (
              <Fragment key={index}>
                <Rect x="0" y={y} rx="8" ry="8" width="60" height={height} />
                <Rect x="70" y={y + 5} rx="8" ry="8" width="80%" height={10} />
                <Rect x="70" y={y + 25} rx="8" ry="8" width="40%" height={10} />
                <Rect x="70" y={y + 45} rx="8" ry="8" width="20%" height={10} />
              </Fragment>
            );
          })} */}
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.namesContainer}>
            <View
              style={[
                styles.inicialsContainer,
                {
                  backgroundColor: colors.primaryBlueColor,
                },
              ]}
            >
              <Text style={{ fontSize: 36, color: "#fff" }}>{iniciales()}</Text>
            </View>
            <View style={styles.name}>
              <Text
                style={{ fontSize: 22, fontWeight: "700", textAlign: "center" }}
              >
                {names()}
              </Text>
              {/* <Button
                  style={{
                    width: "70%",
                    height: 35,
                    backgroundColor: "#fff",
                    borderColor: colors.orangeColor,
                    borderWidth: 2,
                  }}
                  styleText={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: colors.orangeColor,
                    marginLeft: 8,
                  }}
                  icon={
                    <Icon name={"heart"} size={13} color={colors.orangeColor} />
                  }
                  children={"A favoritos"}
                /> */}
            </View>
          </View>
          {/* <View
              style={{
                height: 180,
                borderTopColor: "#EEECEC",
                borderTopWidth: 1,
                paddingVertical: 20,
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                Información
              </Text>
              <Text>
                Electrodomésticos Martin es la comercializadora oficial de LG.
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name={"map-marker"}
                  size={16}
                  color={"#229B6C"}
                  style={{ marginRight: 12 }}
                />
                <Text>Jirón de la Unión 355</Text>
              </View>
            </View> */}
          {/* <View
              style={{
                height: 170,
                borderTopColor: "#EEECEC",
                borderTopWidth: 1,
                paddingVertical: 20,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={Images.instagram}
                  style={{ width: 38, height: 38, marginRight: 10 }}
                />
                <Text style={{ fontWeight: "600" }}>Salomepros</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={Images.facebook}
                  style={{
                    width: 38,
                    height: 38,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontWeight: "600" }}>Salomepros</Text>
              </View>
            </View> */}
          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>Políticas Generales</Text>
            <Text style={{ marginBottom: 10 }}>
              Tiempo de expiración:
              <Text style={{ color: colors.orangeColor }}>{" 5 días"}</Text>
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Tiempo de reclamo:
              <Text style={{ color: colors.orangeColor }}>{" 1 día"}</Text>
            </Text>

            <Text style={{ marginBottom: 10 }}>
              Tiempo de envío (delivery):
              <Text style={{ color: colors.orangeColor }}>
                {tiempoDelivery()}
              </Text>
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Incluye costo de envío:
              <Text style={{ color: colors.orangeColor }}>
                {inclyeCostoEnvio()}
              </Text>
            </Text>
            <Text>
              Incluye costo de devolución:
              <Text style={{ color: colors.orangeColor }}>
                {inclyeCostoDevolucion()}
              </Text>
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>Políticas de Venta</Text>
            <Text>{perfil.disclaimer}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>Link adicional</Text>
            <Text style={{ color: colors.primaryBlueColor }}>
              {"politicasDeElonSuarez.com"}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always", bottom: "always" }}
    >
      <View style={{ flex: 1 }}>
        <Header
          title={"Políticas de Venta"}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        {loading ? renderPlaceholder() : renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default EProductStoreProfile;
