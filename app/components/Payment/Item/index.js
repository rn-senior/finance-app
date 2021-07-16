import Icon from "@components/Icon";
import Text from "@components/Text";
import { useTheme } from "@config";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableHighlight, View } from "react-native";
import styles from "./styles";

export default function PaymentItem({
  id = "**** **** **** 1989",
  expiryDate = "02/2020",
  iconName = "credit-card",
  isPrimary = false,
  onPress = () => {},
  style = {},
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      // activeOpacity={0.6}
      underlayColor={colors.card}
      onPress={onPress}
    >
      <View style={[styles.container, style]}>
        <Icon
          name={iconName}
          size={40}
          solid={true}
          style={{ marginRight: 12, width: 48 }}
        />
        <View style={{ flex: 1 }}>
          <Text headline semibold>
            {id}
          </Text>
          <Text footnote light style={{ marginTop: 4 }}>
            {t("expiries")} {expiryDate}
          </Text>
        </View>
        {isPrimary && (
          <Text footnote darkPrimaryColor>
            {t("primary")}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
}
