import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import {
  Image as RNImage,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

const CardSlide = (props) => {
  let { date, title, image, style, onPress } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={onPress}
    >
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
      />

      <Text body2 semibold style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text overline medium grayColor style={styles.description}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};

CardSlide.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: RNImage.propTypes.source,
  date: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

CardSlide.defaultProps = {
  style: {},
  image: Images.news,
  date: "",
  title: "",
  onPress: () => {},
};

export default CardSlide;
