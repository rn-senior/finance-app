import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  ProductMetadata,
} from "@components";
import {
  addProductfavoriteService,
  patchfavoriteService,
  deletefavoriteService,
} from "@services";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import * as Utils from "@utils";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Animated,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import styles from "./styles";
import Swiper from "react-native-swiper";
import Clipboard from "@react-native-clipboard/clipboard";
import { SearchCatalogueService, DataUsuario } from "@services";
import { URLS3 } from "../../utils/environment";

const itemInit = {
  price: 60,
  image: Images.eProduct,
  title: "White T-Shirt with simple logo and …",
  category: "Burberry",
  rating: 4.5,
  review: 1,
  status: "In Stock",
  salePrice: "$60.00",
  costPrice: "$70.00",
  taxStatus: "Tax included",
  sku: "AV01-D-32",
  style: "High-neck",
  measurement: "Wearing Size: 24",
  washCare: "Machine Wash",
  fabricComposition: "Lightweight",
  menOrWomen: "For Men",
  season: "Summer, Spring",
  returnsPolicy:
    "Returns and exchanges don't need to be a dreaded part of ecommerce. Here's how to write a return policy that creates a win-win situation.",
  shipping:
    "A Shipping Policy is where you let your customers know important details about how you ship your goods if your business sells goods that get shipped to your customers",
  metadata: {},
};

const ProductDetail = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { item, favorite, sellerId } = route.params;
  const itemCantidad = parseInt(item.cantidad);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [copied, setCopied] = useState(false);
  const [colorChoosed, setColorChoosed] = useState(
    !item.metadata ? "" : item.metadata.color ? item.metadata.color : ""
  );
  const [sizeChoosed, setSizeChoosed] = useState(
    !item.metadata ? "" : item.metadata.talla ? item.metadata.talla : ""
  );
  const [isFavourite, setIsFavourtie] = useState(false);
  const [quantity, setQuantity] = useState(itemCantidad);
  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = { ...itemInit, ...item };
  const userId = useSelector((state) => state.auth.login.success.profile.id);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const dispatch = useDispatch();
  const [indexImage, setIndexImage] = useState(0);
  console.log(route.params);
  const {
    id,
    image,
    title,
    salePrice,
    style,
    metadata,
    quryId,
    fromFavorite,
    usuario,
  } = productData;

  // <<<<<<< HEAD
  const images = [
    { id: 1, image: image[0] },
    { id: 2, image: image[1] },
    { id: 3, image: image[2] },
  ];
  // =======
  //   const arrImges = (i) => {
  //     let arr = [];
  //     i.forEach((a, i) => {
  //       arr.push({ id: i, image: a });
  //     });
  //     return arr;
  //   };
  //   const images = arrImges(image);
  // >>>>>>> 78734f731d1ce43bf73838cda51952a62a85cde3

  const catalogue = useSelector((state) => state.product.catalogo);

  const goCatalogue = (item) => () => {
    console.log(productData);
    dispatch(SearchCatalogueService(productData.sku.slice(0, 7)));
    setTimeout(() => {
      if (catalogue) {
        if (catalogue.length > 1) {
          goProducts2();
        } else {
          //goProductDetail(store.getState().product.catalogo[0]);
          Alert.alert(
            "Lo sentimos",
            "El catálogo que busca no se ha encontrado",
            [
              {
                text: "Aceptar",
                onPress: () => {},
              },
            ]
          );
          console.log("no existe CATALOGO");
        }
      }
    }, 2500);
  };

  const goProducts2 = () => {
    console.log("goProducts2");
    console.log(catalogue);
    console.log("+++++++++++++++++++++++");
    console.log(item);
    navigation.navigate("ECart", {
      productos: catalogue,
      vendedor: DataUsuario,
    });
  };
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      handleBackButton(e);
    });
  }, [hasUnsavedChanges]);

  useEffect(() => {
    console.log("El color es" + item.color);
    console.log("La talla es" + item.talla);
    console.log("fav: " + isFavourite);
    setIsFavourtie(favorite);
  }, []);

  const formatQuryId = (quryid) => {
    return (
      quryid.substring(0, 3) +
      "-" +
      quryid.substring(3, 7) +
      "-" +
      quryid.substring(7, 9)
    );
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 390 - heightHeader],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 390 - heightHeader],
    outputRange: [390, heightHeader],
    useNativeDriver: true,
  });

  const handleBackButton = (e) => {
    if (!hasUnsavedChanges) {
      return;
    }
    e.preventDefault();
    Alert.alert(
      "Aviso",
      "Usted tiene cambios no guardados. ¿Estás seguro de descartarlos y salir de la pantalla?",
      [
        { text: "No salir", style: "cancel", onPress: () => {} },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  };

  const onSelect = (indexSelected) => {
    setIndexImage(indexSelected);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onAddFavorite = () => {
    dispatch(addProductfavoriteService({ userId: userId, idProduct: id }));
  };

  const onDeleteFavorite = () => {
    dispatch(deletefavoriteService({ userId: userId, idProduct: id }));
  };

  const onPatchFavorite = () => {
    dispatch(patchfavoriteService(id));
  };

  const description = () => {
    let desc = item.description
      ? "- " + item.description
      : "No hay descripción";
    return desc;
  };

  // const secondDescription = () => {
  //   let desc = item.description ? "- " + item.secondDescription : "";
  //   return desc;
  // };

  const renderContent = () => {
    return (
      <View
        style={{ width: "100%", paddingHorizontal: 20, marginVertical: 15 }}
      >
        <View
          style={{
            marginVertical: 12,
          }}
        >
          <Text
            title4
            regular
            style={{
              fontSize: 22,
              lineHeight: 27,
            }}
          >
            {title}
          </Text>
        </View>
        {item.sku ? (
          <TouchableOpacity
            style={{
              height: 40,
              width: 240,
              marginVertical: 10,
              alignSelf: "center",
            }}
            onPress={() => {
              let qid = formatQuryId(item.sku);
              Clipboard.setString(qid);
              const text = Clipboard.getString(qid);
              text.then((res) => {
                setCopied(true);
              });
            }}
          >
            <View
              style={{
                backgroundColor: colors.orangeColor,
                borderRadius: 5,
                padding: 8,
              }}
            >
              <Text
                headline
                semibold
                style={{ color: "white", textAlign: "center" }}
              >
                {"quryid: " + formatQuryId(item.sku)}
              </Text>
            </View>
            {copied ? (
              <View>
                <Text style={{ textAlign: "center" }}>
                  Copiado al portapapeles
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </TouchableOpacity>
        ) : null}
        <View style={{ marginVertical: 5 }}>
          <Text title4 bold style={styles.costPrice}>
            {salePrice}
          </Text>
        </View>
        <TouchableOpacity
          onPress={goCatalogue()}
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          <Icon
            name={"file-alt"}
            size={18}
            color={colors.primaryBlueColor}
            regular
          />
          <Text
            title4
            style={{
              color: colors.primaryBlueColor,
              fontSize: 16,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              fontWeight: "600",
            }}
          >
            {"  Ir al catálogo"}
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        {metadata && metadata.colores && (
          <>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 16,
                  marginTop: 12,
                }}
              >
                <Text
                  title4
                  style={{ fontSize: 16, fontWeight: "400", color: "#9B9998" }}
                >
                  {"Color"}:
                </Text>
                <Text
                  title4
                  style={{
                    paddingHorizontal: 8,
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.orangeColor,
                    lineHeight: 19,
                  }}
                >
                  {`${colorChoosed ? colorChoosed : ""}`}
                </Text>
              </View>
              <ProductMetadata
                sizes={metadata.colores}
                onPress={(color) => {
                  setHasUnsavedChanges(true);
                  setColorChoosed(color);
                }}
                valueInit={colorChoosed}
              />
            </View>
            <View style={styles.separator} />
          </>
        )}

        {metadata && metadata.tallas && (
          <>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 16,
                  marginTop: 12,
                }}
              >
                <Text
                  title4
                  style={{ fontSize: 16, fontWeight: "400", color: "#9B9998" }}
                >
                  {"Tamaño"}:
                </Text>
                <Text
                  title4
                  style={{
                    paddingHorizontal: 8,
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.orangeColor,
                    lineHeight: 19,
                  }}
                >
                  {`${sizeChoosed ? sizeChoosed : ""}`}
                </Text>
              </View>
              <ProductMetadata
                sizes={metadata.tallas}
                onPress={(size) => {
                  setHasUnsavedChanges(true);
                  setSizeChoosed(size);
                }}
                valueInit={sizeChoosed}
              />
            </View>
            <View style={styles.separator} />
          </>
        )}

        <View style={{ marginBottom: 15 }}>
          <Text
            title4
            style={{ fontWeight: "600", marginBottom: 8, marginTop: 20 }}
          >
            Descripción del Producto
          </Text>
          <Text body2>{description()}</Text>
          {/* <Text body2>{secondDescription()}</Text> */}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: "always", bottom: "always" }}
      >
        <Header
          title={"Producto"}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
          renderRight={() => {
            return (
              <Animated.Image
                resizeMode="contain"
                style={[styles.icon]}
                source={Images.share}
              />
            );
          }}
          onPressRight={() => {
            navigation.navigate("EShared", {
              quryId: item.sku,
              arrImg: [image[indexImage]],
            });
          }}
        />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          overScrollMode={"never"}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ height: 450 - heightHeader }} />

          {renderContent()}
        </ScrollView>
        {!fromFavorite ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Button
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                navigation.removeListener("beforeRemove", (e) => {
                  handleBackButton(e);
                });
                setHasUnsavedChanges(false);
                setHasUnsavedChanges(false);
                if (item.metadata) {
                  item.metadata.talla = sizeChoosed;
                  item.metadata.color = colorChoosed;
                  item.cantidad = quantity;
                } else {
                  console.log("No tiene metadata");
                }
                navigation.navigate("ECart", {
                  customProduct: item,
                  vendedor: item.usuario,
                });
              }}
            >
              {t("Guardar cambios")}
            </Button>
          </View>
        ) : null}
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}
        onPress={() => {}}
      >
        <Swiper
          dotStyle={{
            backgroundColor: BaseColor.dividerColor,
            marginBottom: 8,
          }}
          activeDotStyle={{
            marginBottom: 8,
          }}
          paginationStyle={{ bottom: 0 }}
          loop={false}
          activeDotColor={colors.primary}
          removeClippedSubviews={false}
          onIndexChanged={(index) => onSelect(index)}
        >
          {images.map((item, key) => {
            return (
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                key={key.toString()}
                onPress={() =>
                  navigation.navigate("PreviewImage", { images: images })
                }
              >
                <Image
                  key={key}
                  // style={{width: '100%', height: '100%'}}
                  style={{ flex: 1 }}
                  //source={item.image}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            );
          })}
        </Swiper>
        <TouchableOpacity
          style={[
            styles.viewIcon,
            {
              backgroundColor: isFavourite ? BaseColor.whiteColor : "white", //colors.primaryLight,
              borderColor: BaseColor.whiteColor,
            },
          ]}
          onPress={() => {
            if (userId == sellerId) {
              Alert.alert(
                "Aviso",
                "No está permitido agregar sus propios productos al listado de favoritos",
                [
                  {
                    text: "Aceptar",
                    onPress: () => {},
                  },
                ]
              );
              return;
            }
            setIsFavourtie(!isFavourite);

            if (!isFavourite) {
              onAddFavorite();
            } else {
              onDeleteFavorite();
            }
          }}
        >
          <Icon
            solid
            name="heart"
            size={20}
            color={isFavourite ? "#DC5F3B" : "gray"}
            borderColor="green"
          />
        </TouchableOpacity>
      </Animated.View>
      {/* <Animated.View style={[styles.headerStyle, { position: "absolute" }]}>
        <SafeAreaView
          style={{ width: "100%" }}
          forceInset={{ top: "always", bottom: "never" }}
        >
          <Header
            title=""
            renderLeft={true}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                      // tintColor: "#229B6C",
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => {
              console.log(item);
              navigation.navigate("EShared", {
                quryId: item.sku,
                arrImg: [image[indexImage]],
              });
            }}
          />
        </SafeAreaView>
      </Animated.View> */}
    </View>
  );
};

export default ProductDetail;
