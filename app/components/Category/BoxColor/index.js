import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { block } from "react-native-reanimated";
import { useTheme } from "@config";

const CategoryBoxColor = (props) => {
  const {
    title,
    icon,
    color,
    style,
    onPress,
    numProceso,
    numCompletadas,
    typeTarget,
    porcentaje,
    numPorcentaje,
    porCobrar,
  } = props;

  const { colors } = useTheme();

  const renderPrincipalTarget = () => {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: "5%" }}>
          {typeTarget == "second" ? "Ventas" : "Compras"}
        </Text>
        <View
          style={{
            backgroundColor: color,
            height: 157,
            width: "100%",
            flexDirection: "column",
          }}
          borderRadius={12}
        >
          <View style={{ height: 70 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#fff",
                marginTop: 15,
                marginLeft: 15,
              }}
            >
              En proceso
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#fff",
                marginTop: 6,
                marginLeft: 16,
              }}
            >
              {numProceso}
            </Text>
          </View>
          <View
            style={{
              height: 87,
              backgroundColor:
                typeTarget == "second" ? "#AF2D1E" : colors.secondBlueColor,
              height: "55%",
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#fff",
                marginTop: 15,
                marginLeft: 15,
              }}
            >
              Completados
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "600",
                color: "#fff",
                marginTop: 6,
                marginBottom: 10,
                marginLeft: 16,
              }}
            >
              {numCompletadas}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {renderPrincipalTarget()}
      {/* {typeTarget == "second" ? renderSecondTarget() : renderPrincipalTarget()} */}
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
  typeTarget: PropTypes.string,
  porcentaje: PropTypes.bool,
  numPorcentaje: PropTypes.string,
  porCobrar: PropTypes.string,
};

CategoryBoxColor.defaultProps = {
  onPress: () => {},
  style: {},
  title: "Compras",
  icon: "book",
  color: "#FF8A65",
  numProceso: "0",
  numCompletadas: "0",
  typeTarget: "principal",
  porcentaje: false,
  numPorcentaje: "0%",
  porCobrar: "0.00",
};

export default CategoryBoxColor;
