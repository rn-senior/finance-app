import Icon from "@components/Icon";
import Image from "@components/Image";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Alert, Animated } from "react-native";
import { useSelector, useDispatch, useStore } from "react-redux";
import { addCatalogfavoriteService, deletefavoriteService } from "@services";
import styles from "./styles";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function ProfileDetail2(props) {
  const { colors } = useTheme();
  const [isFavourite, setIsFavourtie] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const {
    style,
    styleLeft,
    styleRight,
    onPress,
    textFirst,
    textThird,
    icon,
    inicial,
    isFav,
    userId,
    idCatalog,
    onDelete,
    isSwipable,
    index,
  } = props;

  const first = textThird === undefined ? "" : textThird.substring(0, 3);
  const second = textThird === undefined ? "" : textThird.substring(3, 7);

  let row = new Array();
  let prevOpenedRow;

  const onAddFavorite = () => {
    if (userId == idCatalog) {
      Alert.alert(
        "Aviso",
        "No está permitido agregar su propio catálogo al listado de favoritos",
        [
          {
            text: "Aceptar",
            onPress: () => { },
          },
        ]
      );
      return;
    }
    dispatch(
      addCatalogfavoriteService({ userId: userId, idCatalog: idCatalog })
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
        idProduct: null,
        idCatalog: idCatalog,
      })
    );
    setIsDisabled(true);
    setTimeout(() => {
      setIsFavourtie(false);
      setIsDisabled(false);
    }, 1500);
  };

  useEffect(() => {
    setIsFavourtie(isFav);
  }, [isFav]);

  function closeRow(index) {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onDelete}>
        <View
          style={{
            width: 90,
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 6,
          }}
        >
          <Animated.Text
            style={{
              transform: [{ scale: scale }],
              color: "white",
              fontWeight: "600",
            }}
          >
            Eliminar
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderECart = () => {
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View
          style={{
            width: 45,
            height: 45,
            backgroundColor: "#fff",
            borderRadius: 21,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.secondBlueColor, fontSize: 17.6 }}>
            {inicial}
          </Text>
        </View>
        <View style={[styles.contentLeft, styleLeft]}>
          <Text numberOfLines={1} style={{ fontSize: 14, color: "#fff" }}>
            {textFirst}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                marginTop: 3,
                color: "#fff",
                fontSize: 16,
                marginRight: 10,
              }}
              numberOfLines={1}
              bold
            >
              {first + "-" + second}
            </Text>
          </View>
        </View>

        {icon && (
          <TouchableOpacity
            style={[styles.contentRight, styleRight]}
            onPress={() => {
              !isFavourite ? onAddFavorite() : onDeleteFavorite();
            }}
            disabled={isDisabled}
          >
            <Icon
              name="heart"
              size={18}
              solid={isFavourite}
              color={isFavourite ? "#fff" : "#fff"}
              enableRTL={true}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderFav = () => {
    return (
      <Swipeable
        renderRightActions={rightSwipe}
        ref={ref => row[index] = ref}
        onSwipeableOpen={closeRow(index)}
      >
        <TouchableOpacity
          style={[styles.contain, style]}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: "#fff",
              borderRadius: 21,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.secondBlueColor, fontSize: 17.6 }}>
              {inicial}
            </Text>
          </View>
          <View style={[styles.contentLeft, styleLeft]}>
            <Text numberOfLines={1} style={{ fontSize: 14, color: "#fff" }}>
              {textFirst}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  marginTop: 3,
                  color: "#fff",
                  fontSize: 16,
                  marginRight: 10,
                }}
                numberOfLines={1}
                bold
              >
                {/* {textThird} */}
                {first + "-" + second}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                {"Ir al catálogo"}
              </Text>
            </View>
          </View>

          {/* {icon && (
            <TouchableOpacity
              style={[styles.contentRight, styleRight]}
              onPress={() => {
                !isFavourite ? onAddFavorite() : onDeleteFavorite();
              }}
              disabled={isDisabled}
            >
              <Icon
                name="heart"
                size={18}
                solid={isFavourite}
                // color={BaseColor.grayColor}
                color={isFavourite ? "#DC5F3B" : "#0191CB"}

                enableRTL={true}
              />
            </TouchableOpacity>
          )} */}
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return isSwipable ? renderFav() : renderECart();
}

ProfileDetail2.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  inicial: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};

ProfileDetail2.defaultProps = {
  image: "",
  textFirst: "",
  textSecond: "",
  inicial: "",
  icon: true,
  point: "",
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => { },
};
