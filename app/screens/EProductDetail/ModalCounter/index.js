import {
  Button,
  ProductColorPicker,
  ProductList,
  ProductSize,
  FormCounterSelect,
  Text,
  CatalogoList,
} from "@components";
import { useTheme } from "@config";
import { EFilterColors, EFilterSizes } from "@data";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";


const ModalCounter = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const {
    onApply,
    stock,
    item,
    colorChoosedInit,
    sizeChoosedInit,
    onPressBack,
    ...attrs
  } = props;
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(colorChoosedInit);
  const [sizeChoosed, setSizeChoosed] = useState(sizeChoosedInit);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setColorChoosed(colorChoosedInit);
  }, [colorChoosedInit]);

  useEffect(() => {
    setSizeChoosed(sizeChoosedInit);
  }, [sizeChoosedInit]);

  useEffect(() => {
    setTotal(parseFloat(item.price));
  }, [item]);

  const { image, title, category, salePrice, costPrice, price } = item;

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
        {/* <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View> */}
        {/* <View style={{ paddingVertical: 20 }}>
          <CatalogoList
            image={image}
            title={title}
            description={category}
            salePrice={salePrice}
            costPrice={costPrice}
            isFavorite={true}
          />
        </View>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text body1>{t("color").toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}
          >
            {`${colorChoosed.name}`.toUpperCase()}
          </Text>
        </View> */}
        {/* <ProductColorPicker
          colorChoosed={colorChoosed}
          colors={eColors}
          onPress={(color) => setColorChoosed(color)}
        /> */}

        <View style={{ marginVertical: 8, marginTop: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {"Escoge la cantidad"}
          </Text>
        </View>
        {/* <ProductSize
          sizeChoosed={sizeChoosed}
          sizes={eSizes}
          onPress={(size) => setSizeChoosed(size)}
        /> */}

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <FormCounterSelect
            isRow={true}
            label={""}
            detail={""}
            style={{
              marginTop: 8,
              backgroundColor: "transparent",
              padding: 0,
              justifyContent: "center",
              flex: 0,
            }}
            onChange={(value) => {
              setTotal(value * price);
            }}
          />
        </View>
        <View style={{ marginVertical: 20, marginBottom: 60 }}>
          <Text>
            {stock} disponibles ({stock})
          </Text>
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

ModalCounter.defaultProps = {
  onApply: () => { },
  stock: 0,
  onPressBack: () => { },
};

ModalCounter.propTypes = {
  onApply: PropTypes.func,
  stock: PropTypes.number,
  onPressBack: PropTypes.func,
};

export default ModalCounter;
