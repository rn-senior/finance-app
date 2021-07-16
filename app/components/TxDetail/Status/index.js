import Icon from "@components/Icon";
import Tag from "@components/Tag";
import Image from "@components/Image";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";

const Status = ({
  title,
  date,
  style,
  price,
  imagePhone,
  image,
  imageMessage,
  onPress,
  onPressMessage,
  onPressCall,
  styleLeft,
  styleRight,
  styleThumb,
  color,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.contentLeft, styleLeft]}>
        <View style={styles.contain2}>
          <Icon solid name="circle" size={8} solid color={color} />
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <Text
              numberOfLines={2}
              solid
              style={{ color: color, fontSize: 14, fontWeight: "700" }}
            >
              {title}
            </Text>
          </View>
        </View>
        <Text footnote numberOfLines={2}>
          {date}
        </Text>
      </View>

      <View style={[styles.contentRight, styleRight]}>
        <Text footnote numberOfLines={2}>
          {"Total"}
        </Text>

        <Text
          headline
          numberOfLines={1}
          style={{ marginTop: 4 }}
          paddingHorizontal={10}
        >
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Status.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
  onPressMessage: PropTypes.func,
  onPressCall: PropTypes.func,
  onChange: PropTypes.func,
};

Status.defaultProps = {
  description: "",
  title: "",
  onPress: () => { },
  onChange: () => { },
};

export default Status;
