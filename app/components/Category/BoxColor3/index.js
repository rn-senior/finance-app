import { Icon, Text } from "@components";
import { useTheme, Images } from "@config";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";

const CategoryBoxColor3 = (props) => {
  const {
    direccion,
    departamento,
    provincia,
    distrito,
    referencia,
    style,
    onPress,
    onEdit,
    checked,
    nombre,
    telefono,
    notEdit,
    select,
  } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            height: nombre ? 205 : 175,
            backgroundColor: colors.background,
            borderColor: checked ? colors.orangeColor : "gray",
            borderWidth: checked ? 1.5 : 1,
            flexDirection: "row",
            ...Platform.select({
              android: {
                elevation: 1,
              },
            }),
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          {select ? (
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Icon
                name={checked ? "dot-circle" : "circle"}
                size={16}
                solid={checked}
                style={{ padding: 8 }}
                color={colors.orangeColor}
              />
            </View>
          ) : null}
          <View
            style={{
              flex: 1,
              paddingVertical: 4,
              paddingHorizontal: select ? 4 : 8,
            }}
          >
            {nombre ? (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  {nombre}
                </Text>
              </View>
            ) : null}
            <Text style={{ marginVertical: 2, width: 260 }} numberOfLines={2}>
              {direccion}
            </Text>
            <Text style={{ marginVertical: 2 }}>{distrito}</Text>
            <Text style={{ marginVertical: 2 }}>
              {provincia}, {departamento}
            </Text>

            <Text style={{ marginVertical: 2, width: 260 }} numberOfLines={2}>
              {referencia}
            </Text>
            <Text style={{ marginTop: 6 }}>Teléfono: {telefono}</Text>
          </View>
          {notEdit ? null : (
            <View
              style={{
                width: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={onEdit}>
                <Text
                  style={{
                    color: colors.primaryBlueColor,
                    textDecorationLine: "underline",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Editar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor3.propTypes = {
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  direccion: PropTypes.string,
  departamento: PropTypes.string,
  provincia: PropTypes.string,
  distrito: PropTypes.string,
  referencia: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.number,
  typeDireccion: PropTypes.bool,
  checked: PropTypes.bool,
  select: PropTypes.bool,
  notEdit: PropTypes.bool,
};

CategoryBoxColor3.defaultProps = {
  onPress: () => {},
  onDelete: () => {},
  onEdit: () => {},
  style: {},
  direccion: "",
  departamento: "",
  provincia: "",
  distrito: "",
  referencia: "",
  icon: "",
  id: 0,
  typeDireccion: false,
  checked: false,
  select: false,
  notEdit: false,
};

export default CategoryBoxColor3;
