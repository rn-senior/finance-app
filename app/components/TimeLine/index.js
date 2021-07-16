import Text from "@components/Text";
import { useTheme, Images } from "@config";
import { parseHexTransparency } from "@utils";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";

const NUMBER_LINES = [...new Array(8)];

const dataInit = [
  {
    title: "Order Placed",
    description: "28 Apr 2020 09:00",
    isDone: true,
  },
  {
    title: "Order Accepted",
    description: "29 Apr 2020 09:00",
    isDone: false,
  },
  {
    title: "Order Shipping",
    description: "30 Apr 2020 09:00",
    isDone: false,
  },
  {
    title: "Completed",
    description: "1 May 2020 09:00",
    isDone: false,
  },
];
function TimeLine({ style, data, onPressAction }) {
  const { colors } = useTheme();


  return (
    <View style={style}>
      {data.map((item, index) => (
        <View key={index.toString()} style={{ flexDirection: "row" }}>
          <View
            style={{
              marginTop: 1,
              paddingRight: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.isDone
                  ? parseHexTransparency(item.color, 30)
                  : parseHexTransparency(colors.border, 30),
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                marginTop: 3,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: item.isDone
                    ? item.color
                    : colors.background,
                }}
              />
            </View>
            {index != data.length - 1 &&
              NUMBER_LINES.map((item, index) => (
                <View
                  key={index.toString()}
                  style={{
                    width: 0.5,
                    height: 4,
                    backgroundColor: colors.border,
                    marginBottom: 2,
                  }}
                />
              ))}
          </View>
          <View style={{ paddingRight: 20 }}>
            <Text caption1 style={{ color: item.color, fontWeight: "500", width: "100%" }}>{item.title}</Text>
            {item.nextStep ? <Text caption2 maxLines={2} grayColor style={{ marginRight: 15 }}>
              {item.nextStep}
            </Text> : null}
            {item.code ? <Text caption2 maxLines={2} grayColor style={{ marginRight: 15 }}>
              {item.code}
            </Text> : null}
            <Text caption2 grayColor>
              {item.description}
            </Text>

          </View>
          {item.title == "CONFLICTO" ? <TouchableOpacity style={{ paddingLeft: 100, flexDirection: "row" }} onPress={onPressAction}>
            {/* <Image style={{ height: 15, width: 15 }} source={Images.message} /> */}
            <Text bold style={{ color: "#ECBD51", paddingLeft: 5 }}>Ver reclamo</Text>
          </TouchableOpacity> : null}
        </View>
      ))}
    </View>
  );
}

TimeLine.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array,
};

TimeLine.defaultProps = {
  style: {},
  data: [],
};
export default TimeLine;
