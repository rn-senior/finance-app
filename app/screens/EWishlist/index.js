import {
  ProductOrderItemList,
  ProductList4,
  Tag,
  ProductCard4,
  SafeAreaView,
  Header,
  Icon,
  Text,
  ModalFilter,
  CatalogoList,
  ProfileDetail2,
} from "@components";
import {
  favoritesData,
  FavoriteService,
  FavoritosService,
  favoritosProducts,
  SearchCatalogueService,
  deletefavoriteService,
} from "@services";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { WishlistsData, EYourStores, EOptions } from "@data";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useSelector, useDispatch, useStore } from "react-redux";
import ModalOption from "./ModalOption";
import List from "@components";
import { enableExperimental } from "@utils";
import { getAsync, postAsync } from "../../services/ConnectApi";
import { useIsFocused } from "@react-navigation/native";
import { URLS3 } from "../../utils/environment";
import Spinner from "react-native-loading-spinner-overlay";

const TABS = [
  {
    id: 1,
    title: "Productos",
    key: "isProduct",
  },
  {
    id: 2,
    title: "Catálogos",
    key: "isCatalogue",
  },
];

const EWishlist = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  //const [modalVisible, setModalVisible] = useState(true);
  const [tabChoosed, setTabChoosed] = useState(TABS[0]);
  const dispatch = useDispatch();

  const userId = store.getState().auth.login.success.profile.id;
  const [spinner, setSpinner] = useState(false);

  //const rxSearchResult = useSelector((state) => state.product.catalogo);
  let row = new Array();
  let prevOpenedRow;

  useEffect(() => {
    // enableExperimental();

    if (tabChoosed.id == 1) {
      setProducts(favorites.filter((order) => order.producto_id != null));
    } else if (tabChoosed.id == 2) {
      setProducts(
        favorites.filter((order) => order.usuario_id_catalogo != null)
      );
    }
  }, [tabChoosed, favorites]);

  const getFavorites = () => {
    getAsync(
      "/favorite?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          setFavorites(response);
          /* if (tabChoosed.id == 1) {
            setProducts(response.filter((order) => order.producto_id != null));
          } else if (tabChoosed.id == 2) {
            setProducts(
              response.filter((order) => order.usuario_id_catalogo != null)
            );
          } */
          setLoading(false);
        },
        onError: (error) => {
          console.log("no se pudieron cargar favoritos");
          setLoading(false);
        },
      },
      null
    );
  };

  useEffect(() => {
    setTimeout(() => {
      {
        isFocused ? getFavorites() : "none";
      }
    }, 500); //Math.floor(Math.random() * 1000) + 1000);
  }, [isFocused]);

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

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };

  const formatImageUri = (uri) => {
    uri ? null : (uri = "");
    return URLS3 + uri;
  };

  const goProductDetail = (item) => {
    const p = item.productos;
    navigation.navigate("EProductDetail", {
      item: {
        id: p.id,
        description: p.descripcion,
        secondDescription: p.nombre,
        title: p.descripcion,
        image: [URLS3 + p.imagen1, URLS3 + p.imagen2, URLS3 + p.imagen3],
        salePrice: "S/" + p.precio,
        isFavorite: true,
        price: p.precio,
        sku: p.quryId,
        metadata: p.metadata,
        fromFavorite: true,
        usuario: p.usuario,
      },
    });
  };

  const goProducts2 = (item) => {
    console.log(item);
    burcarCatalogo(item.quryId);
  };

  const setImagesArr = (p) => {
    let arr = [p.imagen1, p.imagen2, p.imagen3];
    return arr
      .filter((i) => {
        return i != "";
      })
      .filter((i) => {
        return i != null;
      })
      .map((i) => URLS3 + i);
  };

  const burcarCatalogo = (search) => {
    getAsync(
      "/busqueda/" + search,
      {
        onSuccess: (response) => {
          if (response.error == undefined) {
            let listSearchCatalogue = [];
            let dataUsurio = [];
            if (response[0].productos) {
              dataUsurio = {
                id: response[0].id,
                name: response[0].nombres,
                surname: response[0].apellidos,
                user: response[0].userLogin,
                quryId: response[0].quryId,
                estadoCatalogo: response[0].estadoCatalogo,
                esEmpresa: response[0].esEmpresa,
                nombreEmpresa: response[0].nombreEmpresa,
              };
              console.log(dataUsurio);
              response[0].productos.forEach((p) => {
                listSearchCatalogue.push({
                  id: p.id,
                  description: p.descripcion,
                  secondDescription: p.nombre,
                  title: p.descripcion,
                  image: setImagesArr(p),
                  salePrice: "S/" + p.precio,
                  isFavorite: !!p.favorito,
                  price: p.precio,
                  sku: p.quryId,
                  metadata: p.metadata,
                });
              });

              navigation.navigate("ECart", {
                productos: listSearchCatalogue,
                vendedor: dataUsurio,
              });
            } else {
              response.forEach((p) => {
                listSearchCatalogue.push({
                  id: p.id,
                  description: p.descripcion,
                  secondDescription: p.nombre,
                  title: p.descripcion,
                  image: setImagesArr(p),
                  salePrice: "S/" + p.precio,
                  isFavorite: !!p.favorito,
                  price: p.precio,
                  sku: p.quryId,
                  metadata: p.metadata,
                });
              });
              navigation.navigate("ECart", {
                productos: listSearchCatalogue,
                vendedor: user,
              });
            }
          }
        },
        onError: (error) => {},
      },
      null
    );
  };

  const deleteFavorite = (index, id, idProd, idCat) => {
    const arr = [...products];
    arr.splice(index, 1);
    setProducts(arr);
    setFavorites(favorites.filter((fav) => fav.id !== id));
    //onDeleteFavorite()
    dispatch(
      deletefavoriteService({
        userId: userId,
        idProduct: idProd,
        idCatalog: idCat,
      })
    );
  };

  const onDeleteFavorite = () => {
    dispatch(
      deletefavoriteService({
        userId: userId,
        idProduct: idFav,
        idCatalog: null,
      })
    );
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 100;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="20" y="0" rx="8" ry="8" width="35%" height="20" />
          <Rect x="220" y="0" rx="8" ry="8" width="35%" height="20" />
          {holders.map((item, index) => {
            y = index == 0 ? height - 50 : y + height + 20;
            return (
              <Fragment key={index}>
                <Rect x="0" y={y} rx="8" ry="8" width="100" height={height} />
                <Rect x="110" y={y + 5} rx="8" ry="8" width="60%" height={10} />
                <Rect
                  x="110"
                  y={y + 40}
                  rx="8"
                  ry="8"
                  width="50%"
                  height={10}
                />
                <Rect
                  x="110"
                  y={y + 80}
                  rx="8"
                  ry="8"
                  width="50%"
                  height={10}
                />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const names = (item) => {
    if (item.usuarios?.nombreEmpresa) {
      return item.usuarios?.nombreEmpresa;
    }
    return item.usuarios?.nombres + " " + item.usuarios?.apellidos;
  };

  const iniciales = (item) => {
    if (item.usuarios?.nombreEmpresa) {
      let arr = item.usuarios?.nombreEmpresa.split("");
      const whiteSpace = (element) => {
        return element === " ";
      };
      let i = arr.findIndex(whiteSpace);
      if (i != -1) {
        return (
          item.usuarios?.nombreEmpresa[0] + item.usuarios?.nombreEmpresa[i + 1]
        );
      }
      return item.usuarios?.nombreEmpresa[0] + item.usuarios?.nombreEmpresa[1];
    }
    return (
      item.usuarios?.nombres.charAt(0) + item.usuarios?.apellidos.charAt(0)
    );
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent", marginTop: 20 }}>
        {/* <View style={{ flex: 1 }}> */}
        {/* <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text numberOfLines={1} style={{ fontWeight: "700", fontSize: 24 }}>
              {t("wishlist")}
            </Text>
          </View> */}

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingBottom: 16,
          }}
        >
          {TABS.map((tab) => (
            <View key={tab.id} style={{ flex: 1, padding: 4 }}>
              <Tag
                primary={true}
                style={{
                  backgroundColor:
                    tab.id == tabChoosed.id
                      ? colors.orangeColor
                      : colors.background,
                }}
                textStyle={{
                  color:
                    tab.id == tabChoosed.id
                      ? BaseColor.whiteColor
                      : colors.text,
                }}
                onPress={() => setTabChoosed(tab)}
              >
                {tab.title}
              </Tag>
            </View>
          ))}
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {
                getFavorites();
              }}
            />
          }
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ProductList4
              style={{ marginTop: 10 }}
              title={item.productos?.descripcion}
              image={formatImageUri(item.productos?.imagen1)}
              salePrice={item.productos?.precio}
              //costPrice={"S/" + (parseFloat(item.productos?.precio) + parseFloat(item.productos?.precio) / 1.5 +0.99)}
              description={formatQuryID(item.productos?.quryId)}
              isFav={checkProdFav(item.producto_id)}
              userId={userId}
              idProduct={item.producto_id}
              onPress={() => goProductDetail(item)}
              onDelete={() => {
                deleteFavorite(index, item.id, item.producto_id, null);
              }}
              index={index}
            />
          )}
        />
        {/* </View> */}
      </View>
    );
  };

  const renderContent2 = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent", marginTop: 20 }}>
        {/* <View style={{ flex: 1 }}> */}
        {/* <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text numberOfLines={1} style={{ fontWeight: "700", fontSize: 24 }}>
              {t("wishlist")}
            </Text>
          </View> */}

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingBottom: 16,
          }}
        >
          {TABS.map((tab) => (
            <View key={tab.id} style={{ flex: 1, padding: 4 }}>
              <Tag
                primary={true}
                style={{
                  backgroundColor:
                    tab.id == tabChoosed.id
                      ? colors.orangeColor
                      : colors.background,
                }}
                textStyle={{
                  color:
                    tab.id == tabChoosed.id
                      ? BaseColor.whiteColor
                      : colors.text,
                }}
                onPress={() => setTabChoosed(tab)}
              >
                {tab.title}
              </Tag>
            </View>
          ))}
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {
                getFavorites();
              }}
            />
          }
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ProfileDetail2
              style={{ flex: 1, marginVertical: 5 }}
              textFirst={names(item)}
              textSecond={"@" + item.usuarios?.userLogin}
              textThird={item.usuarios?.quryId}
              inicial={iniciales(item)}
              isFav={checkCatFav(item.usuarios?.id)}
              userId={userId}
              idCatalog={item.usuarios?.id}
              onPress={() => {
                //navigation.navigate("EProductStoreProfile", { user: userData });
                setSpinner(true);
                dispatch(SearchCatalogueService(item.usuarios?.quryId));
                setTimeout(() => {
                  setSpinner(false);
                  if (store.getState().product.catalogo) {
                    if (store.getState().product.catalogo.length > 1) {
                      goProducts2(item.usuarios);
                    } else {
                      //goProductDetail(store.getState().product.catalogo[0]);
                      console.log("no existe CATALOGO");
                    }
                  }
                }, 2500);
              }}
              onDelete={() => {
                deleteFavorite(index, item.id, null, item.usuarios?.id);
              }}
              isSwipable={true}
              index={index}
            />
          )}
        />
      </View>
      // </View>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always" }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text numberOfLines={1} style={{ fontWeight: "700", fontSize: 24 }}>
            {"Lista de favoritos"}
          </Text>
        </View>
        <Spinner visible={spinner} />
        {loading
          ? renderPlaceholder()
          : tabChoosed.id == 1
          ? renderContent()
          : renderContent2()}
      </View>
    </SafeAreaView>
  );
};

export default EWishlist;
