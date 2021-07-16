import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { block } from "react-native-reanimated";

const CategoryBoxColor4 = (props) => {
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
        <View style={{ width: "90%" }}>
          <Text whiteColor title2 style={styles.title}>
            {"Noticias qury"}
          </Text>
          <Text whiteColor title3 style={{ marginLeft: 5, marginBottom: 20 }}>
            {"Agregamos nuevos medios de pagos - ver más"}
          </Text>
          <Text whiteColor title3 style={{ marginLeft: 5 }}>
            Todas las transacciones son gratis por lanzamiento, aprovecha y
            compra seguro
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor4.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  numProceso: PropTypes.string,
  numCompletadas: PropTypes.string,
};

CategoryBoxColor4.defaultProps = {
  onPress: () => {},
  style: {},
  title: "Compras",
  icon: "book",
  color: "#FF8A65",
  numProceso: "0",
  numCompletadas: "0",
};

export default CategoryBoxColor4;
