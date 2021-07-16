import Icon from "@components/Icon";
import Tag from "@components/Tag";
import Text from "@components/Text";
import { Images, useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import styles from "./styles";
import FormCounterSelectH from "@components/Form/CounterSelectH";
import { useSelector, useDispatch, useStore } from "react-redux";
import { addProductfavoriteService, deletefavoriteService } from "@services";
import Swipeable from "react-native-gesture-handler/Swipeable";

let row = new Array();
let prevOpenedRow;

const List4 = ({
  userId,
  idProduct,
  description,
  title,
  style,
  image,
  salePrice,
  onPress,
  salePercent,
  onDelete,
  isFav,
  onSwipeableOpen,
  index,
}) => {
  const { colors } = useTheme();
  const [isFavourite, setIsFavourtie] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const onAddFavorite = () => {
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


  return (
    <Swipeable
      key={idProduct}
      renderRightActions={rightSwipe}
      ref={ref => row[index] = ref}
      onSwipeableOpen={closeRow(index)}
    >
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}
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
            width: "60%",
            height: 120,
            justifyContent: "space-between",
            marginLeft: "0.8%",
          }}
        >
          <Text
            numberOfLines={2}
            style={{ fontWeight: "400", fontSize: 16, marginTop: 2 }}
          >
            {title}
          </Text>
          <View style={styles.viewText1}>
            <Text
              numberOfLines={2}
              style={{ fontWeight: "400", fontSize: 12, color: "#9B9998" }}
            >
              {description}
            </Text>
          </View>

          <View>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              {"S/." + salePrice}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

List4.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
  onChange: PropTypes.func,
};

List4.defaultProps = {
  description: "",
  title: "",
  style: {},
  image: Images.eProduct,
  costPrice: "",
  salePrice: "",
  salePercent: "",
  onPress: () => { },
  isFavorite: false,
  onChange: () => { },
};

export default List4;
