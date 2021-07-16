import { Icon, Text, Image } from "@components";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";

const List6 = ({
  description,
  order,
  style,
  color,
  status,
  date,
  costPrice,
  salePrice,
  onPress,
  salePercent,
  secondUser,
  timeLeft,
  isFavorite = false,
}) => {
  const { colors } = useTheme();
  return (
    /* <View> */
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          numberOfLines={1}
          //  style={{ fontSize: 14 }}
          style={{
            fontWeight: "800",
            fontSize: 18,
            marginTop: 2,
            textDecorationLine: "underline",
          }}
        >
          {order}
        </Text>
        <View style={{ flex: 1, alignItems: "flex-end", marginTop: 5 }}>
          <Text numberOfLines={1}>{secondUser}</Text>
        </View>
      </View>

      <View style={styles.viewText1}>
        <Text
          numberOfLines={1}
          style={{ fontWeight: "400", fontSize: 14, marginVertical: 10 }}
        >
          {description}
        </Text>
        {timeLeft ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Image
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
              }}
              source={Images.hourglass}
            />
            <Text
              numberOfLines={1}
              bold
              style={{ fontWeight: "600", fontSize: 14 }}
            >
              {"(" + timeLeft + ")"}
            </Text>
          </View>
        ) : null}
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#EEECEC",
          marginVertical: 8,
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.contentLeft]}>
          <View style={styles.contain2}>
            <Icon solid name="circle" size={8} solid color={color} />
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <Text
                numberOfLines={1}
                solid
                style={{ color: color, fontSize: 16, fontWeight: "700" }}
              >
                {status}
              </Text>
            </View>
          </View>
          <Text footnote numberOfLines={1}>
            {date}
          </Text>
        </View>

        <View style={[styles.contentRight]}>
          <View style={styles.viewText}>
            <Text title3 numberOfLines={1}>
              {salePrice}
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.viewText}>
          <Tag
            outline={true}
            key={1}
            style={{
              marginTop: 8,
              marginRight: 8,
              height: 28,
            }}
            onPress={() => {}}
          >
            Zapatillas
          </Tag>
          <Tag
            small={true}
            key={1}
            style={{
              marginTop: 8,
              marginRight: 8,
              height: 28,
            }}
            onPress={() => {}}
          >
            Calzado
          </Tag>
        </View> */}
    </TouchableOpacity>
    /* <View
      style={{
        height: 10,
        width: "100%",
        backgroundColor: "#F6F5F5",

      }} />
  </View> */
  );
};

List6.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  date: PropTypes.string,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
  onChange: PropTypes.func,
};

List6.defaultProps = {
  description: "",
  title: "",
  date: "",
  style: {},
  image: Images.eProduct,
  costPrice: "",
  salePrice: "",
  salePercent: "",
  onPress: () => {},
  isFavorite: false,
  onChange: () => {},
};

export default List6;
