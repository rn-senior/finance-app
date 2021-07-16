import Icon from "@components/Icon";
import Image from "@components/Image";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { color } from "react-native-reanimated";
import styles from "./styles";

export default function ProfileDetail(props) {
  const { colors } = useTheme();
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    textFirst,
    point,
    textSecond,
    textThird,
    icon,
    inicial,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      // onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.contentLeft, styleLeft]}>
        <View
          style={{
            width: 55,
            height: 55,
            backgroundColor: colors.primaryBlueColor,
            borderRadius: 27.5,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17.6 }}>{inicial}</Text>
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: "700" }}>
            {textFirst}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text
              style={{
                marginTop: 3,
                paddingRight: 10,
                color: colors.primaryBlueColor,
                textDecorationLine: "underline",
                fontSize: 16,
                fontWeight: "600",
              }}
              numberOfLines={1}
            >
              {textSecond}
            </Text>
          </TouchableOpacity>
          {/* <Text footnote grayColor numberOfLines={1}>
            {textThird}
          </Text> */}
        </View>
      </View>
      {/* {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.grayColor}
            enableRTL={true}
          />
        </View>
      )} */}
    </TouchableOpacity>
  );
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
  inicial: PropTypes.string,
};

ProfileDetail.defaultProps = {
  image: "",
  textFirst: "",
  textSecond: "",
  icon: true,
  point: "",
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
  inicial: "",
};
