import {
  FilterESort,
  ProductBlock,
  ProductGrid2,
  ProductList,
  CatalogoList,
  SafeAreaView,
  Tag,
  CardBooking,
} from "@components";
import PropTypes from "prop-types";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
// Load sample data
import { EPostListData, ESortOption } from "@data";
import { useNavigation } from "@react-navigation/native";
import * as Utils from "@utils";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  Platform,
  RefreshControl,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import styles from "./styles";
//DATA SERVICES
import { SearchCatalogueData } from "@services";
import { ProductsData, ProductService } from "@services";

const currentLocationInit = {
  latitude: null,
  longitude: null,
};

const initialLayout = { width: Dimensions.get("window").width };
let PrecioTotalPagar = 0;

const Product = ({ onChangePrice }) => {
  const [ttlPrice, setTtlPrice] = useState(0);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dataValidation = () => {
    ProductService();
    if (SearchCatalogueData().length > 0) {
      return SearchCatalogueData();
    }
    return ProductsData();
  };
  const [refreshing, setRefreshing] = useState(false);
  const [modeView, setModeView] = useState("list");
  const [list, setList] = useState(dataValidation());
  const [loading, setLoading] = useState(false);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const [arrPrices, setArrPrices] = useState([]);

  const clampedScroll = useRef(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnim
      ),
      0,
      40
    )
  ).current;
  useEffect(() => {
    setTimeout(() => {
      setList(dataValidation());
      setLoading(false);
    }, 3000); //Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const onChangeSort = (sortOption) => {
    Utils.enableExperimental();
    const { value } = sortOption;
    switch (value) {
      case "all":
        setList(dataValidation());
        break;
      case "best_match":
        setList(dataValidation().filter((product) => product.isBestMatch));
        break;
      case "price_low_to_high":
        const products = [...dataValidation()];
        products.sort((a, b) => {
          return a.price - b.price;
        });
        setList(products);
        break;
      case "price_high_to_low":
        const productHights = [...dataValidation()];
        productHights.sort((a, b) => {
          return b.price - a.price;
        });
        setList(productHights);
        break;
      case "catalogo":
        setList(dataValidation());
        break;
      default:
        setList(dataValidation());
        break;
    }
  };

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate("EFilter");
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    Utils.enableExperimental();

    let mode = "block";
    switch (modeView) {
      case "block":
        mode = "grid";
        break;
      case "grid":
        mode = "list";
        break;
      case "list":
        mode = "block";
        break;
      default:
        break;
    }
    setModeView(mode);
  };

  const getTotalCol = () => {
    switch (modeView) {
      case "block":
        return 1;
      case "list":
        return 1;
      case "grid":
        return 2;
      default:
        return 1;
    }
  };

  const goProductDetail = (item) => {
    navigation.navigate("EProductDetail", { item: item });
  };

  const getTotalPrice = (v, p, i) => {
    let ttlPrice = v * parseFloat(p);

    let result = arrPrices.filter((arr) => arr.index == i);

    if (result.length > 0) {
      let foundIndex = arrPrices.findIndex((x) => x.index == i);
      arrPrices[foundIndex].priceTtl = ttlPrice;
    } else {
      arrPrices.push({
        index: i,
        priceTtl: ttlPrice,
      });
    }
    getTtlPriceToPay(arrPrices);

    //return ttlPrice;
  };

  const getTtlPriceToPay = (arr) => {
    let ttl = 0;
    arr.forEach((p) => {
      ttl += p.priceTtl;
    });
    //PrecioTotalPagar = ttl
    //setTtlPrice(ttl)
    setTtlPrice(ttl);
    onChangePrice(ttl);
  };

  const renderItem = ({ item, index }) => {
    switch (modeView) {
      case "list":
        return (
          <>
            <CatalogoList
              description={item.description}
              title={item.title}
              style={{ marginVertical: 8 }}
              image={item.image[0]}
              costPrice={item.price}
              salePrice={item.salePrice}
              onPress={() => goProductDetail(item)}
              isFavorite={item.isFavorite}
              salePercent={item.salePercent}
              onChangeCount={(v) => getTotalPrice(v, item.price, index)}
            />
          </>
        );
      case "grid":
        return (
          <ProductGrid2
            description={item.description}
            title={item.title}
            style={{
              paddingLeft: index % 2 ? 4 : 0,
              paddingRight: index % 2 ? 0 : 4,
              width: "50%",
              paddingBottom: 16,
            }}
            image={item.image}
            costPrice={item.costPrice}
            salePrice={item.salePrice}
            onPress={() => goProductDetail(item)}
            isFavorite={item.isFavorite}
            salePercent={item.salePercent}
          />
        );

      case "block":
        return (
          <ProductBlock
            description={item.description}
            title={item.title}
            style={{ marginVertical: 8 }}
            image={item.image}
            costPrice={item.costPrice}
            salePrice={item.salePrice}
            onPress={() => goProductDetail(item)}
            isFavorite={item.isFavorite}
            salePercent={item.salePercent}
          />
        );

      default:
        break;
    }
  };

  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: "clamp",
    });
    const android = Platform.OS == "android";
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          contentInset={{ top: 50 }}
          contentContainerStyle={{
            marginTop: android ? 50 : 0,
            paddingHorizontal: modeView != "block" ? 20 : 0,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {
                setList(dataValidation());
              }}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          data={list}
          key={getTotalCol()}
          numColumns={getTotalCol()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <Animated.View
          style={[
            styles.navbar,
            { backgroundColor: colors.background },
            { transform: [{ translateY: navbarTranslate }] },
          ]}
        >
          <FilterESort
            title={`${list.length} Products`}
            modeView={modeView}
            sortOption={ESortOption}
            onChangeSort={onChangeSort}
            onChangeView={onChangeView}
            onFilter={onFilter}
          />
        </Animated.View>
      </View>
    );
  };

  const renderPlaceholder = () => {
    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#6aff68"
          foregroundColor="#6aff68" //{BaseColor.dividerColor}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="100%" height="30" />
          <Rect x="0" y="50" rx="8" ry="8" width="100%" height={250} />
          <Rect x="0" y="315" rx="8" ry="8" width="100%" height={250} />
          <Rect x="0" y="580" rx="8" ry="8" width="100%" height={250} />
        </ContentLoader>
      </View>
    );
  };

  return <Fragment>{loading ? renderPlaceholder() : renderList()}</Fragment>;
};

Product.propTypes = {
  ttlPrice: PropTypes.number,
  onChangePrice: PropTypes.func,
};

Product.defaultProps = {
  ttlPrice: 0.0,
  onChangePrice: () => {},
};

const OtroComponent = (props) => {
  return (
    <>
      <Text>Otro component {props.item}</Text>
    </>
  );
};

const Catalogo = (props) => {
  const { route } = props;
  const { colors } = useTheme();
  const [index, setIndex] = React.useState(0);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [ttlPrice, setTtlPrice] = useState(0);
  const [list, setList] = useState(ProductsData());

  useEffect(() => {
    //setList(ProductsData())
  }, []);

  const [routes] = React.useState([
    { key: "clothing", title: "Clothing" },
    { key: "accessories", title: "Accessories" },
    { key: "activewear", title: "Activewear" },
    { key: "otro", title: "Otro componente" },
  ]);

  const onChangePrice = (ttlp) => {
    setTtlPrice(ttlp);
  };
  const renderScene = SceneMap({
    clothing: Product,
    accessories: () => {
      return <Product onChangePrice={(v) => onChangePrice(v)} />;
    },
    activewear: Product,
    otro: () => {
      return OtroComponent({ item: "fff" });
    },
  });

  const renderTabBar = (props) => (
    // <TabBar
    //   {...props}
    //   renderIndicator={() => null}
    //   scrollEnabled
    //   style={[styles.tabbar, { backgroundColor: colors.background }]}
    //   tabStyle={styles.tab}
    //   activeColor={BaseColor.whiteColor}
    //   inactiveColor={colors.text}
    //   renderLabel={({ route, focused, color }) => (
    //     <Tag
    //       primary={true}
    //       style={{
    //         backgroundColor: focused ? colors.primary : colors.background,
    //       }}
    //       textStyle={{
    //         color: color,
    //       }}
    //     >
    //       {route.title}
    //     </Tag>
    //   )}
    // />
    <TouchableOpacity>
      <TextInput
        // autoCorrect={false}
        //placeholder={t("enter_keywords")}
        placeholder={"Ingrese un quryid"}
        // value={search}
        // editable={true}
        // pointerEvents="none"
        style={{
          height: 46,
          borderRadius: 5,
          marginLeft: 20,
          // marginRight: 70,
          marginTop: 10,
          // paddingHorizontal: 10,
          width: "90%",
          // justifyContent: "center",
          // alignItems: "center",
          // flexDirection: "row",
          backgroundColor: BaseColor.fieldColor, //"#6ED4C8",
        }}
      />
    </TouchableOpacity>
  );

  const renderComponentTable = () => {
    return (
      <TabView
        scrollEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    );
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      {renderComponentTable()}
      <CardBooking
        style={{}}
        description={t("total_price")}
        price={ttlPrice}
        secondDescription={"Tax included"}
        textButton={t("checkout")}
        onPress={() => navigation.navigate("Shipping")}
      />
    </SafeAreaView>
  );
};

export default Catalogo;
