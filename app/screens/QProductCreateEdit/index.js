import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ProductMetadata,
  ProductSpecGrid,
  ModalAlert,
} from "@components";

import { BaseColor, BaseStyle, useTheme, Images } from "@config";

import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Animated,
  TouchableOpacity,
  I18nManager,
  Alert,
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
//import { SetProductService } from "@services";
import { postAsync, patchAsync, deleteAsync } from "../../services/ConnectApi";
import { ProductService } from "@services";
import { useSelector, useStore } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
//import { getDocument } from "@utils";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

import uploadImageToS3 from "../../utils/uploadImageS3";
import Storage from "@aws-amplify/storage";

import Share from "react-native-share";
import { captureRef } from "react-native-view-shot";

import Swiper from "react-native-swiper";
import * as Utils from "@utils";
import { URLS3 } from "../../utils/environment";
import Clipboard from "@react-native-clipboard/clipboard";
import ImageResizer from "react-native-image-resizer";
// import { stat } from "react-native-fs";

const QProductCreateEdit = (props) => {
  const isFocused = useIsFocused();
  const { navigation, route } = props;
  let { item } = route.params;
  !item
    ? (item = { id: "", description: "", price: "", state: "", activo: "1" })
    : null;
  const { t } = useTranslation();
  const { colors } = useTheme();
  //State Products
  const [description, setDescription] = useState(item.descripcion);
  const [price, setPrice] = useState(item.precio);
  const [state, setState] = useState(item.estado);
  const [name, setName] = useState(item.nombre);
  const [metadata, setMetadata] = useState(item.metadata ? item.metadata : {});
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());

  const [image, setImage] = useState(item.imagen1 ? item.imagen1 : "");
  const [image1, setImage1] = useState(item.imagen2 ? item.imagen2 : "");
  const [image2, setImage2] = useState(item.imagen3 ? item.imagen3 : "");
  const [loading, setLoading] = useState(false);
  //items metadata(
  const [arrayImages, setArrayImages] = useState([image, image1, image2]);
  const [colorChoosed, setColorChoosed] = useState("");
  const [sizeChoosed, setSizeChoosed] = useState("");
  const [isFavourite, setIsFavourtie] = useState(false);
  const [color, setColor] = useState("");
  const [talla, setTalla] = useState("");
  const [images, setImages] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [imgSelect, setImgselect] = useState(
    URLS3 + arrayImages.filter((v) => v != null)[0]
  );
  const [copied, setCopied] = useState(false);
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [alertMsg, setAlertMsg] = useState(
    "Esta acción no se puede deshacer, está seguro desea continuar?"
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(item.active === "1" ? true : false);

  const store = useStore();
  const user = store.getState().auth.login.success.profile;

  const scrollY = useRef(new Animated.Value(0)).current;

  const [indexImageSelected, setIndexImageSelected] = useState(0);

  const onSelect = (indexSelected) => {};

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const viewRef = useRef();

  const handleBackButton = (e) => {
    if (!hasUnsavedChanges) {
      return;
    }
    e.preventDefault();
    Alert.alert(
      "Aviso",
      "Usted tiene cambios no guardados. ¿Estás seguro de descartar los y salir de la pantalla?",
      [
        { text: "No salir", style: "cancel", onPress: () => {} },
        {
          text: "Descartar",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
            navigation.dispatch(e.data.action);
          },
        },
      ]
    );
  };

  useEffect(() => {
    orderImages();
  }, []);

  useEffect(() => {
    orderImages();
  }, [arrayImages]);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      handleBackButton(e);
    });
  }, [hasUnsavedChanges]);

  const orderImages = () => {
    let newArray = [];
    let arr1 = [];

    arrayImages.forEach((item, index) => {
      if (item) {
        newArray.push({ id: index, image: item ? URLS3 + item : "" });
      }
    });

    while (newArray.length < 3) {
      newArray.push({ id: newArray.length, image: "" });
    }

    setImages(newArray);
  };
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerBackgroundCircleColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: ["#229B6C", "#fff"],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 350 - heightHeader - 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 450 - heightHeader],
    outputRange: [450, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const onSubmitProduct = () => {
    // if (true) {
    navigation.removeListener("beforeRemove", (e) => {
      handleBackButton(e);
    });
    setHasUnsavedChanges(false);
    setSpinner(true);
    if (item.id) {
      onEditProduct();
    } else {
      onCreateProduct();
    }
    // } else {
    //   Alert.alert("Aviso", "Debe subir 1 imagen como mínimo");
    // }
  };

  const onDeleteSize = (size) => {
    const i = metadata.tallas.indexOf(size);
    if (i != -1) {
      metadata.tallas.splice(i, 1);
      console.log("SE ELIMINO LA TALLA");
    } else {
      console.log("NO SE PUDO ELIMINAR LA TALLA");
    }
    setHasUnsavedChanges(true);
  };

  const validateAllImgNull = () => {
    // if (!item.id) {
    if (item.id) {
      if (arrayImages.filter((v) => v != "").length <= 0) {
        Alert.alert("Error", "Debe seleccionar una imagen como mínimo");
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  };

  const onShare = () => {
    navigation.navigate("EShared", {
      nombre: item.nombre,
      quryId: item.quryId,
      arrImg: [
        URLS3 + item.imagen1,
        URLS3 + item.imagen2,
        URLS3 + item.imagen3,
      ],
    });
  };
  const onDeleteImage = (index) => {
    //let imagen = images[index];
    let imagen = arrayImages[index];
    console.log("∫©©©©©©©©©©©© imagen a eliminar ©©©©©©©©©©©©∫");
    setSpinner(true);
    Storage.remove(imagen)
      .then(() => {
        if (index >= 0) {
          console.log("SE ELIMINO LA IMAGEN");
          arrayImages.splice(index, 1);
          images.splice(index, 1);
          if (imagen) {
            patchAsync(
              "/products",
              {
                onSuccess: (response) => {
                  orderImages();
                  setSpinner(false);
                  let arrimg = images.filter((v) => v.image != "");

                  setImgselect(
                    arrimg.length == 0 ? "" : arrimg.slice(-1).pop().image
                  );
                },
                onError: (error) => {},
                data: {
                  id: item.id,
                  imagen1: arrayImages[0] ? arrayImages[0] : "",
                  imagen2: arrayImages[1] ? arrayImages[1] : "",
                  imagen3: arrayImages[2] ? arrayImages[2] : "",
                }, // id:Session.user.id,
              },
              null
            );
            //let arr = arr1.filter((v) => v != null);
            //setImages()
          } else {
            setSpinner(false);
            Alert.alert(
              "Aviso",
              "No se puedo eliminar la imagen, intente más tarde.",
              [
                {
                  text: "Aceptar",
                  onPress: () => {
                    setSpinner(false);
                  },
                  style: "default",
                },
              ]
            );
            console.log("NO SE REESCRIBIO LA VARIABLE");
          }
        } else {
          setSpinner(false);
          console.log("NO SE PUDO ELIMINAR LA IMAGEN");
          Alert.alert(
            "Aviso",
            "No se puedo eliminar la imagen, intente más tarde.",
            [
              {
                text: "Aceptar",
                onPress: () => {
                  setSpinner(false);
                },
                style: "default",
              },
            ]
          );
        }
        //setHasUnsavedChanges(true);
      })
      .catch((err) => {
        console.log(err);

        Alert.alert(
          "Aviso",
          "No se puedo eliminar la imagen, intente más tarde.",
          [
            {
              text: "Aceptar",
              onPress: () => {
                setSpinner(false);
              },
              style: "default",
            },
          ]
        );
      });
  };

  const onDeleteColor = (color) => {
    const i = metadata.colores.indexOf(color);
    if (i != -1) {
      metadata.colores.splice(i, 1);
      console.log("SE ELIMINO EL COLOR");
    } else {
      console.log("NO SE PUDO ELIMINAR EL COLOR");
    }
    setHasUnsavedChanges(true);
  };

  // const updateIndex = useCallback((res) => {
  //   setTimeout(() => {
  //     setIndexImageSelected(res);
  //   }, 50);
  // }, []);

  const onEditProduct = () => {
    const body = {
      id: item.id,
      nombre: name,
      descripcion: description,
      precio: price,
      estado: state,
      metadata: metadata,
      activo: active ? "1" : "0",
      // imagen1: image ? image : null,
      // imagen2: image1 ? image1 : null,
      // imagen3: image2 ? image2 : null,
    };
    patchAsync(
      "/products",
      {
        onSuccess: (response) => {
          //dispatch(ProductService());
          validateAllImgNull();
          setSpinner(false);
        },
        onError: (error) => {
          setSpinner(false);
        },
        data: body, // id:Session.user.id,
      },
      null
    );
    console.log("on button action");
  };

  const onCreateProduct = () => {
    const body = {
      //id: item.id,
      nombre: name,
      descripcion: description,
      precio: price,
      estado: state,
      usuario_id: user.id,
      imagen1: image,
      imagen2: image1,
      imagen3: image2,
      tipo_id: 1,
      quryId: user.quryId,
      metadata: metadata,
    };
    postAsync(
      "/products",
      {
        onSuccess: (response) => {
          console.log(response);
          //dispatch(ProductService());
          validateAllImgNull();
          setSpinner(false);
          Alert.alert("Confirmación", "El producto se ha creado exitosamente");
        },
        onError: (error) => {
          setSpinner(false);
        },
        data: body, // id:Session.user.id,
      },
      null
    );
  };

  const onDeleteProduct = () => {
    patchAsync(
      "/products",
      {
        onSuccess: (response) => {
          setAlertDisplay(false);
          navigation.goBack();
        },
        onError: (error) => {
          setSpinner(false);
        },
        data: { id: item.id, estado: "0" },
      },
      null
    );
  };

  const deleteProduct = () => {
    Alert.alert("Confirmación", "Estás seguro de eliminar este producto?", [
      { text: "Cancelar", onPress: () => {}, style: "destructive" },
      {
        text: "Aceptar",
        onPress: () => {
          setSpinner(true);
          onDeleteProduct();
        },
        style: "default",
      },
    ]);
  };

  const inactivateProduct = () => {
    patchAsync(
      "/products",
      {
        onSuccess: (response) => {
          // navigation.goBack();
        },
        onError: (error) => {},
        data: { id: item.id, activo: "0" },
      },
      null
    );
  };

  const hanleChoosePhoto = () => {
    const options = {};
    let arrI = [];

    launchImageLibrary(options, async (response) => {
      // console.log(response);
      // const statResult = await stat(response.uri);
      // arrI.push({ id: 1, image: response.uri });
      // console.log(statResult);
      // setSpinner(true);

      ImageResizer.createResizedImage(
        response.uri,
        1000,
        1000,
        "JPEG",
        100,
        0,
        null
      )
        .then(async (resizedImageUri) => {
          uploadImages(resizedImageUri.path);
          // console.log(resizedImageUri);
          // const statResult2 = await stat(resizedImageUri.uri);
          // console.log(resizedImageUri);
          // arrI.push({
          //   id: 2,
          //   image: resizedImageUri.uri?.replace("file:///", "/"),
          // });
          // setImages(arrI);
          // console.log("file size after: " + statResult2.size);
          // console.log("file size after2: " + resizedImageUri);
          // console.log(arrI);
          // setImage(arrI[0] ? arrI[0] : "");
          // setImage1(arrI[1] ? arrI[1] : "");
          setSpinner(false);
        })
        .catch((err) => {
          setSpinner(false);
          console.log(err);
        });
    });
    setHasUnsavedChanges(true);
  };

  const uploadImages = (uri) => {
    setSpinner(true);
    // uploadImageToS3(Platform.OS == "ios" ? uri?.replace("file://", "/") : uri)
    uploadImageToS3(uri)
      .then((res) => {
        console.log(res);
        let img = res.key;
        setImgselect(URLS3 + img);
        let arr = arrayImages.filter((v) => v != "");
        let arr2 = [];

        if (item.id) {
          arr.push(img);
          setArrayImages(arr);
          patchAsync(
            "/products",
            {
              onSuccess: (res) => {
                setSpinner(false);
              },
              onError: (error) => {},
              data: {
                id: item.id,
                imagen1: arr[0] ? arr[0] : "",
                imagen2: arr[1] ? arr[1] : "",
                imagen3: arr[2] ? arr[2] : "",
              },
            },
            null
          );
        } else {
          arr.push(res.key);
          setImage(arr[0] ? arr[0] : "");
          setImage1(arr[1] ? arr[1] : "");
          setImage2(arr[2] ? arr[2] : "");
          setArrayImages(arr);
          setSpinner(false);
        }
      })
      .catch((err) => {
        setSpinner(false);
        console.log(err);
      });
  };
  const onTouchImage = (touched) => {
    if (touched == indexImageSelected) return;
    setImgselect(images[touched].image);
    console.log(images);
    setIndexImageSelected(touched);
  };

  const formatQuryId = (quryid) => {
    return (
      quryid.substring(0, 3) +
      "-" +
      quryid.substring(3, 7) +
      "-" +
      quryid.substring(7, 9)
    );
  };

  const renderContent2 = () => {
    return (
      <View style={styles.contain}>
        <Spinner visible={spinner} />

        {/* <View>
              <Image source={{ uri: image }} style={styles.thumb} />
            </View>
            <View>
              <Image source={{ uri: image1.uri }} style={styles.thumb} />
            </View> */}
        {/* <View>
          <Button onPress={hanleChoosePhoto}>Subir imagen</Button>

          </View> */}

        {item.quryId ? (
          <TouchableOpacity
            style={{ height: 40 }}
            onPress={() => {
              let qid = formatQuryId(item.quryId);
              Clipboard.setString(qid);
              const text = Clipboard.getString(qid);
              text.then((res) => {
                //alert("Codiado a portapapeles: " + qid);
                setCopied(true);
              });
              //shareImage();
            }}
          >
            <View
              style={{
                marginTop: 0,
                borderWidth: 2,
                borderColor: colors.orangeColor,
                backgroundColor: colors.orangeColor,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 8,
              }}
            >
              <Text headline semibold style={{ color: "white" }}>
                {"quryid: " + formatQuryId(item.quryId)}
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

        <View style={styles.contentTitle}>
          <Text headline semibold>
            {"Nombre"}
          </Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setHasUnsavedChanges(true);
            setName(text);
          }}
          autoCorrect={false}
          placeholder={""}
          placeholderTextColor={BaseColor.grayColor}
          value={name}
          selectionColor={colors.primary}
        />
        <View style={styles.contentTitle}>
          <Text headline semibold>
            {"Descripción"}
          </Text>
        </View>
        <TextInput
          style={styles.textAreaInput}
          onChangeText={(text) => {
            setHasUnsavedChanges(true);
            setDescription(text);
          }}
          autoCorrect={false}
          placeholder={""}
          placeholderTextColor={BaseColor.grayColor}
          value={description}
          selectionColor={colors.primary}
          multiline={true}
        />
        <View style={styles.contentTitle}>
          <Text headline semibold>
            {"Precio"}
          </Text>
        </View>
        <TextInput
          style={styles.textInputPrice}
          onChangeText={(text) => {
            setHasUnsavedChanges(true);
            text = text.replace(/[A-Za-z]/g, "");
            setPrice(text);
          }}
          autoCorrect={false}
          placeholder={""}
          placeholderTextColor={BaseColor.grayColor}
          value={price}
        />
        {/* <View style={styles.contentTitle}>
          <CheckBox
            title={"Activo"}
            active={state == "1"}
            onPress={() => setState(state == "1" ? "0" : "1")}
          />
        </View> */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setActive(!active);
              setHasUnsavedChanges(true);
            }}
          >
            <Icon name={active ? "check-square" : "square"} size={20} />
            <Text style={{ marginLeft: 8, fontSize: 16 }}>
              {active ? "Activo" : "Inactivo"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.colorsSizeContent}>
          <View style={{ width: 95 }}>
            <Text body1>COLORES</Text>
          </View>
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => {
              text = text.replace(/[0-9]/g, "");
              setColor(text.toUpperCase());
            }}
            autoCorrect={false}
            placeholder={""}
            placeholderTextColor={BaseColor.grayColor}
            value={color}
            selectionColor={colors.primary}
          />
          <Button
            small
            onPress={() => {
              if (color.length > 0) {
                if (metadata.colores) {
                  metadata.colores.push(color);
                } else {
                  metadata.colores = [color];
                }
              } else {
                Alert.alert("Aviso", "No se pudo agregar la talla");
              }
              setColor("");
              setHasUnsavedChanges(true);
            }}
            style={styles.addButton}
            icon={<Icon solid name="plus" size={10} color={"white"} />}
          />
          {colorChoosed ? (
            <Button
              onPress={() => {
                onDeleteColor(colorChoosed);
                setColorChoosed("");
                setHasUnsavedChanges(true);
              }}
              style={styles.deleteButton}
              icon={<Icon solid name="minus" size={10} color={"white"} />}
            />
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
          }}
        >
          {metadata.colores && (
            <ProductMetadata
              sizes={metadata.colores}
              onPress={(color) => {
                setColorChoosed(color);
              }}
            />
          )}
        </View>

        <View style={styles.colorsSizeContent}>
          <View style={{ width: 95 }}>
            <Text body1>TAMAÑOS</Text>
          </View>
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => {
              setTalla(text.toUpperCase());
            }}
            autoCorrect={false}
            placeholder={""}
            placeholderTextColor={BaseColor.grayColor}
            value={talla}
            selectionColor={colors.primary}
          />
          <Button
            small
            onPress={() => {
              if (talla.length > 0) {
                if (metadata.tallas) {
                  metadata.tallas.push(talla);
                } else {
                  metadata.tallas = [talla];
                }
              } else {
                Alert.alert("Aviso", "No se pudo agregar la talla");
              }
              //item.metadata.tallas.push(talla);
              //setMetadata(item.metadata);
              setTalla("");
              setHasUnsavedChanges(true);
            }}
            style={styles.addButton}
            icon={<Icon solid name="plus" size={10} color={"white"} />}
          >
            {/* {" "} */}
          </Button>
          {sizeChoosed ? (
            <Button
              onPress={() => {
                onDeleteSize(sizeChoosed);
                setSizeChoosed("");
                setHasUnsavedChanges(true);
              }}
              style={styles.deleteButton}
              icon={<Icon solid name="minus" size={10} color={"white"} />}
            />
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
          }}
        >
          {metadata.tallas && (
            <ProductMetadata
              sizes={metadata.tallas}
              onPress={(size) => {
                setSizeChoosed(size);
              }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} ref={viewRef}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <View style={{ flex: 1 }}>
          <Header title={!item.id ? "Crear Producto" : "Editar Producto"} />
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
            {renderContent2()}
          </ScrollView>
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              loading={loading}
              icon={
                <Icon
                  name={"trash"}
                  size={18}
                  style={{ color: BaseColor.red1, marginHorizontal: 4 }}
                />
              }
              outline
              onPress={deleteProduct}
              style={{ flex: 0.2, borderColor: BaseColor.red1 }}
            >
              {t(" ")}
            </Button>
            <Button
              loading={loading}
              onPress={onSubmitProduct}
              style={{ flex: 0.7, backgroundColor: colors.primaryYellow }}
            >
              {"Guardar"}
            </Button>
          </View>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: imgSelect,
            }}
            style={{
              flex: 0.8,
              // width: "100%",
              // height: "100%",
              //justifyContent:"space-between" : "flex-end",
            }}
          >
            {arrayImages.filter((v) => v != "").length <= 0 ? (
              <View></View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.viewIcon,
                  {
                    backgroundColor: isFavourite
                      ? BaseColor.whiteColor
                      : "white", //colors.primaryLight,
                    borderColor: BaseColor.whiteColor,
                  },
                ]}
                onPress={() => {
                  onDeleteImage(indexImageSelected);
                }}
              >
                <Icon solid name="trash" size={20} borderColor="green" />
              </TouchableOpacity>
            )}
          </Image>

          <View
            style={{
              flex: 0.2,
              width: "100%",
              //alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            {images.map((item, key) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.image) {
                      onTouchImage(key.toString());
                    } else {
                      let arr = arrayImages.filter((v) => v != "");
                      arr.length >= 3
                        ? Alert.alert("Aviso", "Solo puedes agregar 3 imagenes")
                        : hanleChoosePhoto();
                    }
                  }}
                  activeOpacity={0.9}
                  key={key.toString()}
                >
                  {item.image ? (
                    <Image
                      key={key.toString()}
                      style={{
                        width: 70,
                        height: 70,
                        marginRight: 3,
                        borderRadius: 8,
                        borderColor:
                          key == indexImageSelected
                            ? colors.orangeColor
                            : BaseColor.grayColor,
                        borderWidth: 2,
                      }}
                      source={{ uri: item.image }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        marginRight: 3,
                        borderRadius: 8,
                        borderColor:
                          key == indexImageSelected
                            ? colors.primaryLight
                            : BaseColor.grayColor,
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        //flexDirection: "row",
                      }}
                    >
                      <Icon
                        name="plus"
                        size={20}
                        color={"green"}
                        enableRTL={true}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Animated.View>
      <Animated.View style={[styles.headerStyle, { position: "absolute" }]}>
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
            onPressLeft={validateAllImgNull}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
      <ModalAlert
        visible={alertDisplay}
        type={"confirm"}
        message={alertMsg}
        onPressOk={() => {
          onDeleteProduct();
        }}
        onPressCancel={() => {
          setAlertDisplay(false);
        }}
      />
    </View>
  );
};

export default QProductCreateEdit;
