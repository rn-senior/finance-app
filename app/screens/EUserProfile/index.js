import { Header, Icon, Image, SafeAreaView, Text, Button } from "@components";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import * as Utils from "@utils";
import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, TouchableOpacity, Linking } from "react-native";
import styles from "./styles";
import { useSelector, useStore } from "react-redux";
import { getAsync } from "../../services/ConnectApi";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Alert } from "react-native";

const EUserProfile = (props) => {
  const { navigation, route } = props;
  const profile = useSelector((state) => state.auth.login.success.profile);
  const id = route.params?.id;
  const [perfil, setPerfil] = useState(profile);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUsuario = () => {
    getAsync(
      "/usuarios/" + id,
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

  const inicial = () => {
    let inicial = perfil.nombreEmpresa
      ? perfil.nombreEmpresa.charAt(0)
      : perfil.nombres.charAt(0) + perfil.apellidos.charAt(0);
    return inicial;
  };
  const getName = () => {
    let name = perfil.nombreEmpresa
      ? perfil.nombreEmpresa
      : perfil.nombres + " " + perfil.apellidos;
    return name;
  };

  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log("Error, no se pudo abrir la url");
          Alert.alert("Aviso", `No se pudo abrir la url: ${url}`);
        }
      } catch (error) {
        Alert.alert("Error", "Link o url inválida");
      }
    }, [url]);

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
        onPress={handlePress}
      >
        <Text
          semibold
          style={{
            marginLeft: 10,
          }}
        >
          {url}
        </Text>
      </TouchableOpacity>
    );
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
              <Text style={{ fontSize: 36, color: "#fff" }}>{inicial()}</Text>
            </View>
            <View style={styles.name}>
              <Text
                style={{ fontSize: 22, fontWeight: "700", textAlign: "center" }}
              >
                {getName()}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  textDecorationLine: "underline",
                  marginTop: 5,
                  fontSize: 15,
                }}
              >
                {"quryId: " + profile.quryId}
              </Text>
            </View>
          </View>
          {profile.descripcion ? (
            <View style={styles.infoContainer}>
              <Text style={styles.subtitle}>Descripción</Text>
              <Text>{profile.descripcion}</Text>
            </View>
          ) : null}
          <View style={styles.infoContainer}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Icon name={"envelope-open"} size={16} />
              <Text style={{ marginLeft: 10 }}>{profile.userLogin}</Text>
            </View>
            {profile.direccion ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Icon name={"map-marker-alt"} size={16} />
                <Text style={{ marginLeft: 10 }}>{profile.direccion}</Text>
              </View>
            ) : null}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name={"phone-alt"} size={16} />
              <Text style={{ marginLeft: 10 }}>{profile.numeroMovil}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            {perfil.website ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name={"globe"} size={35} />
                <OpenURLButton url={profile.website} />
              </View>
            ) : null}
            {perfil.instagram ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                {/* <Icon name={"shop"} size={16} /> */}
                <Image
                  source={Images.instagram}
                  style={{ width: 35, height: 35 }}
                />
                <OpenURLButton url={perfil.instagram} />
              </View>
            ) : null}
            {perfil.facebook ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Images.facebook}
                  style={{ width: 35, height: 35 }}
                />
                <OpenURLButton url={perfil.facebook} />
              </View>
            ) : null}
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

export default EUserProfile;
