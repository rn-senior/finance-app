import {
  Button,
  ProductColorPicker,
  ProductSize,
  Header,
  Icon,
  SafeAreaView,
  Tag,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import * as Utils from "@utils";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import RangeSlider from "rn-range-slider";
import styles from "./styles";
import { EFilterColors, EFilterCategories, EFilterSizes } from "@data";

const Filter = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(EFilterCategories);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [priceBegin, setPriceBegin] = useState(9);
  const [priceEnd, setPriceEnd] = useState(500);
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);
  const [sizeChoosed, setSizeChoosed] = useState(EFilterSizes[0]);
  const ref = useRef(null);

  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  const onSelectCategory = (select) => {
    const categoryNew = category.map((item) => {
      if (item.name == select.name) {
        return {
          ...item,
          checked: true,
        };
      } else {
        return {
          ...item,
          checked: false,
        };
      }
    });
    setCategory(categoryNew);
  };

  const onClear = () => {
    onSelectCategory(EFilterCategories[0]);
    setColorChoosed(EFilterColors[0]);
    setSizeChoosed(EFilterSizes[0]);
    // setPriceBegin(9);
    // setPriceEnd(500);
    ref.current.setLowValue(9);
    ref.current.setHighValue(500);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={t("filtering")}
        renderLeft={true}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t("clear")}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={onClear}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text headline semibold>
            {t("category")}
          </Text>
          <View style={styles.wrapContent}>
            {category.map((item) => {
              return (
                <Tag
                  primary={item.checked}
                  outline={!item.checked}
                  key={item.id}
                  style={{
                    marginTop: 8,
                    marginRight: 8,
                    height: 28,
                  }}
                  onPress={() => onSelectCategory(item)}
                >
                  {item.name}
                </Tag>
              );
            })}
          </View>

          <Text headline semibold style={{ marginTop: 20 }}>
            {t("price")}
          </Text>
          <View>
            <View style={styles.contentRange}>
              <Text caption1 grayColor>
                $9.00
              </Text>
              <Text caption1 grayColor>
                $500.00
              </Text>
            </View>
            <RangeSlider
              ref={ref}
              style={{
                width: "100%",
                height: 40,
              }}
              thumbRadius={12}
              lineWidth={5}
              gravity={"center"}
              labelStyle="none"
              min={9}
              max={500}
              step={1}
              selectionColor={colors.primary}
              blankColor={BaseColor.dividerColor}
              onValueChanged={(low, high, fromUser) => {
                setPriceBegin(low);
                setPriceEnd(high);
              }}
              onTouchStart={() => {
                setScrollEnabled(false);
              }}
              onTouchEnd={() => {
                setScrollEnabled(true);
              }}
            />
            <View style={styles.contentResultRange}>
              <Text caption1>{t("select_price")}</Text>
              <Text caption1>{`$${priceBegin}.00 - $${priceEnd}.00`}</Text>
            </View>
          </View>

          <Text headline semibold style={{ marginTop: 20, marginBottom: 8 }}>
            {`${t("color")} (${colorChoosed.name})`}
          </Text>
          <ProductColorPicker
            colorChoosed={colorChoosed}
            colors={eColors}
            onPress={(color) => setColorChoosed(color)}
          />

          <Text headline semibold style={{ marginTop: 20, marginBottom: 8 }}>
            {`${t("size")} (${sizeChoosed.name})`}
          </Text>
          <ProductSize
            sizeChoosed={sizeChoosed}
            sizes={eSizes}
            onPress={(size) => setSizeChoosed(size)}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Button
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              navigation.goBack();
              setLoading(false);
            }, 500);
          }}
          loading={loading}
        >
          {t("apply")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Filter;
