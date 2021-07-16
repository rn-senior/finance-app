import Icon from "@components/Icon";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { color } from "react-native-reanimated";
import styles from "./styles";

export default function CounterSelectH(props) {
  const [value, setValue] = useState(props.value);
  const { style, onChange, onIncrement, onDecrement, cant, clear } = props;
  const { colors } = useTheme();

  const onHandleChange = (type) => {
    let valueNew = 0;
    if (type === "up") {
      valueNew = value + 1;
    } else {
      valueNew = value - 1 > 0 ? value - 1 : 0;
    }
    setValue(valueNew);
    onChange(valueNew, type);
  };

  useEffect(() => {
    setValue(0);
  }, [clear]);

  useEffect(() => {}, [value]);
  return (
    <View
      style={[
        styles.contentPicker,
        {
          backgroundColor: colors.background,
          flexDirection: "column",
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          onHandleChange("up");
          onIncrement();
        }}
      >
        <Icon name="plus-circle" size={24} color={colors.primaryBlueColor} />
      </TouchableOpacity>
      <Text
        style={{
          width: "auto",
          textAlign: "center",
          fontSize: 16,
          fontWeight: "600",
          marginVertical: 9,
        }}
      >
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => {
          onHandleChange("down");
          onDecrement();
        }}
      >
        <Icon name="minus-circle" size={24} color={colors.primaryBlueColor} />
      </TouchableOpacity>
    </View>
  );
}

CounterSelectH.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  detail: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  cant: PropTypes.number,
};

CounterSelectH.defaultProps = {
  style: {},
  label: "Adults",
  detail: ">= 12 years",
  cant: 0,
  value: 0,
  onChange: () => {},
  onIncrement: () => {},
  onDecrement: () => {},
};
