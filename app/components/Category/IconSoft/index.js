import Icon from "@components/Icon";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { parseHexTransparency } from "@utils";

export default function CategoryIconSoft(props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { style, icon, title, onPress } = props;
  return (
    <TouchableOpacity
      style={[
        styles.contain,
        { backgroundColor: colors.backgroundColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View
        style={[
          styles.iconContent,
          { backgroundColor: parseHexTransparency(colors.primary, 30) },
        ]}
      >
        <Icon name={icon} size={32} color={colors.primary} solid />
      </View>
      <View style={{ marginTop: 8, maxWidth: 60 }}>
        <Text footnote numberOfLines={1} style={{ textAlign: "center" }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CategoryIconSoft.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

CategoryIconSoft.defaultProps = {
  style: {},
  icon: "",
  title: "",
  onPress: () => {},
};
