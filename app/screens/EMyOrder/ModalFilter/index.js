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
import { useTheme } from "@config";
import { EFilterColors, EFilterSizes } from "@data";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";

//import { Icon } from "react-native-vector-icons/Icon";

const ModalFilter = (props) => {
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
  const [selectedFilter, setSelectedFilter] = useState("");

  var test = 0;

  function showCheck(index) {
    const res = index == selectedFilter ? 12 : 1;
    return res;
  }
  function setTest(params) {
    test = params;
  }

  const statusQury = [
    {
      index: 1,
      status: "REC",
      fullName: "RECHAZADO",
      color: "#003C75",
    },
    {
      index: 2,
      status: "CRE",
      fullName: "POR ACEPTAR",
      color: "#09564F",
    },
    {
      index: 3,
      status: "ACE",
      fullName: "ACEPTADO",
      color: "#3279D7",
    },
    {
      index: 4,
      status: "VAL",
      fullName: "VALIDADO",
      color: "#38BBDF",
    },
    {
      index: 5,
      status: "ENV",
      fullName: "ENVIADO/LISTO PARA RECOGER",
      color: "#871C98",
    },
    {
      index: 6,
      status: "RCB",
      fullName: "ENTREGADO",
      color: "#2AB361",
    },
    {
      index: 7,
      status: "CNF",
      fullName: "CONFIRMADO",
      color: "#FF551E",
    },
    {
      index: 8,
      status: "CAN",
      fullName: "CANCELADO",
      color: "#C62105",
    },
    {
      index: 9,
      status: "CON",
      fullName: "CONFLICTO",
      color: "#FFAF00",
    },
    {
      index: 10,
      status: "FIQ",
      fullName: "FINALIZADO",
      color: "#000000",
    },
  ];

  return (
    <Modal
      swipeDirection={["down"]}
      style={styles.bottomModal}
      onBackdropPress={onBackdropPress}
      {...attrs}
    >
      <View
        style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}
      >
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        {statusQury.length > 0
          ? statusQury.map((item, index, key) => (
              <View
                style={{
                  width: "100%",
                }}
                key={item.index}
              >
                <TouchableOpacity
                  style={{ paddingVertical: 20 }}
                  onPress={() => {
                    setSelectedFilter(
                      selectedFilter != item.status ? item.status : ""
                    );
                    onApply(selectedFilter != item.status ? item.status : "");
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      solid
                      name="circle"
                      size={8}
                      solid
                      color={item.color}
                    />
                    <View style={{ paddingHorizontal: 10, flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        solid
                        style={{ fontSize: 14, fontWeight: "400" }}
                      >
                        {item.fullName}
                      </Text>
                    </View>
                    <Icon
                      solid
                      name="check"
                      size={selectedFilter == item.status ? 12 : 1}
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
              </View>
            ))
          : null}
      </View>
    </Modal>
  );
};

ModalFilter.defaultProps = {
  onApply: () => {},
};

ModalFilter.propTypes = {
  onApply: PropTypes.func,
};

export default ModalFilter;
