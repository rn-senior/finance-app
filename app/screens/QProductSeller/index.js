import {
  Button,
  CardBooking,
  Header,
  Icon,
  SafeAreaView,
  CatalogoList,
  Text,
  FilterESort,
  ProductList3,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { URLS3 } from "../../utils/environment";
// import { fetchProds2 } from "@data";

import React, { Fragment, useEffect, useState, useCallback } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  RefreshControl,
  View,
  Switch,
  Alert,
  Image,
  LayoutAnimation,
} from "react-native";

import { useSelector, useDispatch, useStore } from "react-redux";
import { getAsync, patchAsync, postAsync } from "../../services/ConnectApi";

import { useIsFocused } from "@react-navigation/native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

const QProductSeller = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();
  const {
    id,
    estadoCatalogo,
    disclaimer,
    envio,
    recojo,
  } = store.getState().auth.login.success.profile;

  const [products, setProducts] = useState([]);
  const [copyProducts, setCopyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [moveList, setMoveList] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const [usuario, setUsuario] = useState({});
  const [isEnabled, setIsEnabled] = useState(
    estadoCatalogo == 1 ? true : false
  );
  const [paymententry, setPaymentEntry] = useState({});
  const [politics, setPolitics] = useState(disclaimer);
  const [shipping, setShipping] = useState(envio);
  const [pick, setPick] = useState(recojo);
  const [activeOrder, setActiveOrder] = useState(false);

  const listCalalogue = () => {
    getAsync(
      "/products?usuario_id=" + id,
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
          setProducts(newArray);
          setCopyProducts(newArray);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };
  const listPaymentEntry = () => {
    getAsync(
      "/paymententry?usuario_id=" + id,
      {
        onSuccess: (response) => {
          setPaymentEntry(response[0]);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  const listUser = () => {
    getAsync(
      "/usuarios/" + id,
      {
        onSuccess: (response) => {
          setUsuario(response[0]);
          setShipping(response[0].envio);
          setPick(response[0].recojo);
        },
        onError: (error) => {}, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    if (isFocused) {
      listCalalogue();
      listPaymentEntry();
      listUser();
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500); //Math.floor(Math.random() * 1000) + 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocused]);

  const orderProducts = (body) => {
    postAsync(
      "/productsorder",
      {
        onSuccess: (response) => {},
        onError: (error) => {}, // id:Session.user.id,
        data: body,
      },
      null
    );
  };

  const desactivateCatalogue = (estado) => {
    patchAsync(
      "/usuarios",
      {
        onSuccess: (response) => {},
        onError: (error) => {}, // id:Session.user.id,
        data: { id: id, estadoCatalogo: estado },
      },
      null
    );
  };

  const formatArray = (item) => {
    let array = item.map((item) => {
      return " " + item;
    });
    return array;
  };

  const onSaveOrder = () => {
    const ids = products.map((item) => {
      return item.id;
    });
    orderProducts({ ids: ids });
    setMoveList(false);
  };

  const onNotSaveOrder = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setProducts(copyProducts);
    setMoveList(false);
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // const onApply = () => {
  //   let itemSelected = null;
  //   for (const item of sortOption) {
  //     if (item.checked) {
  //       itemSelected = item;
  //     }
  //   }
  //   if (itemSelected) {
  //     setModalVisible(false);
  //     setSortOption(sortOptionInit);
  //   }
  // };

  const onMoveList = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>¿Desea guardar el orden actual?</Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <Button
            style={{
              height: 40,
              flex: 0.4,
              backgroundColor: "#C62105",
            }}
            onPress={onNotSaveOrder}
            styleText={{ fontSize: 14 }}
          >
            {"Descartar"}
          </Button>
          <Button
            style={{
              height: 40,
              flex: 0.4,
              backgroundColor: colors.orangeColor,
            }}
            styleText={{ color: "#fff", fontSize: 14 }}
            onPress={onSaveOrder}
            styleText={{ fontSize: 14 }}
          >
            {"Guardar"}
          </Button>
        </View>
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: RFValue(22),
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          No tienes un catálogo aún
        </Text>
        <Text
          style={{
            fontSize: RFValue(16),
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Crea tu primer producto en qury
        </Text>
      </View>
    );
  };

  const goProductEdit = (item) => {
    navigation.navigate("QProductCreateEdit", { item: item });
  };

  const formatQuryID = (qid) => {
    qid ? null : (qid = "ABC123456");
    return `${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
  };

  // const renderItem = useCallback(
  //   ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
  //   },
  //   []
  // );

  const onPressOrder = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMoveList(true);
  };

  const renderItem = ({ item, index }) => {
    return (
      <ProductList3
        index={index}
        firts={index === 0 ? true : false}
        last={products.length - 1 == index ? true : false}
        style={{ marginVertical: 10 }}
        title={item.nombre}
        image={URLS3 + item.imagen1}
        salePrice={item.precio}
        description={formatQuryID(item.quryId)}
        description2={
          !item.metadata
            ? "Puedes agregar colores y tamaños"
            : !item.metadata.tallas && !item.metadata.colores
            ? "Puedes agregar colores y tamaños"
            : !item.metadata.colores
            ? "Puedes agregar colores"
            : "Colores: " + formatArray(item.metadata.colores)
        }
        description3={
          !item.metadata
            ? ""
            : !item.metadata.tallas && !item.metadata.colores
            ? ""
            : !item.metadata.tallas
            ? "Puedes agregar tamaños"
            : "Tamaños: " + formatArray(item.metadata.tallas)
        }
        onPress={() => goProductEdit(item)}
        share={moveList ? false : true}
        onShare={() => {
          navigation.navigate("EShared", {
            nombre: item.nombre,
            quryId: item.quryId,
            arrImg: [
              URLS3 + item.imagen1,
              URLS3 + item.imagen2,
              URLS3 + item.imagen3,
            ],
          });
        }}
        onPressArrowDown={() => {
          let array = [...products];
          let i = array.indexOf(item);
          let it = array[i];
          array[i] = array[i + 1];
          array[i + 1] = it;
          setProducts(array);
        }}
        onPressArrowUp={() => {
          let array = [...products];
          let i = array.indexOf(item);
          let it = array[i];
          array[i] = array[i - 1];
          array[i - 1] = it;
          setProducts(array);
        }}
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
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="25" />
          <Rect x="75%" y="0" rx="8" ry="8" width="80" height="25" />
          {/* <Rect x="0" y="50" rx="8" ry="8" width="100%" height="70" /> */}
          {holders.map((item, index) => {
            y = index == 0 ? height - 60 : y + height + 20;
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
                  y={y + 40}
                  rx="10"
                  ry="10"
                  width="30"
                  height={30}
                />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            height: 45,
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginVertical: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text numberOfLines={1} style={{ fontWeight: "700", fontSize: 24 }}>
              Catálogo
            </Text>
            {moveList ? null : (
              <TouchableOpacity
                style={{ marginLeft: 15, marginTop: 5 }}
                onPress={onPressOrder}
              >
                <Text style={{ color: "#3279D7", fontSize: 14 }}>Ordenar</Text>
              </TouchableOpacity>
            )}
          </View>
          <Button
            style={{
              flex: moveList ? 0.35 : 0.5,
              height: 30,
              alignSelf: "flex-end",
              opacity: moveList ? 0.6 : 1,
              backgroundColor: colors.orangeColor,
            }}
            styleText={{ marginLeft: "5%", fontSize: RFValue(12) }}
            onPress={() => navigation.navigate("QProductCreateEdit", {})}
            icon={<Icon solid name="plus" size={12} color={"white"} />}
            disabled={moveList}
          >
            Agregar
          </Button>
          {/* </View> */}
        </View>
        <View style={[{ flex: 1, paddingHorizontal: 20, paddingBottom: 10 }]}>
          {/* <FilterESort
            title={`${products.length} Productos`}
            modeView={modeView}
            sortOption={ESortOption}
            onChangeSort={onChangeSort}
            onChangeView={onChangeView}
            onFilter={onFilter}
          /> */}
          {products.length == 0 ? (
            renderMessage()
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={"#0191CB"}
                  refreshing={refreshing}
                  onRefresh={() => {
                    listCalalogue();
                  }}
                />
              }
              data={products}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          )}

          {/* <ModalFilter
            options={sortOption}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
              setSortOption(sortOptionInit);
            }}
            onApply={onApply}
            onSelectFilter={onSelectFilter}
          /> */}
          <View
            style={{
              height: 70,
            }}
          >
            {moveList ? (
              onMoveList()
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 0.6,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    {"Activar Catálogo"}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1.7,
                    alignItems: "flex-end",
                    // textAlignVertical: "center",
                  }}
                >
                  <Text style={{ fontSize: 11 }}>
                    Recuerda que mientras esté desactivado no lo podrán
                    encontrar en la búsqueda
                  </Text>
                </View>

                <View style={{ flex: 0.7, alignItems: "flex-end" }}>
                  <Switch
                    value={isEnabled}
                    onValueChange={() => {
                      if (isEnabled === false) {
                        if (!politics || !paymententry) {
                          const message = !politics
                            ? "No se pudo activar el catálogo, para ello debe agregar sus políticas de venta"
                            : "No se pudo activar el catálogo, para ello debe agregar su método de cobro";
                          Alert.alert("Aviso", message, [
                            {
                              text: "Aceptar",
                              onPress: () => {},
                            },
                          ]);
                          return;
                        }
                        if (shipping === "0" && pick === "0") {
                          Alert.alert(
                            "Aviso",
                            "No se pudo activar el catálogo, active al menos un método de recojo",
                            [
                              {
                                text: "Aceptar",
                                onPress: () => {},
                              },
                            ]
                          );
                          return;
                        }
                      }
                      setIsEnabled((previousState) => !previousState);
                      isEnabled
                        ? desactivateCatalogue(0)
                        : desactivateCatalogue(1);
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      {loading ? renderPlaceholder() : renderContent()}
    </SafeAreaView>
  );
};

export default QProductSeller;
