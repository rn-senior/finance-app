import Icon from "@components/Icon";
import Tag from "@components/Tag";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";

const Address = ({ title, address, style, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={{ paddingHorizontal: 1, flex: 1, }}>
        <Text bold style={{ marginVertical: 5, fontSize: 16 }}>
          {title}
        </Text>
        {/* <View style={styles.viewText}>
          <Text numberOfLines={2} style={{ fontSize: 16, color: "#4C3F40" }}>
            {description}
          </Text>
        </View> */}
        <View style={{ flex: 1, padding: 4 }}>


          <Text style={{ marginVertical: 2, width: 260 }} numberOfLines={2}>
            {address.direccion}
          </Text>
          <Text style={{ marginVertical: 2 }}>{address.distrito}</Text>
          <Text style={{ marginVertical: 2 }}>
            {address.provincia}, {address.departamento}
          </Text>

          <Text style={{ marginVertical: 2, width: 260 }} numberOfLines={2}>
            {address.referencia}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Address.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
};

Address.defaultProps = {
  description: "",
  title: "",
  onPress: () => { },
  onChange: () => { },
};

export default Address;
