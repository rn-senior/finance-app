import Icon from "@components/Icon";
import Tag from "@components/Tag";
// import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";

const List5 = ({
  description,
  description2,
  description3,
  title,
  style,
  image,
  costPrice,
  salePrice,
  onPress,
  salePercent,
  isFavorite = false,
  onChangeCount,
  appearIcon,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageWishlist}
        imageStyle={{ borderRadius: 4 }}
      >
        {salePercent ? (
          <Tag small style={styles.salePercentList}>
            {salePercent}
          </Tag>
        ) : null}
      </ImageBackground>
      <View
        // style={{ paddingHorizontal: 10, flex: 1 }}
        style={{
          paddingHorizontal: 10,
          flexDirection: "column",
          width: "80%",
          marginLeft: "0.8%",
        }}
      >
        <Text numberOfLines={2} style={{ fontWeight: "400", fontSize: 14 }}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "400",
            fontSize: 12,
            color: "#9B9998",
            marginVertical: 4,
          }}
        >
          {description}
        </Text>
        {description2 ? (
          <Text
            numberOfLines={2}
            style={{ fontWeight: "400", fontSize: 12, marginBottom: 1 }}
          >
            {description2}
          </Text>
        ) : null}
        {description3 ? (
          <Text
            numberOfLines={2}
            style={{ fontWeight: "400", fontSize: 12, marginTop: 1 }}
          >
            {description3}
          </Text>
        ) : null}
        <Text style={{ fontWeight: "700", fontSize: 14, marginTop: 2 }}>{salePrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

List5.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
  onChangeCount: PropTypes.func,
  appearIcon: PropTypes.bool,
};

List5.defaultProps = {
  description: "",
  title: "",
  style: {},
  image: "",
  costPrice: "",
  salePrice: "",
  salePercent: "",
  onPress: () => { },
  isFavorite: false,
  onChangeCount: () => { },
  appearIcon: false,
};

export default List5;
