import { Icon, Tag, Image, Text } from "@components";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Share,
  Alert,
} from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";
import { useSelector, useDispatch, useStore } from "react-redux";
import { addProductfavoriteService, deletefavoriteService } from "@services";

const List2 = ({
  description,
  description2,
  description3,
  title,
  style,
  image,
  salePrice,
  onPress,
  salePercent,
  isFavorite,
  onChangeCount,
  appearIcon,
  increment,
  decrement,
  idProduct,
  userId,
  sellerId,
  cantidad,
  counter,
  onLongPress,
  clear,
}) => {
  const [isFavourite, setIsFavourtie] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const dispatch = useDispatch();
  const { colors } = useTheme();

  const onAddFavorite = () => {
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
    dispatch(
      addProductfavoriteService({
        userId: userId,
        idProduct: idProduct,
      })
    );
    setIsDisabled(true);
    setTimeout(() => {
      setIsFavourtie(true);
      setIsDisabled(false);
    }, 1500);
  };

  const onDeleteFavorite = () => {
    dispatch(
      deletefavoriteService({
        userId: userId,
        idProduct: idProduct,
        idCatalog: null,
      })
    );
    setIsDisabled(true);
    setTimeout(() => {
      setIsFavourtie(false);
      setIsDisabled(false);
    }, 1500);
  };

  useEffect(() => {
    setIsFavourtie(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    setIsClear(!clear);
  }, [clear]);

  const renderIcon = () => {
    return (
      <TouchableOpacity
        style={{ position: "absolute", marginLeft: "80%", marginTop: "38%" }}
        onPress={() => (!isFavourite ? onAddFavorite() : onDeleteFavorite())}
        disabled={isDisabled}
      >
        <Icon
          name="heart"
          solid={isFavourite}
          size={19}
          color={colors.orangeColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
      onLongPress={onLongPress}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageWishlist}
        imageStyle={{ borderRadius: 4 }}
      >
        {salePercent ? (
          <Tag small style={styles.salePercentList}>
            {salePercent}
          </Tag>
        ) : null}
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "column",
          marginLeft: "0.8%",
          flex: 1,
          height: 120,
          paddingVertical: 2,
        }}
      >
        <Text numberOfLines={2} bold style={{ marginTop: 2 }}>
          {title}
        </Text>
        <View
          style={{
            flex: 1.5,
            justifyContent: description2 ? "space-around" : "center",
            marginVertical: 5,
          }}
        >
          <Text
            numberOfLines={1}
            caption1
            style={{
              color: "#595757",
              marginBottom: 2,
            }}
          >
            {description}
          </Text>
          {description2 ? (
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "400",
                fontSize: 12,
                marginBottom: 2,
                color:
                  description2 === "Elige tu color y tamaño"
                    ? "#0191CB"
                    : "black",
              }}
            >
              {description2}
            </Text>
          ) : null}
          {description3 ? (
            <Text
              numberOfLines={1}
              style={{ fontWeight: "400", fontSize: 12, marginTop: 2 }}
            >
              {description3}
            </Text>
          ) : null}
        </View>
        <View style={styles.viewText2}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>{salePrice}</Text>
        </View>
        {appearIcon ? renderIcon() : null}
      </View>
      <View>
        <FormCounterSelectH
          style={{
            padding: 0,
            justifyContent: "center",
          }}
          onChange={onChangeCount}
          cant={cantidad}
          onIncrement={increment}
          onDecrement={decrement}
          clear={isClear}
        />
      </View>
    </TouchableOpacity>
  );
};

List2.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
  onChangeCount: PropTypes.func,
  appearIcon: PropTypes.bool,
  description2: PropTypes.string,
  description3: PropTypes.string,
  descriptionStyle: PropTypes.string,
  cantidad: PropTypes.number,
  onShare: PropTypes.func,
  onLongPress: PropTypes.func,
  onPressArrowUp: PropTypes.func,
  onPressArrowDown: PropTypes.func,
  firts: PropTypes.bool,
  last: PropTypes.bool,
  share: PropTypes.bool,
  clear: PropTypes.bool,
};

List2.defaultProps = {
  description: "",
  title: "",
  style: {},
  image: Images.eProduct,
  costPrice: "",
  salePrice: "",
  salePercent: "",
  onPress: () => {},
  isFavorite: false,
  onChangeCount: () => {},
  appearIcon: false,
  description2: "",
  description3: "",
  descriptionStyle: "",
  onShare: () => {},
  onLongPress: () => {},
  onPressArrowUp: () => {},
  onPressArrowDown: () => {},
  firts: false,
  last: false,
  share: false,
  clear: false,
};

export default List2;
