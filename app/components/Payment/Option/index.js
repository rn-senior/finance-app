import Icon from "@components/Icon";
import Text from "@components/Text";
import { useTheme } from "@config";
import React from "react";
import { TouchableHighlight, View } from "react-native";
import styles from "./styles";

export default function PaymentOption({
  title = "Title",
  iconName = "credit-card",
  checked = true,
  onPress = () => {},
  style = {},
}) {
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      // activeOpacity={0.6}
      underlayColor={colors.card}
      onPress={onPress}
    >
      <View style={[styles.container, style]}>
        {/* <Icon
          name={checked ? "dot-circle" : "circle"}
          size={16}
          solid={checked}
          style={{ padding: 8 }}
          color={colors.primary}
        />

        <View style={{ width: 42, alignItems: "center" }}>
          <Icon name={iconName} size={24} solid style={{ padding: 8 }} />
        </View>
        <Text body1>{title}</Text> */}
        <Text>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}
