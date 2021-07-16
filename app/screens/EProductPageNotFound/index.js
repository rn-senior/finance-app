import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Tag,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Products } from "@data/eConfirmed";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Platform, ScrollView, View } from "react-native";
import styles from "./styles";
import { parseHexTransparency } from "@utils";

export default function EProductPageNotFound({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);

  const [success] = useState({
    bankName: true,
  });

  /**
   *
   * Called when process checkout
   */
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <View style={[styles.headerView]}>
        <View
          style={[
            styles.viewCart,
            {
              backgroundColor: parseHexTransparency(colors.primary, 30),
            },
          ]}
        >
          <Icon
            name={"bullhorn"}
            style={{ fontSize: 32, color: colors.primary }}
          />
        </View>
        <Text header bold style={{ marginBottom: 20 }}>
          Opps...
        </Text>

        <Text headline bold style={{ marginBottom: 20 }}>
          Something went wrong
        </Text>
        <Text body1 grayColor style={{ textAlign: "center" }}>
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin
          eget tortor risus.
        </Text>

        <Tag
          onPress={goBack}
          primary
          style={{ paddingHorizontal: 34, marginTop: 30 }}
        >
          Go Back
        </Tag>
      </View>
    </SafeAreaView>
  );
}
