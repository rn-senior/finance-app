import {
  Button,
  ProductCard2,
  Icon,
  SafeAreaView,
  Text,
  Header,
  StatusLine,
  ShipperLine,
  AddressLine,
  CatalogoList2,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAsync } from "../../services/ConnectApi";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import * as Utils from "@utils";

const ETValidated = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { tx } = route.params;


  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1, backgroundColor: "#FFF" }}
      >
        <Header
          title={""}
          renderRight={() => {
            return (
              <Image source={Images.like} style={{ width: 20, height: 20 }} />
            );
          }}
          onPressRight={() => {
            navigation.goBack()
          }}
          style={{ backgroundColor: "#fff" }}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[styles.headerView, { borderBottomColor: colors.border }]}
          >


            <Image
              source={Images.check}
              style={{ width: 40, height: 40, marginTop: 100, marginBottom: 30 }}
            />

            <Text style={{ marginBottom: 10, fontSize: 28, fontWeight: "700" }}>
              Pedido Validado
            </Text>
            <Text style={{ marginVertical: 10 }}>¡Felicidades! Su pedido ha sido validado.</Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: "#EEECEC",
                width: 204,
                height: 37,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>
                PEDIDO <Text bold>{tx ? "#" + tx.id : "#000000"}</Text>
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
              <Icon solid name="circle" size={8} solid color={"#38BBDF"} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  numberOfLines={1}
                  solid
                  style={{ color: "#38BBDF", fontSize: 16, fontWeight: "700" }}
                >
                  {"VALIDADO"}
                </Text>
              </View>
            </View>

            <Button

              style={{ marginTop: 150, marginBottom: 20, marginHorizontal: 10 }}
              onPress={() => { navigation.goBack() }}
            >
              {"De acuerdo"}
            </Button>
          </View>


        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ETValidated;
