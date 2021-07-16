import Text from "@components/Text";
import Button from "@components/Button";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

const CardBooking = ({
  style,
  description,
  price,
  secondDescription,
  textButton,
  count,
  onPress,
  bloquear,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { borderTopColor: colors.border }, style]}>
      <View style={{ flex: 1, marginLeft: 8 }}>
        {/* <Text caption1 grayColor>
          {description}
        </Text> */}
        <Text
          title4
          style={{ marginVertical: 4, fontSize: 14, color: "#1B1B1B" }}
        >
          <Text
            bold
            style={{
              color: colors.primaryBlueColor,
              marginRight: 3,
              fontSize: 14,
            }}
          >
            {count}
          </Text>
          {"   Productos elegidos"}
        </Text>
        <Text caption1 style={{ color: "#595757", marginTop: 2 }}>
          {secondDescription}
        </Text>
        <Text title3 semibold style={{ marginBottom: 4, marginTop: 2 }}>
          {"S/ " + price}
        </Text>
      </View>
      {/* <View style={{ flex: 1 }}>
        <Text title4 style={{ marginVertical: 4, marginHorizontal: 4 }}>
          {count} Productos agregados
        </Text>
      </View> */}
      <Button
        style={{
          height: 48,
          width: 120.9,
          backgroundColor: bloquear ? "#EEECEC" : colors.primaryYellow,
        }}
        styleText={{ color: bloquear ? "#CDCACA" : "white" }}
        onPress={onPress}
        disabled={bloquear}
      >
        {textButton}
      </Button>
    </View>
  );
};

CardBooking.propTypes = {
  description: PropTypes.string,
  secondDescription: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  bloquear: PropTypes.bool,
};

CardBooking.defaultProps = {
  description: "",
  secondDescription: "",
  price: "",
  style: {},
  count: 0,
  onPress: () => {},
  bloquear: false,
};

export default CardBooking;
