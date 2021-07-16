import { Image, Text } from "@components";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { TouchableOpacity, View, Animated, Dimensions } from "react-native";
import styles from "./styles";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { patchAsync } from "../../../services/ConnectApi";
export default function ListThumbCircle(props) {
  const { colors } = useTheme();
  const {
    id,
    style,
    imageStyle,
    image,
    txtLeftTitle,
    txtContent,
    txtRight,
    onPress,
    viewed,
    onDelete,
  } = props;

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onDelete}>
        <View style={styles.swipeContent}>
          <Animated.Text
            style={{
              transform: [{ scale: scale }],
              color: "white",
              fontWeight: "600",
            }}
          >
            Eliminar
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      key={id.toString()}
      ref={(ref) => {}}
      renderRightActions={rightSwipe}
      rightThreshold={40}
    >
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View
          style={[
            styles.containerView,
            {
              backgroundColor: viewed ? "white" : "#0191CB",
            },
          ]}
        />
        <View style={[styles.contain]}>
          <Image source={image} style={[styles.thumb, imageStyle]} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.content}>
              <View style={styles.left}>
                <Text headline semibold numberOfLines={1}>
                  {txtLeftTitle}
                </Text>
              </View>
              <View style={styles.right}>
                <Text caption2 grayColor numberOfLines={1}>
                  {txtRight}
                </Text>
              </View>
            </View>
            <Text
              note
              numberOfLines={1}
              footnote
              grayColor
              style={{ paddingTop: 5 }}
            >
              {txtContent}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

ListThumbCircle.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.object,
  image: PropTypes.node.isRequired,
  txtLeftTitle: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  viewed: PropTypes.bool,
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  id: PropTypes.number,
};

ListThumbCircle.defaultProps = {
  style: {},
  imageStyle: {},
  image: "",
  txtLeftTitle: "",
  txtContent: "",
  viewed: false,
  txtRight: "",
  onPress: () => {},
  onDelete: () => {},
};
