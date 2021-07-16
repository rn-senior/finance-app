import { Text, Icon } from "@components";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";

const Shipper = ({
  title,
  description,
  style,
  imagePhone,
  inicial,
  imageMessage,
  onPress,
  onPressMessage,
  onPressCall,
  styleLeft,
  styleRight,
  styleThumb,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: colors.primaryBlueColor,
          borderRadius: 21,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 17.6 }}>{inicial}</Text>
      </View>
      {/* <ImageBackground
                source={image}
                style={styles.thumb}
                borderRadius={20}
            /> */}
      <View style={[styles.contentLeft, styleLeft]}>
        <Text headline numberOfLines={2}>
          {title}
        </Text>
      </View>

      {imageMessage ? (
        <TouchableOpacity
          onPress={onPressMessage}
          style={[styles.contentRight, styleRight]}
        >
          {/* <ImageBackground
            source={imageMessage}
            style={styles.imageBackground}
          /> */}
          <Icon name={imageMessage} size={20} color={colors.orangeColor} />
        </TouchableOpacity>
      ) : null}
      {imagePhone ? (
        <TouchableOpacity
          onPress={onPressCall}
          style={[styles.contentRight, styleRight]}
        >
          {/* <ImageBackground source={imagePhone} style={styles.imageBackground} /> */}
          <Icon name={imagePhone} size={20} color={colors.orangeColor} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

Shipper.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  onPressMessage: PropTypes.func,
  onPressCall: PropTypes.func,
  onChange: PropTypes.func,
};

Shipper.defaultProps = {
  description: "",
  title: "",
  onPress: () => {},
  onChange: () => {},
};

export default Shipper;
