import { Icon, SafeAreaView, Tag, Text, Header } from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
// Load sample data
import React, { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import { getAsync } from "../../services/ConnectApi";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useIsFocused } from "@react-navigation/native";

const ProfileSeller = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.auth.login.success.profile);
  const [spinner, setSpinner] = useState(false);
  const [paymentEntry, setPaymentEntry] = useState([]);
  const [user, setUser] = useState(profile);

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  const styleItem2 = {
    ...styles.profileItem2,
    borderBottomColor: colors.border,
  };

  const renderMessage = () => {
    let bool = user.envio || user.recojo;
    if (paymentEntry && user.disclaimer && user.tiempoEntrega && bool) {
      return (
        <View style={{ paddingTop: 30, alignItems: "center" }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Datos completos
          </Text>
          <Text style={{ fontSize: 16 }}>Ya puedes activar tu catálogo</Text>
        </View>
      );
    }
    return (
      <View style={{ paddingTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Datos incompletos
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          Para poder activar tu catálogo necesitas:
        </Text>
        {!paymentEntry ? <Text>Agregar un método de cobro</Text> : null}
        {!user.disclaimer ? <Text>Agregar tus políticas de venta</Text> : null}
        {!bool || !user.tiempoEntrega ? (
          <Text>Llenar tus datos de envío y recojo</Text>
        ) : null}
      </View>
    );
  };

  const getOptions = () => {
    getAsync(
      "/usuarios/" + profile.id,
      {
        onSuccess: (response) => {
          setUser(response[0]);
        },
        onError: (error) => {},
      },
      null
    );
  };

  const listPaymentEntry = () => {
    getAsync(
      "/paymententry?usuario_id=" + profile.id,
      {
        onSuccess: (response) => {
          setPaymentEntry(response);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    if (isFocused) {
      getOptions();
      listPaymentEntry();
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocused]);

  const renderPlaceholder = () => {
    let holders = Array.from(Array(4));
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
          <Rect x="20%" y={290} rx="6" ry="6" width="60%" height={18} />
          <Rect x="10%" y={325} rx="6" ry="6" width="80%" height={18} />
          <Rect x="10%" y={360} rx="6" ry="6" width="80%" height={18} />
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ width: "100%", marginTop: 20 }}>
          <TouchableOpacity
            style={styleItem}
            onPress={() => {
              navigation.navigate("ECharge", { paymentEntry: paymentEntry });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={Images.configuracion} style={styles.icon} />
              <Text
                body1
                style={{ color: paymentEntry[0] ? "#2AB361" : "#C62105" }}
              >
                {t("Método de cobro")}
              </Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={"#CDCACA"}
              enableRTL={true}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styleItem}
            onPress={() => {
              navigation.navigate("ShippingPick", { type: "recojo" });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={Images.notification} style={styles.icon} />
              <Text body1>{t("Direcciones de recojo")}</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={"#CDCACA"}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styleItem}
            onPress={() => {
              navigation.navigate("Politics", { user, user });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={Images.notification} style={styles.icon} />
              <Text
                body1
                style={{ color: user.disclaimer ? "#2AB361" : "#C62105" }}
              >
                {t("Políticas y responsabilidades")}
              </Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={"#CDCACA"}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styleItem}
            onPress={() => {
              navigation.navigate("DataShippingPick", { user: user });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={Images.notification} style={styles.icon} />
              <Text
                body1
                style={{
                  color:
                    (user.envio || user.recojo) && user.tiempoEntrega
                      ? "#2AB361"
                      : "#C62105",
                }}
              >
                {t("Datos de envío y recojo")}
              </Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={"#CDCACA"}
              enableRTL={true}
            />
          </TouchableOpacity>
          {renderMessage()}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <View style={{ flex: 1 }}>
        <Header
          title={"Politicas de venta"}
          onPressLeft={() => navigation.goBack()}
          renderLeft={true}
        />
        {loading ? renderPlaceholder() : renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default ProfileSeller;
