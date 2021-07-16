import Icon from "@components/Icon";
import Tag from "@components/Tag";
import Image from "@components/Image";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";

const Payment = ({
  index,
  paymethod,
  type,
  brand,
  bank,
  number,
  description,
  style,
  imagePhone,
  image,
  imageMessage,
  onPress,
  onPressMessage,
  onPressCall,
  styleLeft,
  styleRight,
  styleThumb,
}) => {
  const firstLetter = (text) => {
    return text.charAt(0);
  };

  const checkImage = () => {
    if (paymethod.tipo == "TC") {
      switch (firstLetter(paymethod.marca)) {
        case "A":
          return Images.tarjAmerican3;
        case "M":
          return Images.tarjMastercard2;
        default:
          return Images.tarjVisa2;
      }
      // if (firstLetter(paymethod.marca) === "A") {
      //     return Images.tarjAmerican3;
      // } else if (firstLetter(paymethod.marca) === "M") {
      //     return Images.tarjMastercard2;
      // }
      // return Images.tarjVisa2;
    }
    return Images.soles;
  };

  const { colors } = useTheme();

  const renderBuyer = () => {
    return (
      <TouchableOpacity style={[styles.contain, style]} activeOpacity={0.9}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Image
            source={checkImage()}
            style={{ width: 45, height: 28, marginEnd: 10 }}
          />

          <Text style={{ fontSize: 20 }}>
            {"*".repeat(4) +
              " " +
              paymethod.numero.slice(paymethod.numero.length - 4)}
          </Text>

          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 16, textAlign: "right", marginEnd: 5 }}
              numberOfLines={2}
            >
              {paymethod.nombre}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeller = () => {
    return (
      <TouchableOpacity style={[styles.contain, style]} activeOpacity={0.9}>
        <Image
          source={checkImage()}
          style={{ width: 45, height: 28, marginEnd: 5 }}
        />

        <View style={[styles.contentLeft, styleLeft]}>
          <Text headline numberOfLines={2}>
            {paymethod.tipo == "TC" ? paymethod.marca : paymethod.entidad}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      <Text bold style={{ marginVertical: 5, fontSize: 16 }}>
        {"Método de Pago"}
      </Text>
      {index == 2 ? renderBuyer() : renderSeller()}
    </View>
  );
};

Payment.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  onPressMessage: PropTypes.func,
  onPressCall: PropTypes.func,
  onChange: PropTypes.func,
};

Payment.defaultProps = {
  description: "",
  title: "",
  onPress: () => {},
  onChange: () => {},
};

export default Payment;
