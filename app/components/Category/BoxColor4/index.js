import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, Image, Animated } from "react-native";
import { useTheme, Images } from "@config";
import styles from "./styles";
import { block } from "react-native-reanimated";
import { patchAsync } from "../../../services/ConnectApi";

const CategoryBoxColor4 = (props) => {
  const {
    id,
    title,
    icon,
    color,
    style,
    onPress,
    onEdit,
    onDelete,
    fecha,
    numTarjeta,
    codigo,
    titular,
    checked,
    nombre,
    numCuenta,
    entFinanciera,
    appear,
    deletePayEntry,
    image,
  } = props;
  const { colors } = useTheme();

  const renderFinanciera = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        <Text style={{ marginTop: 5, fontSize: 20 }}>{entFinanciera}</Text>
      </View>
    );
  };

  const renderCuenta = () => {
    return (
      <View>
        <Text style={{ color: "#595757", fontSize: 18 }}>{numCuenta}</Text>
      </View>
    );
  };

  const deletePaymethod = () => {
    patchAsync(
      "/payment",
      {
        onSuccess: (response) => {
          onDelete();
          //listAdress()
        },
        onError: (error) => {},
        data: { id: id, estado: "0" }, // id:Session.user.id,
      },
      null
    );
  };

  const deletePaymentEntry = () => {
    patchAsync(
      "/paymententry",
      {
        onSuccess: (response) => {
          onDelete();
          //listAdress()
        },
        onError: (error) => {},
        data: { id: id, estado: "0" }, // id:Session.user.id,
      },
      null
    );
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            height: 110,
            borderColor: checked ? colors.orangeColor : "gray",
            borderWidth: checked ? 1.5 : 1,
            flexDirection: "row",
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // , justifyContent: "space-between"
          }}
        >
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

          <View
            style={{
              flex: 1,
              paddingHorizontal: 4,
              marginLeft: 10,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {appear ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 1.8,
                    borderColor: "#EEECEC",
                    width: 55,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={
                      image === "v"
                        ? Images.tarjVisa2
                        : image === "m"
                        ? Images.tarjMastercard2
                        : Images.tarjAmerican3
                    }
                    style={{
                      width: image === "m" ? 45 : 55,
                      height: image === "m" ? 28 : 35,
                    }}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text style={{ fontSize: 20 }}>{numTarjeta}</Text>
                </View>
              </View>
            ) : (
              renderFinanciera()
            )}
            {/* {appear ? ( */}
            <View>
              <Text
                style={{ marginVertical: 5, fontSize: 20 }}
                numberOfLines={2}
              >
                {appear ? nombre : numCuenta}
              </Text>
            </View>
            {/* ) : (
              renderCuenta()
            )} */}
          </View>
          <View style={{ width: 50, justifyContent: "center" }}>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor4.propTypes = {
  onPress: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  numTarjeta: PropTypes.string,
  fecha: PropTypes.string,
  codigo: PropTypes.string,
  titular: PropTypes.string,
  checked: PropTypes.bool,
  nombre: PropTypes.string,
  numCuenta: PropTypes.string,
  entFinanciera: PropTypes.string,
  appear: PropTypes.bool,
  deletePayEntry: PropTypes.bool,
  image: PropTypes.string,
};

CategoryBoxColor4.defaultProps = {
  onPress: () => {},
  onEdit: () => {},
  onDelete: () => {},
  style: {},
  id: 0,
  title: "Compras",
  icon: "book",
  color: "#FF8A65",
  numTarjeta: "",
  fecha: "",
  codigo: "",
  titular: "",
  nombre: "",
  checked: false,
  numCuenta: "",
  entFinanciera: "",
  appear: false,
  deletePayEntry: false,
  image: "v",
};

export default CategoryBoxColor4;
