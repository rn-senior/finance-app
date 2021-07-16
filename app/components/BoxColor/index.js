import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { block } from "react-native-reanimated";

const CategoryBoxColor = (props) => {
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
        <View style={{ width: "50%" }}>
          <Text whiteColor title2 style={styles.title}>
            {title}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Text
              whiteColor
              style={{ fontSize: 50, fontFamily: "Helvetica Neue" }}
            >
              {numProceso}
            </Text>
            <Text
              // title4
              whiteColor
              style={{
                marginTop: 7,
                marginLeft: 8,
                fontSize: 17,
                fontFamily: "Helvetica Neue",
              }}
            >
              {"en \nproceso"}
            </Text>
          </View>
        </View>
        <View style={{ width: "50%" }}>
          <Text whiteColor title4 bold style={styles.subtitle}>
            {"Últimas 2 semanas"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text
              whiteColor
              style={{ fontSize: 50, fontFamily: "Helvetica Neue" }}
            >
              {numCompletadas}
            </Text>
            <Text
              // title4
              whiteColor
              style={{
                marginTop: 8,
                marginLeft: 8,
                fontSize: 18,
                fontFamily: "Helvetica Neue",
              }}
            >
              {"comple-\ntadas"}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text whiteColor title2 style={styles.title}>
            {title}
          </Text>
          <Text
            whiteColor
            bold
            title4
            style={{ marginHorizontal: 10, marginTop: 17 }}
          >
            Últimas 2 semanas
          </Text>
        </View> */}
        {/* <View style={styles.viewIcon}>
          <Icon name={icon} size={18} style={styles.icon} />
        </View> */}
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              bold
              whiteColor
              style={{ marginVertical: 6, marginLeft: 25, fontSize: 54 }}
            >
              {numProceso}
            </Text>
            <Text
              title3
              whiteColor
              bold
              style={{ marginTop: 12, marginLeft: 6 }}
            >
              {"en \nproceso"}
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
          >
            <Text header whiteColor style={{ marginVertical: 6, fontSize: 54 }}>
              {numCompletadas}
            </Text>
            <Text
              title3
              whiteColor
              // bold
              style={{
                marginTop: 12,
                marginRight: 12,
                marginLeft: 8,
              }}
            >
              {"comple-\ntadas"}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  numProceso: PropTypes.string,
  numCompletadas: PropTypes.string,
};

CategoryBoxColor.defaultProps = {
  onPress: () => {},
  style: {},
  title: "Compras",
  icon: "book",
  color: "#FF8A65",
  numProceso: "0",
  numCompletadas: "0",
};

export default CategoryBoxColor;
