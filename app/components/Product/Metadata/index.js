import Text from "@components/Text";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
// const SIZES = [
//   {
//     id: "xl",
//     name: "XL",
//   },
//   {
//     id: "l",
//     name: "L",
//   },
//   {
//     id: "m",
//     name: "M",
//   },
//   {
//     id: "s",
//     name: "S",
//   },
// ];
const SIZES = ["XL", "L", "M", "S"];
const Metadata = ({ sizes, onPress, valueInit }) => {
  const { colors } = useTheme();
  const [sizeChoosed, setSizeChoosed] = useState(valueInit);
  const handlePress = (size) => {
    setSizeChoosed(size);
    onPress(size);
  };
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {sizes.map((size, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.item,
            {
              backgroundColor:
                size == sizeChoosed
                  ? colors.primaryBlueColor
                  : colors.lightBlue,
            },
          ]}
          onPress={() => handlePress(size)}
        >
          <Text title4 regular style={styles.text}>
            {size}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

Metadata.propTypes = {
  sizes: PropTypes.array,
  onPress: PropTypes.func,
  valueInit: PropTypes.string,
};

Metadata.defaultProps = {
  sizes: SIZES,
  onPress: () => {},
  valueInit: "",
};

export default Metadata;
