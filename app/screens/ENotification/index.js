import {
  ListThumbCircle,
  SafeAreaView,
  Text,
  Header,
  Icon,
  AlertView,
} from "@components";
import { BaseStyle, useTheme, Images, BaseColor } from "@config";
import React, { useEffect, useState, Fragment, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View } from "react-native";
import { useSelector } from "react-redux";
import { getAsync, patchAsync } from "../../services/ConnectApi";
import ContentLoader, { Rect } from "react-content-loader/native";
import styles from "./styles";
import Spinner from "react-native-loading-spinner-overlay";

const ENotification = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [notification, setNotification] = useState({});
  const [trays, setTrays] = useState([]);
  const userId = useSelector((state) => state.auth.login.success.profile.id);
  const [spinner, setSpinner] = useState(false);

  let row = new Array();
  let prevOpenedRow;
  let swipedCardRef = useRef(null);

  const onOpen = (ref) => {
    if (swipedCardRef) swipedCardRef.current.close();
    swipedCardRef = ref;
  };
  const onClose = (ref) => {
    if (ref == swipedCardRef) {
      swipedCardRef = null;
    }
  };

  const listTrays = () => {
    getAsync(
      "/tray?usuario_id=" + userId,
      {
        onSuccess: (response) => {
          setTrays(response.reverse());
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
        }, // id:Session.user.id,
      },
      null
    );
  };

  const desactiveTray = (body) => {
    patchAsync(
      "/tray",
      {
        onSuccess: (response) => {},
        onError: (error) => {}, // id:Session.user.id,
        data: body,
      },
      null
    );
  };

  useEffect(() => {
    listTrays();
  }, []);

  const deleteNotification = (index) => {
    const arr = [...trays];
    arr.splice(index, 1);
    setTrays(arr);
    setTimeout(() => {
      setSpinner(false);
    }, 500);
  };

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

  const formatHour = (hour) => {
    var hourString = new Date(hour);
    let minutosString = hourString.getMinutes().toString();
    let minutos =
      minutosString.length < 2
        ? "0" + hourString.getMinutes()
        : hourString.getMinutes();
    return "" + hourString.getHours() + ":" + minutos + " ";
  };

  const renderPlaceholder = () => {
    let holders = Array.from(Array(10));
    let y = 0;
    let height = 50;

    return (
      <View style={BaseStyle.container}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          {holders.map((item, index) => {
            y = index == 0 ? 0 : y + height + 20;
            return (
              <Fragment key={index}>
                <Rect x="5" y={y} rx="25" ry="25" width="50" height={height} />
                <Rect x="75" y={y + 10} rx="8" ry="8" width="40%" height={10} />
                <Rect x="75" y={y + 30} rx="8" ry="8" width="80%" height={10} />
              </Fragment>
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "700",
          }}
        >
          No hay notificaciones
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <ListThumbCircle
        id={item.id}
        index={index}
        style={{ backgroundColor: "#fff" }}
        image={Images.splash}
        txtLeftTitle={"Mensaje qury"}
        txtContent={item.texto}
        txtRight={
          formatDate(item.fechaCreacion) + formatHour(item.fechaCreacion)
        }
        onPress={() => {
          if (item.leido != 1) {
            desactiveTray({ id: item.id, leido: 1 });
            item.leido = 1;
          }
          setNotification(item);
          setAlertVisible(true);
        }}
        viewed={item.leido == 1 ? true : false}
        onDelete={() => {
          setSpinner(true);
          deleteNotification(index);
          desactiveTray({ id: item.id, estado: "0" });
        }}
        // onSwipeableOpen={() => {
        //   if (prevOpenedRow && prevOpenedRow !== row[index]) {
        //     prevOpenedRow.close();
        //   }
        //   prevOpenedRow = row[index];
        // }}
      />
    );
  };

  const getItemLayout = (data, index) => {
    return { length: 64, offset: 64 * index, index };
  };

  const separatorComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: colors.border,
          marginLeft: "5%",
        }}
      />
    );
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        {alertVisible ? (
          <AlertView
            title={"Mensaje qury"}
            message={notification.texto}
            onPressOk={() => {
              console.log("PRESS");
              setAlertVisible(false);
            }}
          />
        ) : null}
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingRight: 20, paddingLeft: 15 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            // getItemLayout={getItemLayout}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {
                  listTrays();
                }}
              />
            }
            data={trays}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={separatorComponent}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: "always" }}
    >
      <Spinner visible={spinner} />
      <Header
        title={"Notificaciones"}
        renderLeft={true}
        onPressLeft={() => navigation.goBack()}
      />
      {loading
        ? renderPlaceholder()
        : trays.length > 0
        ? renderContent()
        : renderMessage()}
    </SafeAreaView>
  );
};

export default ENotification;
