import Image from "@components/Image";
import Text from "@components/Text";
import { Images } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

const CategoryBlock = (props) => {
  const { style, image, title, subtitle, onPress } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Image
        source={image}
        style={{
          flex: 1,
          borderRadius: 8,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
        }}
      />
      <View style={styles.contentIcon}>
        <View style={{ paddingLeft: 10 }}>
          <Text headline bold whiteColor>
            {title}
          </Text>
          <Text body2 bold whiteColor>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBlock.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

CategoryBlock.defaultProps = {
  style: {},
  image: Images.location1,
  title: "",
  subtitle: "",
  onPress: () => {},
};

export default CategoryBlock;
