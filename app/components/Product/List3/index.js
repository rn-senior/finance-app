import { Icon, Tag, Image, Text } from "@components";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const List3 = ({
  description,
  description2,
  description3,
  title,
  style,
  image,
  salePrice,
  onPress,
  salePercent,
  onShare,
  onLongPress,
  onPressArrowUp,
  onPressArrowDown,
  firts,
  last,
  share,
}) => {
  const renderArrows = () => {
    return (
      <View
        style={[
          styles.contentPicker,
          {
            flexDirection: "column",
            justifyContent: firts || last ? "center" : "space-between",
          },
        ]}
      >
        {firts ? null : (
          <TouchableOpacity onPress={onPressArrowUp}>
            <Icon name="arrow-up" size={20} color={"#0191CB"} />
          </TouchableOpacity>
        )}
        {last ? null : (
          <TouchableOpacity onPress={onPressArrowDown}>
            <Icon name="arrow-down" size={20} color={"#0191CB"} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderShare = () => {
    return (
      <TouchableOpacity
        style={{
          height: 40,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onShare}
      >
        <Image source={Images.share} style={styles.icon} resizeMode="contain" />
        <Text style={{ fontSize: 9 }}>Compartir</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
      onLongPress={onLongPress}
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
        style={{
          paddingHorizontal: 10,
          flexDirection: "column",
          marginLeft: "0.8%",
          flex: 1,
          height: 120,
          paddingVertical: 2,
        }}
      >
        <Text numberOfLines={2} bold style={{ marginTop: 2 }}>
          {title}
        </Text>
        <View
          style={{
            flex: 1.5,
            justifyContent: description2 ? "space-around" : "center",
            marginVertical: 5,
          }}
        >
          <Text
            numberOfLines={1}
            caption1
            style={{
              color: "#595757",
              marginBottom: 2,
            }}
          >
            {description}
          </Text>
          {description2 ? (
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "400",
                fontSize: 12,
                marginBottom: 2,
              }}
            >
              {description2}
            </Text>
          ) : null}
          {description3 ? (
            <Text
              numberOfLines={1}
              style={{ fontWeight: "400", fontSize: 12, marginTop: 2 }}
            >
              {description3}
            </Text>
          ) : null}
        </View>
        <View style={styles.viewText2}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>{salePrice}</Text>
        </View>
      </View>
      <View>{share ? renderShare() : renderArrows()}</View>
    </TouchableOpacity>
  );
};

List3.propTypes = {
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
  description2: PropTypes.string,
  description3: PropTypes.string,
  descriptionStyle: PropTypes.string,
  cantidad: PropTypes.number,
  onShare: PropTypes.func,
  onLongPress: PropTypes.func,
  onPressArrowUp: PropTypes.func,
  onPressArrowDown: PropTypes.func,
  firts: PropTypes.bool,
  last: PropTypes.bool,
  share: PropTypes.bool,
  clear: PropTypes.bool,
};

List3.defaultProps = {
  description: "",
  title: "",
  style: {},
  image: Images.eProduct,
  costPrice: "",
  salePrice: "",
  salePercent: "",
  onPress: () => {},
  isFavorite: false,
  onChangeCount: () => {},
  appearIcon: false,
  description2: "",
  description3: "",
  descriptionStyle: "",
  onShare: () => {},
  onLongPress: () => {},
  onPressArrowUp: () => {},
  onPressArrowDown: () => {},
  firts: false,
  last: false,
  share: false,
  clear: false,
};

export default List3;
