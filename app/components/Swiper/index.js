import SwiperItem from "./SwiperItem";
import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

import { Icon } from "@components";

import { BaseColor } from "@config";

const { width, height } = Dimensions.get("window");

const Swiper = ({ data }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <SwiperItem item={item} />;
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />
        <View
          // style={{
          //   flexDirection: "row",
          //   justifyContent: "center",
          //   position: "absolute",
          //   left: width / 2.4,
          //   top: height / 4.4,
          // }}
          style={styles.dotView}
        >
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#229b6c",
                  marginHorizontal: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={[
            styles.viewIcon,
            {
              backgroundColor: "white", //colors.primaryLight,
              borderColor: BaseColor.whiteColor,
            },
          ]}
          onPress={() => {
            // onDeleteImage(indexImageSelected);
          }}
        >
          <Icon solid name="trash" size={20} borderColor="green" />
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export default Swiper;
