import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { block } from "react-native-reanimated";

const CategoryBoxColor3 = (props) => {
  const {
    title,
    icon,
    color,
    style,
    onPress,
    numProceso,
    numCompletadas,
  } = props;
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.imageBackground,
          {
            backgroundColor: color,
          },
        ]}
        borderRadius={8}
      >
        {/* <View style={styles.viewIcon}>
          <Icon name={icon} size={18} style={styles.icon} />
        </View>
        <Text whiteColor title1 style={styles.title}>
          {title}
        </Text>
        <Text whiteColor headline>
          {"Para vender agrega un producto a tu catálogo"}
        </Text> */}
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Text bold whiteColor style={{ fontSize: 50 }}>
            {numProceso}
          </Text>
          <Text
            // title4
            whiteColor
            bold
            style={{ marginTop: 7, marginLeft: 8, fontSize: 17 }}
          >
            {"en \nproceso"}
          </Text>
        </View> */}
        <Text whiteColor title2 bold style={styles.title}>
          {"Por cobrar"}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 4,
            marginBottom: 8,
          }}
        >
          <Text whiteColor style={{ fontSize: 58 }}>
            {"S/."}
          </Text>
          <Text
            // title4
            whiteColor
            style={{
              marginTop: 0,
              marginLeft: 8,
              fontSize: 58,
              fontFamily: "Helvetica Neue",
            }}
          >
            {numProceso}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor3.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  numProceso: PropTypes.string,
  numCompletadas: PropTypes.string,
};

CategoryBoxColor3.defaultProps = {
  onPress: () => {},
  style: {},
  title: "Compras",
  icon: "book",
  color: "#FF8A65",
  numProceso: "0",
  numCompletadas: "0",
};

export default CategoryBoxColor3;
