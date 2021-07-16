import {
  CardBooking,
  Header,
  Icon,
  ModalFilter,
  SafeAreaView,
  CatalogoList,
  ProfileDetail2,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";

import { UserData } from "@data";
import React, { Fragment, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View, Alert } from "react-native";

import { useSelector, useDispatch, useStore } from "react-redux";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { getAsync } from "../../services/ConnectApi";
import { TouchableOpacity } from "react-native-gesture-handler";

const sortOptionInit = [
  {
    value: "remove",
    icon: "sort-amount-up",
    text: "remove",
  },
  {
    value: "share_this_article",
    icon: "sort-amount-down",
    text: "share_this_article",
  },
  {
    value: "view_detail",
    icon: "sort-amount-up",
    text: "view_detail",
  },
  {
    value: "reset_all",
    icon: "sort-amount-up",
    text: "reset_all",
  },
];

const ECart = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();

  const [products, setProducts] = useState(route.params.productos); //((state) => state.product);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);

  const [promotionCode, setPromotionCode] = useState("");
  const [ttlPrice, setTtlPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [arrPrices, setArrPrices] = useState([]);
  const [userData, setUserData] = useState(UserData[0]);

  const dispatch = useDispatch();
  const [isFavourite, setIsFavourtie] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectProducts, setSelectProducts] = useState([]);
  const customProduct = route.params?.customProduct;
  const [description3, setDescription3] = useState("");
  const [clearSelect, setClearSelect] = useState(false);
  const clearValue = 0;

  function actualizarProducto(item) {
    const i = products.indexOf(item);
    if (i != -1) {
      console.log("SE MODIFICO EL PRODUCTO");
      products.splice(i, 1, customProduct);
    } else {
      console.log("No se encontro el producto");
    }
  }

  const userId = store.getState().auth.login.success.profile.id;

  useEffect(() => {
    customProduct
      ? actualizarProducto(customProduct)
      : console.log("No se ha modificado ningun producto");
    setTimeout(() => {
      setUserData(route.params.vendedor);
      setLoading(false);
    }, 2000); //Math.floor(Math.random() * 1000) + 1000);
  }, []);

  // console.log("ITEM METADATA COLOR");
  // console.log(customProduct);
  useEffect(() => {}, [clearSelect]);

  const onSelectFilter = (selected) => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value == selected.value,
        };
      })
    );
  };

  const getFavorites = () => {
    getAsync(
      "/favorite?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          setFavorites(response);
        },
        onError: (error) => {
          console.log("no se pudieron cargar favoritos");
        }, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    getFavorites();
    setTimeout(() => {}, 2000);
  }, []);

  const checkProdFav = (item) => {
    if (favorites.length > 0) {
      if (favorites.filter((order) => order.producto_id == item).length > 0)
        return true;
    }
    return false;
  };

  const checkCatFav = (item) => {
    if (favorites.length > 0) {
      if (
        favorites.filter((order) => order.usuario_id_catalogo == item).length >
        0
      )
        return true;
    }
    return false;
  };

  const name = () => {
    if (userData.nombreEmpresa) {
      return userData.nombreEmpresa;
    }
    return userData.name + " " + userData.surname;
  };

  const iniciales = () => {
    if (userData.nombreEmpresa) {
      let arr = userData.nombreEmpresa.split("");
      const whiteSpace = (element) => {
        return element === " ";
      };
      let i = arr.findIndex(whiteSpace);
      if (i != -1) {
        return userData.nombreEmpresa[0] + userData.nombreEmpresa[i + 1];
      }
      return userData.nombreEmpresa[0] + userData.nombreEmpresa[1];
    }
    // return userData.name && userData.surname
    //   ? userData.name.charAt(0) + userData.surname.charAt(0)
    //   : "";
    return userData.name.charAt(0) + userData.surname.charAt(0);
  };

  function validarProductosSeleccionados(tot, ty, item) {
    if (ty == "up") {
      if (selectProducts.length === 0) {
        selectProducts.push(item);
      } else {
        if (tot >= 2) {
          console.log("PRODUCTO REPETIDO" + item.title);
        } else {
          selectProducts.push(item);
        }
      }
    } else {
      if (tot <= 0) {
        if (selectProducts.indexOf(item) != -1) {
          let i = selectProducts.indexOf(item);
          selectProducts.splice(i, 1);
          console.log("PRODUCTO ELIMINADO" + item.title);
        } else {
          console.log("EL PRODUCTO NO EXISTE");
        }
      } else {
        console.log("EL PRODUCTO NO SE HA ELIMINADO");
      }
    }
  }

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      setSortOption(sortOptionInit);
    }
  };

  const getTotalPrice = (v, p, i) => {
    let ttlPrice = v * parseFloat(p);

    let result = arrPrices.filter((arr) => arr.index == i);

    if (result.length > 0) {
      let foundIndex = arrPrices.findIndex((x) => x.index == i);
      arrPrices[foundIndex].priceTtl = ttlPrice;
      arrPrices[foundIndex].cant = v;
    } else {
      arrPrices.push({
        index: i,
        priceTtl: ttlPrice,
        cant: v,
      });
    }
    getTtlPriceToPay(arrPrices);
  };

  const getTtlPriceToPay = (arr) => {
    let ttl = 0;
    let cntTtl = 0;

    arr.forEach((p) => {
      ttl += p.priceTtl;
      cntTtl += p.cant;
    });
    setTtlPrice(ttl);
    setQuantity(cntTtl);
  };
  const goProductDetail = (item, favorite, id) => {
    navigation.navigate("EProductDetail", {
      item: item,
      favorite: favorite,
      sellerId: id,
    });
  };

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };

  const renderItem = ({ item, index }) => {
    return (
      <CatalogoList
        style={{ marginTop: 10 }}
        title={item.title}
        image={item.image[0]}
        salePrice={item.salePrice}
        description={formatQuryID(item.sku)}
        description2={
          !item.metadata
            ? ""
            : Object.values(item.metadata).length === 0
            ? ""
            : !item.metadata.talla && !item.metadata.color
            ? "Elige tu color y tamaño"
            : Object.values(item.metadata.color).length > 0
            ? "Color: " + item.metadata.color
            : "Elige tu color"
        }
        description3={
          !item.metadata
            ? ""
            : !item.metadata.talla && !item.metadata.color
            ? ""
            : Object.values(item.metadata.talla).length > 0
            ? "Tamaño: " + item.metadata.talla
            : "Elige tu tamaño"
        }
        appearIcon={true}
        onPress={() =>
          goProductDetail(item, checkProdFav(item.id), userData.id)
        }
        secondDescription={item.secondDescription}
        type={"other"}
        isFavorite={checkProdFav(item.id)}
        idProduct={item.id}
        userId={userId}
        sellerId={userData.id}
        onChangeCount={(total, type) => {
          item.cantidad = total;
          getTotalPrice(total, item.price, index);
          validarProductosSeleccionados(total, type, item);
          console.log(
            !customProduct
              ? console.log("NO EXISTE CUSTOM PRODUCT")
              : customProduct.cantidad
              ? "CANTIDAD DEL PRODUCTO EDITADO " + customProduct.cantidad
              : "NO EXISTE CANTIDAD DEL PRODUCTO"
          );
        }}
        clear={clearSelect}
      />
    );
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 110;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="30%" y="0" rx="8" ry="8" width="40%" height="25" />
          <Rect x="0" y="50" rx="8" ry="8" width="100%" height="70" />
          {holders.map((item, index) => {
            y = index == 0 ? height + 35 : y + height + 20;
            return (
              <Fragment key={index}>
                <Rect x="0" y={y} rx="8" ry="8" width="110" height={height} />
                <Rect x="120" y={y + 5} rx="8" ry="8" width="45%" height={15} />
                <Rect
                  x="120"
                  y={y + 30}
                  rx="8"
                  ry="8"
                  width="40%"
                  height={10}
                />
                <Rect
                  x="120"
                  y={y + 50}
                  rx="8"
                  ry="8"
                  width="20%"
                  height={10}
                />
                <Rect
                  x="120"
                  y={y + 70}
                  rx="8"
                  ry="8"
                  width="45%"
                  height={10}
                />
                <Rect
                  x="120"
                  y={y + 90}
                  rx="8"
                  ry="8"
                  width="45%"
                  height={10}
                />
                <Rect
                  x="90%"
                  y={y + 70}
                  rx="10"
                  ry="10"
                  width="20"
                  height={20}
                />
                <Rect
                  x="90%"
                  y={y + 20}
                  rx="10"
                  ry="10"
                  width="20"
                  height={20}
                />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={"Resultado búsqueda"}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <View style={[{ flex: 1, paddingHorizontal: 20, paddingBottom: 10 }]}>
          <View style={{ flexDirection: "row", marginVertical: 15 }}>
            <ProfileDetail2
              style={{ flex: 1 }}
              textFirst={name()}
              textThird={userData.quryId}
              isFav={checkCatFav(userData.id)}
              userId={userId}
              idCatalog={userData.id}
              inicial={iniciales()}
              onPress={() => {
                navigation.navigate("EUserProfile", { id: userData.id });
              }}
              onDelete={() => {
                deleteFavorite(index, item.id, null, item.usuarios?.id);
              }}
              isSwipable={false}
            />
          </View>
          {/* <View
            style={{ marginBottom: 5, marginTop: 10, justifyContent: "center" }}
          > */}
          {/* <Text
              style={{ marginBottom: 15 }}
            >{`${products.length} Productos`}</Text> */}
          {/* <TouchableOpacity
              style={[
                styles.viewIcon,
                {
                  backgroundColor: isFavourite
                    ? BaseColor.navyBlue
                    : colors.primaryLight,
                  borderColor: BaseColor.navyBlue,
                },
              ]}
              onPress={() => setIsFavourtie(!isFavourite)}
            >
              <Icon
                solid
                name="heart"
                size={20}
                color={isFavourite ? colors.primaryLight : BaseColor.whiteColor}
              />
            </TouchableOpacity> */}
          {/* </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EProductStoreProfile", { user: userData });
              }}
              // style={{ paddingBottom: 5 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.primaryBlueColor,
                  textDecorationLine: "underline",
                }}
              >
                Políticas de Venta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setClearSelect(!clearSelect);
                setQuantity(0);
                setTtlPrice(0);
                setSelectProducts([]);
                setArrPrices([]);
                //setClearSelect(false);
              }}
            >
              <Text
                style={{
                  color: "#C62105",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Limpiar selección
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            // contentContainerStyle={{ paddingVertical: 12 }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={products}
            refreshing={isFocused}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />

          <ModalFilter
            options={sortOption}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
              setSortOption(sortOptionInit);
            }}
            onApply={onApply}
            onSelectFilter={onSelectFilter}
          />
        </View>
        <CardBooking
          style={{ flexDirection: "row" }}
          count={quantity}
          price={ttlPrice.toFixed(2)}
          secondDescription={"Total"}
          // textButton={t("checkout")}
          bloquear={quantity >= 1 ? false : true}
          textButton={t("Comprar")}
          onPress={() => {
            if (userId == userData.id) {
              Alert.alert(
                "Aviso",
                "No está permitido realizar compras a su propio catálogo",
                [
                  {
                    text: "Aceptar",
                    onPress: () => {},
                  },
                ]
              );
              return;
            }
            navigation.navigate("Shipping", {
              userData: userData,
              ttlPrice: ttlPrice,
              numProducts: quantity,
              selectProducts: selectProducts,
            });
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      {loading ? renderPlaceholder() : renderContent()}
    </SafeAreaView>
  );
};

export default ECart;
