import { Button, Header, Icon, SafeAreaView, Text } from "@components";
import { BaseStyle, useTheme } from "@config";
import { EPaymentItemsData } from "@data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, Platform, View } from "react-native";
import styles from "./styles";


const EBankDetail = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState(EPaymentItemsData);
  const [refreshing, setRefreshing] = useState(false);
  const [card, setCard] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [digit, setDigit] = useState("");
  const [name, setName] = useState(""); // home or office
  const [add, setAdd] = useState(false);

  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });

  const onAdd = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdd(!add);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("payment")}
        renderLeft={true}
        renderRight={() => (
          <Text body1 style={{ color: colors.primaryDark }}>
            {t("save")}
          </Text>
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
      />

      <View style={{ padding: 20 }}>
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Icon
              name={"credit-card"}
              size={40}
              solid={true}
              style={{ marginRight: 12, width: 48 }}
            />
            <Text style={{ marginTop: 12 }} headline>
              {"**** **** **** 1990"}
            </Text>
            <Text footnote light style={{ marginTop: 4 }}>
              {t("expiries")} {"03/2020"}
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <Text footnote darkPrimaryColor style={{ marginTop: 4 }}>
              {t("primary")}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Button
          outline
          loading={loading}
          full
          onPress={() => navigation.goBack()}
        >
          {t("delete")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EBankDetail;
