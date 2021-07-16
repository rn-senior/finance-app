import { Image, Icon, Text } from "@components";
import { useTheme, Images } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

const CardList2 = (props) => {
  const { colors } = useTheme();
  const { style, image, title, fecha, rate, onPress, onPressTag } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View
        style={{
          // height: "70%",
          height: 80,
          width: "90%",
          flexDirection: "column",
          paddingLeft: 15,
          paddingRight: 10,
          justifyContent: "space-around",
        }}
      >
        <Text
          numberOfLines={2}
          style={{ fontSize: 16, fontFamily: "ProximaNova" }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            name={"calendar-check"}
            size={14}
            solid
            color={colors.orangeColor}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 14,
              color: colors.fecha,
            }}
          >
            {fecha}
          </Text>
        </View>
        {/* <View style={styles.contentRate}>
          <Tag onPress={onPressTag} rateSmall style={{ marginRight: 5 }}>
            {rate}
          </Tag>
          <StarRating
            disabled={true}
            starSize={10}
            maxStars={5}
            rating={rate}
            selectedStar={onPressTag}
            fullStarColor={BaseColor.yellowColor}
          />
        </View> */}
      </View>
      <View style={{ width: "5%", height: "100%", justifyContent: "center" }}>
        <Icon name={"chevron-right"} color={"#0191CB"} />
      </View>
    </TouchableOpacity>
  );
};

CardList2.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  fecha: PropTypes.string,
  subtitle: PropTypes.string,
  rate: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

CardList2.defaultProps = {
  style: {},
  image: "",
  title: "",
  fecha: "",
  rate: 4.5,
  onPress: () => {},
  onPressTag: () => {},
};

export default CardList2;
