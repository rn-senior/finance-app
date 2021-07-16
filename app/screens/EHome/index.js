import {
  HeaderAnimated,
  Icon,
  ModalFilter,
  SafeAreaView,
  HeaderLargeTitleBadge,
  CategoryBoxColor,
  Button,
  CardList2,
  ModalAlert,
} from "@components";
import Text2 from "@components/Text";

import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { EPopulars, EYourStores } from "@data";
import TextInputMask from "react-native-text-input-mask";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  Linking,
  I18nManager,
  Alert,
  Image,
} from "react-native";
import styles from "./styles";
import { getAsync, postAsync } from "../../services/ConnectApi";
import * as actionTypes from "../../actions/actionTypes";
import { ProductService } from "@services";
import { useSelector, useStore, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { URLS3 } from "../../utils/environment";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";

const Home = (props) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalC, setModalC] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(EPopulars);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState(EYourStores);
  const [storeChoosed, setStoreChoosed] = useState(EYourStores[0]);
  const scrollY = useRef(new Animated.Value(0)).current;
  //const searchBox = useRef(null);
  const [searchQuryId, setSearchQuryId] = useState("");
  const dispatch = useDispatch();
  const rxSearchResult = useSelector((state) => state.product.catalogo);
  const store = useStore();
  const [spinner, setSpinner] = useState(false);
  const [news, setNews] = useState([]);
  const [trays, setTrays] = useState([]);
  const userId = useSelector((state) => state.auth.login.success.profile.id);
  const [hasCatalogue, setHasCatalogue] = useState(false);

  const { quryId, visitas } = useSelector(
    (state) => state.auth.login.success.profile
  );

  const [tutorials, setTutorials] = useState([]);

  const [trans, setTrans] = useState([]);
  const [VentasProceso, setVentasProceso] = useState(0);
  const [ComprasProceso, setComprasProceso] = useState(0);
  const [ComprasCompletadas, setComprasCompletadas] = useState(0);
  const [VentasCompletadas, setVentasCompletadas] = useState(0);
  const tabs = [
    { id: 1, value: 7, text: "7 dias" },
    { id: 2, value: 15, text: "2 semanas" },
    { id: 3, value: 30, text: "1 mes" },
  ];
  const [transactions, setTransactions] = useState([]);

  const OpenURLButton = ({ url, text }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Aviso", `No se puede abrir la url: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
        onPress={handlePress}
      >
        <Icon name={"circle"} size={8} color={"#000"} solid />
        <Text2
          semibold
          style={{
            color: colors.primaryBlueColor,
            fontSize: 14,
            marginLeft: 8,
          }}
        >
          {text}
        </Text2>
      </TouchableOpacity>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
    }
  );

  const formatDate = (date) => {
    const MESES = [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abr.",
      "May.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dic.",
    ];
    var dateString = new Date(date);
    return "" + dateString.getDate() + " " + MESES[dateString.getMonth()] + " ";
  };

  const onChangeStore = () => {
    let storeChoosed = {};
    for (const store of stores) {
      if (store.checked) {
        storeChoosed = store;
        break;
      }
    }
    setStoreChoosed(storeChoosed);
    setModalVisible(false);
  };

  const onSelectStore = (store) => {
    const stores = EYourStores.map((item) => {
      return {
        ...item,
        checked: item.value == store.value,
      };
    });
    setStores(stores);
  };

  const listTrays = () => {
    getAsync(
      "/tray?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          setTrays(response);
        },
        onError: (error) => {},
      },
      null
    );
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const callDashboardData = () => {
    postAsync(
      "/dashboard",
      {
        onSuccess: (res) => {
          setComprasProceso(res[0].comprasProceso);
          setComprasCompletadas(res[0].comprasCompletadas);
          setVentasProceso(res[0].ventasProceso);
          setVentasCompletadas(res[0].ventasCompletadas);
        },
        onError: (error) => {},
        data: { id: userId },
      },
      null
    );
  };

  const listCalalogue = () => {
    getAsync(
      "/products?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          console.log("CATALOGO");
          console.log(response);
          if (response.length > 0) {
            setHasCatalogue(true);
          }
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  const listTutorials = () => {
    getAsync(
      "/tutorials",
      {
        onSuccess: (response) => {
          const newArray = response.sort(function (a, b) {
            if (a.orden > b.orden) {
              return 1;
            }
            if (a.orden < b.orden) {
              return -1;
            }
            return 0;
          });
          setTutorials(newArray);
        },
        onError: (error) => {},
      },
      null
    );
  };

  const getTtl = (arr) => {
    let ttl = 0;
    arr.forEach((t) => {
      ttl += t.precioTotal;
    });
    return ttl;
  };

  const setCatalogo = (catalogo) => {
    return {
      type: actionTypes.CATALOGO,
      catalogo,
    };
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
  let dataUsurio = {};
  const burcarCatalogo = (search) => {
    getAsync(
      "/busqueda/" + search,
      {
        onSuccess: (response) => {
          let listSearchCatalogue = [];

          if (response.error == undefined) {
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
              response[0].productos.forEach((p) => {
                console.log(setImagesArr(p));

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

              goProducts(listSearchCatalogue, dataUsurio);
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
              goProducts(listSearchCatalogue, dataUsurio);
            }
          } else {
            setSpinner(false);
            setModalC(true);
            setModalMsg(response.mensaje);
          }
          dispatch(setCatalogo(listSearchCatalogue));
        },
        onError: (error) => {
          dispatch(setCatalogo([]));
          setSpinner(false);
          setModalC(true);
          setModalMsg(response.mensaje);
        },
      },
      null
    );
  };

  const listNews = () => {
    getAsync(
      "/news",
      {
        onSuccess: (response) => {
          setNews(response);
        },
        onError: (error) => {},
      },
      null
    );
  };
  useEffect(() => {
    if (isFocused) {
      listTrays();
      callDashboardData();
    }
    return () => {
      // isFocused = false;
    };
  }, [isFocused]);

  useEffect(() => {}, [
    VentasProceso,
    ComprasProceso,
    ComprasCompletadas,
    VentasCompletadas,
  ]);
  useEffect(() => {
    listNews();
    listTutorials();
    listCalalogue();
    // listTransactionsVentas();
    // listTransactionsComprasProceso();
  }, []);

  useEffect(() => {
    dispatch(ProductService());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const goNews = (item) => {
    navigation.navigate("News", { noticia: item });
  };

  const goProductDetail = (item) => {
    navigation.navigate("EProductDetail", { item: item });
  };

  const goMyOrder = (tab) => {
    navigation.navigate("EMyOrder", { tabSelect: tab });
  };

  const formatQuryId = (quryid) => {
    return quryid.substring(0, 3) + "-" + quryid.substring(3, 7);
  };

  const goProducts = (rxSearchResult, dataUsurio) => {
    setSpinner(false);
    if (dataUsurio.estadoCatalogo != 0) {
      if (rxSearchResult.length == 1) {
        goProductDetail(rxSearchResult[0]);
      } else {
        navigation.navigate("ECart", {
          // productos: store.getState().product.catalogo,
          productos: rxSearchResult,
          vendedor: dataUsurio,
        });
      }
    } else {
      setModalC(true);
      setModalMsg("El catálogo que busca esta desactivado");
    }
  };
  const goProducts2 = () => {
    if (dataUsurio.estadoCatalogo != 0) {
      navigation.navigate("ECart", {
        // productos: store.getState().product.catalogo,
        productos: rxSearchResult,
        vendedor: dataUsurio,
      });
    } else {
      setModalC(true);
      setModalMsg("El catálogo que busca esta desactivado");
    }
  };

  const notificationNotViewed = () => {
    let notViewed = trays.filter((item) => {
      return !item.leido;
    });
    let boolean = notViewed.length === 0 || trays.length === 0 ? false : true;
    return boolean;
  };

  const renderPlaceholder = () => {
    return (
      <View style={styles.paddingSrollView}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />
          <Rect x="0" y="40" rx="8" ry="8" width="80%" height="20" />
          <Rect x="0" y="80" rx="8" ry="8" width="100%" height={250} />

          <Rect x="0" y={350} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={360} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={380} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={410} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={440} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={450} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={470} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={495} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={530} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={540} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={560} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={585} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={630} rx="8" ry="8" width="50%" height={160} />
          <Rect x="53%" y={630} rx="8" ry="8" width="50%" height={160} />
        </ContentLoader>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={{ padding: 20, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Image source={Images.logoQury} style={{ height: 50, width: 125 }} />
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            {hasCatalogue ? (
              <View
                style={{
                  marginBottom: 5,
                  justifyContent: "flex-end",
                  marginRight: 10,
                }}
              >
                <Text2
                  style={{
                    marginLeft: 10,
                    color: colors.primaryBlueColor,
                  }}
                >
                  {"Mi quryId: " + formatQuryId(quryId)}
                </Text2>
              </View>
            ) : null}
            <HeaderLargeTitleBadge
              haveNotification={notificationNotViewed()}
              onPress={() => navigation.navigate("ENotification")}
            />
          </View>
        </View>
        {/* <View style={{ marginBottom: 5, alignItems: "flex-start" }}>
          <Text2
            style={{
              marginLeft: 10,
              color: colors.primaryBlueColor,
            }}
          >
            {"Mi quryId: " + quryId}
          </Text2>
        </View> */}
        <View
          style={[
            BaseStyle.textInput,
            {
              backgroundColor: "#F6F5F5",
              borderRadius: 50,
              paddingHorizontal: 0,
            },
          ]}
        >
          <View style={styles.searchIcon}>
            <Icon
              name={"search"}
              color={colors.placeholderHomeColor}
              size={16}
            />
          </View>
          <TextInputMask
            refInput={(ref) => {}}
            onChangeText={(formatted, extracted) => {
              setSearchQuryId(formatted);
            }}
            placeholderTextColor={colors.placeholderHomeColor}
            placeholder={"Ingresa un quryid"}
            style={[
              styles.placeholder,
              {
                color: colors.primaryBlueColor,
                textAlign: I18nManager.isRTL ? "right" : "auto",
                fontFamily: "Sora",
              },
            ]}
            mask={"[AAA]-[0000]-[00]"}
            value={searchQuryId.toUpperCase()}
          />
          <Button
            style={{
              width: 92,
              backgroundColor: colors.secondButtonColor,
            }}
            styleText={{
              fontSize: 14,
              fontWeight: "600",
            }}
            onPress={() => {
              setSpinner(true);
              if (searchQuryId.length > 3) {
                burcarCatalogo(searchQuryId);
                // setTimeout(() => {
                //   setSpinner(false);
                //   if (rxSearchResult) {
                //     if (rxSearchResult.length > 1) {
                //       goProducts2();
                //     } else if (rxSearchResult.length == 1) {
                //       goProductDetail(rxSearchResult[0]);
                //     } else {
                //     }
                //   }
                // }, 2500);
              } else {
                Alert.alert("Error", "Introduzca un quryid válido");
              }
            }}
          >
            Buscar
          </Button>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Spinner visible={spinner} />
        {renderHeader()}
        {/* <HeaderAnimated
          scrollY={scrollY}
          componentLeft={
            <Image
              source={Images.logoQury}
              style={{ height: 50, width: 125, alignSelf: "flex-start" }}
            />
          }
          componentRight={
            <HeaderLargeTitleBadge
              haveNotification={notificationNotViewed()}
              onPress={() => navigation.navigate("ENotification")}
            />
          }
          componentBottom={
            <View
              style={[
                BaseStyle.textInput,
                {
                  backgroundColor: "#F6F5F5",
                  borderRadius: 50,
                  paddingHorizontal: 0,
                },
              ]}
            >
              <View style={styles.searchIcon}>
                <Icon
                  name={"search"}
                  color={colors.placeholderHomeColor}
                  size={16}
                />
              </View>
              <TextInputMask
                refInput={(ref) => {}}
                onChangeText={(formatted, extracted) => {
                  setSearchQuryId(formatted);
                }}
                placeholderTextColor={colors.placeholderHomeColor}
                placeholder={"Ingresa un quryid"}
                style={[
                  styles.placeholder,
                  {
                    color: colors.primaryBlueColor,
                    textAlign: I18nManager.isRTL ? "right" : "auto",
                    fontFamily: "Sora",
                  },
                ]}
                mask={"[AAA]-[0000]-[00]"}
                value={searchQuryId.toUpperCase()}
              />
              <Button
                style={{
                  width: 92,
                  backgroundColor: colors.secondButtonColor,
                }}
                styleText={{
                  fontSize: 14,
                  fontWeight: "600",
                }}
                onPress={() => {
                  setSpinner(true);
                  if (searchQuryId.length > 3) {
                    burcarCatalogo(searchQuryId);

                    // setTimeout(() => {
                    //   setSpinner(false);
                    //   if (rxSearchResult) {
                    //     if (rxSearchResult.length > 1) {
                    //       goProducts2();
                    //     } else if (rxSearchResult.length == 1) {
                    //       goProductDetail(rxSearchResult[0]);
                    //     } else {
                    //     }
                    //   }
                    // }, 2500);
                  } else {
                    Alert.alert("Error", "Introduzca un quryid válido");
                  }
                }}
              >
                Buscar
              </Button>
            </View>
          }
        /> */}

        <Animated.ScrollView
          contentContainerStyle={[styles.paddingSrollView]}
          onScroll={onScroll}
        >
          <View style={{ flexDirection: "row", height: 210 }}>
            <CategoryBoxColor
              style={{
                width: "48%",
              }}
              title="Compras"
              icon="shop-cart"
              color={colors.primaryBlueColor}
              numProceso={ComprasProceso.toString()}
              numCompletadas={ComprasCompletadas.toString()}
              onPress={() => goMyOrder(1)}
            />

            <CategoryBoxColor
              style={{
                width: "48%",
                marginLeft: 10,
              }}
              title="Ventas"
              icon="shop-cart"
              color={colors.orangeColor}
              numProceso={VentasProceso.toString()}
              numCompletadas={VentasCompletadas.toString()}
              onPress={() => goMyOrder(0)}
              typeTarget="second"
            />
          </View>

          {/* {!quryId ? null : (
          )} */}

          {!hasCatalogue ? (
            <View style={{ marginVertical: 11 }}>
              <Button
                onPress={() => navigation.navigate("QProductCreateEdit", {})}
                style={[
                  styles.sellButton,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.orangeColor,
                  },
                ]}
                styleText={{
                  color: colors.orangeColor,
                  fontSize: 18,
                  marginLeft: 8,
                }}
                icon={
                  <Icon name={"plus"} size={15} color={colors.orangeColor} />
                }
              >
                {"Vender producto"}
              </Button>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
              title="Ventas"
              icon="shop-cart"
            >
              <Text2
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  // fontFamily: "ProximaNova",
                }}
              >
                <Text2
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {visitas}
                </Text2>{" "}
                visitas a tu catálogo
              </Text2>
            </View>
          )}
          <View
            style={[
              styles.separator,
              {
                backgroundColor: colors.separator,
              },
            ]}
          />
          {news.length > 0 ? (
            <View>
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.text,
                  },
                ]}
                title={t("news")}
              >
                Noticias
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 11,
                }}
              >
                {news.map((item, index) => (
                  <View
                    key={index.toString()}
                    style={{ width: "80%", height: 90 }}
                  >
                    <CardList2
                      fecha={formatDate(item.fechaCreacion)}
                      title={item.titulo}
                      image={item.imagen}
                      onPress={() => goNews(item)}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}
          <View
            style={[
              styles.separator,
              {
                backgroundColor: colors.separator,
              },
            ]}
          />

          {tutorials.length == 0 ? null : (
            <View>
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.text,
                  },
                ]}
                title={t("news")}
              >
                Tutoriales
              </Text>
              <Text
                style={{
                  color: colors.fecha,
                  fontSize: 16,
                  marginVertical: 6,
                }}
              >
                Te enseñamos a usar nuestra plataforma
              </Text>
              <View style={{ marginTop: 8 }}>
                {tutorials.map((tutorial, index) => {
                  return (
                    <OpenURLButton
                      text={tutorial.titulo}
                      url={tutorial.link}
                      key={index.toString()}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </Animated.ScrollView>
        <ModalFilter
          options={stores}
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setModalVisible(false);
          }}
          onApply={onChangeStore}
          onSelectFilter={onSelectStore}
        />
        <ModalAlert
          visible={modalC}
          type={"error"}
          message={modalMsg}
          onPressOk={() => {
            setModalC(false);
          }}
        />
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        {loading ? renderPlaceholder() : renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
