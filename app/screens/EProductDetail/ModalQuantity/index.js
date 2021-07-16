import {
  Button,
  ProductColorPicker,
  ProductList,
  ProductSize,
  FormCounterSelect,
  FormBigCounterSelect,
  Text,
  CatalogoList,
} from "@components";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";

const ModalQuantity = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const {
    onApply,
    onChangeQuantity,
    item,
    colorChoosedInit,
    sizeChoosedInit,
    quantity,
    onPressBack,
    ...attrs
  } = props;

  const [total, setTotal] = useState(0);
  const { image, title, category, salePrice, costPrice, price } = item;

  useEffect(() => {
    setTotal(quantity * price);
  });

  return (
    <Modal
      swipeDirection={["down"]}
      style={styles.bottomModal}
      {...attrs}
      onBackdropPress={onPressBack}
    >
      <View
        style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}
      >
        <View
          style={{
            flexDirection: "column",
            marginBottom: 8,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              title4
              style={{
                fontWeight: "500",
                marginBottom: 30,
                marginTop: 30,
                textAlign: "center",
              }}
            >
              {t("Escoge la cantidad")}
            </Text>
            <FormBigCounterSelect
              isRow={true}
              label={""}
              detail={""}
              value={quantity}
              style={{
                marginTop: 8,
                backgroundColor: "transparent",
                padding: 0,
                justifyContent: "center",
                flex: 0,
              }}
              onChange={(value) => {
                setTotal(value * price);
                onChangeQuantity(value);
              }}
            />
          </View>
          <View style={{ marginTop: 30, marginBottom: 44 }}>
            <Text title4 style={{ textAlign: "center", fontSize: 16 }}>
              {/* {t("Total ")} */}
              S/ {`${total.toFixed(2)}`}
            </Text>
            {/* <Text title4 style={{ textAlign: "center", marginTop: 12 }}>
              {`${total.toFixed(2)}`}
            </Text> */}
          </View>
        </View>

        {/* <Button
          full
          style={{ marginTop: 10, marginBottom: 20 }}
          onPress={onApply}
        >
          {t("buy_now")}
        </Button> */}
      </View>
    </Modal>
  );
};

ModalQuantity.defaultProps = {
  onApply: () => {},
  onChangeQuantity: () => {},
  onPressBack: () => {},
};

ModalQuantity.propTypes = {
  onApply: PropTypes.func,
  onChangeQuantity: PropTypes.func,
  onPressBack: PropTypes.func,
};

export default ModalQuantity;
