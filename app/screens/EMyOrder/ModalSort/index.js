import {
  Button,
  ProductColorPicker,
  ProductList,
  ProductSize,
  FormCounterSelect,
  Text,
  Image,
  CatalogoList,
} from "@components";
import Icon from "@components/Icon";
import { useTheme, Images } from "@config";
import { EFilterColors, EFilterSizes } from "@data";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";

//import { Icon } from "react-native-vector-icons/Icon";

const ModalSort = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const {
    onApply,
    item,
    colorChoosedInit,
    sizeChoosedInit,
    onBackdropPress,
    ...attrs
  } = props;
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(colorChoosedInit);
  const [sizeChoosed, setSizeChoosed] = useState(sizeChoosedInit);
  const [total, setTotal] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(0);

  var test = 0;

  function showCheck(index) {
    const res = index == selectedFilter ? 12 : 1;
    return res;
  }
  function setTest(params) {
    test = params;
  }

  return (
    <Modal
      swipeDirection={["down"]}
      style={styles.bottomModal}
      {...attrs}
      onBackdropPress={onBackdropPress}
    >
      <View
        style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}
      >
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 30 }}
          onPress={() => {
            setSelectedFilter(1);
            onApply(1);
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 22, marginRight: 5 }}
              source={Images.refresh}
            />
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <Text
                numberOfLines={1}
                solid
                style={{ fontSize: 14, fontWeight: "400" }}
              >
                Recientes
              </Text>
            </View>
            <Icon
              solid
              name="check"
              size={showCheck(1)}
              solid
              color="#0191CB"
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#EEECEC",
          }}
        />

        <TouchableOpacity
          style={{ paddingVertical: 30 }}
          onPress={() => {
            setSelectedFilter(3);
            onApply(2);
          }}
          //onPress={() => setTest(7)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 22, marginRight: 5 }}
              source={Images.soles}
            />
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <Text
                numberOfLines={1}
                solid
                style={{ fontSize: 14, fontWeight: "400" }}
              >
                Importe
              </Text>
            </View>
            <Icon
              solid
              name="check"
              size={showCheck(2)}
              solid
              color="#0191CB"
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#EEECEC",
            marginBottom: 30,
          }}
        />
      </View>
    </Modal>
  );
};

ModalSort.defaultProps = {
  onApply: () => {},
};

ModalSort.propTypes = {
  onApply: PropTypes.func,
};

export default ModalSort;
