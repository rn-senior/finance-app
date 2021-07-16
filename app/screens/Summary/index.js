import {
    Button,
    ProductCard2,
    Icon,
    SafeAreaView,
    Text,
    Header,
    StatusLine,
    ShipperLine,
    PaymentLine,
    AddressLine,
    CatalogoList2,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { Products } from "@data/eConfirmed";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAsync, postAsync } from "../../services/ConnectApi";
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
import { URLS3 } from "../../utils/environment";
import { Alert } from "react-native";


export default function Summary({ route, navigation }) {
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();
    const [bankName, setBankName] = useState("");
    const [loading, setLoading] = useState(true);
    const {
        userData,
        numProducts,
        ttlPrice,
        status,
        adressChoosed,
        idTx,
        date,
        payment,
        paymethodChoosed,
        selectProducts,
        id,
        paymentEntry,
        tiempoEntrega,
        body,

    } = route.params;
    const [txDetail, setTxDetail] = useState([]);

    const styleItem1 = {
        ...styles.profileItem,
        borderBottomColor: colors.border,
        width: "100%",
    };

    const styleItem2 = {
        ...styles.profileItem,
        borderBottomColor: colors.border,
        width: "100%",
        marginBottom: 40,
    };

    const [success] = useState({
        bankName: true,
    });

    /**
     *
     * Called when process checkout
     */

    useEffect(() => {
        console.log(userData)
    }, []);

    const countDecimals = (value) => {
        if (Math.floor(value) !== value)
            return value.toString().split(".")[1].length || 0;
        return 0;
    }

    const onCheckOut = () => {
        Alert.alert("Confirmación", "¿Está seguro de continuar con el pago?", [
            { text: "Cancel", onPress: () => { }, style: "cancel" },
            {
                text: "Continuar",
                onPress: () => {
                    updateTransaction(body);
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                },
            },
        ]);
    };

    const updateTransaction = (body) => {
        body.usuario_id = id;
        postAsync(
            "/updatetransaction",
            {
                onSuccess: (response) => {
                    navigation.navigate("Confirmed", {
                        userData: userData,
                        numProducts: numProducts,
                        ttlPrice: response[0].precioTotal, //cambiar con comisiones
                        status: response[0].estadoTransaccion,
                        adressChoosed: adressChoosed,
                        idTx: response[0].id,
                        date: response[0].fechaCreacion,
                        payment: paymethodChoosed,
                    });
                },
                onError: (error) => {
                    console.log(error);
                },
                data: body, // id:Session.user.id,
            },
            null
        );
    };

    const formatDate = () => {
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
        var dateString = new Date();
        return (
            "" +
            dateString.getDate() +
            " " +
            MESES[dateString.getMonth()] +
            " " +
            dateString.getFullYear()
        );
    };

    const formatQuryID = (qid) => {
        qid ? null : (qid = "ABC123456");
        return `${qid.slice(0, 3)}-${qid.slice(3, 7)}-${qid.slice(7, 9)}`;
    };

    return (
        <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "height" : "padding"}
                style={{ flex: 1, backgroundColor: "#F6F5F5" }}
            >
                <Header
                    title={"Resumen de Compra"}
                    renderLeft={true}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    style={{ backgroundColor: colors.background, }}
                />

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >


                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#fff",
                                width: "94%",
                                marginHorizontal: 16,
                                marginTop: 16,
                                borderRadius: 4,
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    paddingHorizontal: 16,
                                    alignItems: "center",
                                }}
                            >


                                <View style={{ alignSelf: "flex-start" }}>
                                    <View style={{ width: "100%", flexDirection: "row", margin: 5, marginTop: 15, }}>
                                        <Text
                                            bold
                                            style={{
                                                fontSize: 17,
                                                flex: 2,

                                            }}
                                        >
                                            Productos
                                        </Text>
                                        <Text style={{ flex: 1, textAlign: "center", }}>{"Cant."}</Text>
                                        <Text style={{ flex: 1, fontSize: 14, textAlign: "center", }}>{"Precio"}</Text>
                                    </View>

                                    <View style={{ alignSelf: "flex-start" }}>
                                        {selectProducts.map((item, index) => (
                                            <View key={index.toString()} style={{ width: "100%", flexDirection: "row", margin: 5, paddingRight: 5 }}>
                                                <Text style={{ flex: 2, textAlign: "left", }}>{item.description}</Text>
                                                <Text style={{ flex: 1, textAlign: "center", }}>{item.cantidad}</Text>
                                                <Text style={{ flex: 1, fontSize: 14, textAlign: "right" }}>{"S/ " + (item.cantidad * item.price).toFixed(2)}</Text>
                                            </View>
                                        ))}
                                        <View style={{ width: "100%", flexDirection: "row", margin: 5, paddingRight: 5 }}>
                                            <Text style={{ flex: 3, textAlign: "left", }}>{"Comisión qury"}</Text>
                                            <Text style={{ flex: 1, fontSize: 14, textAlign: "right", }}>{"S/ " + (ttlPrice * 0.05).toFixed(2)}</Text>

                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", margin: 5, paddingRight: 5 }}>
                                            <Text bold style={{ flex: 3, textAlign: "left", }}>{"TOTAL"}</Text>
                                            <Text bold style={{ flex: 1, fontSize: 14, textAlign: "right", }}>{"S/ " + (ttlPrice * 1.05).toFixed(2)}</Text>

                                        </View>
                                    </View>
                                </View>
                                {/* <View
                                    style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#EEECEC",
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                /> */}
                                {/* <StatusLine
                                    title={"Precio qury"}
                                    price={"S/ " + ttlPrice}
                                    date={formatDate()}
                                    color={"#000"}
                                // style={{ padding: 20 }}
                                /> */}

                                <View
                                    style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#EEECEC",
                                        marginVertical: 10,
                                    }}
                                />
                                <PaymentLine index={2} paymethod={payment} />
                                <View
                                    style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#EEECEC",
                                        marginVertical: 10,
                                    }}
                                />
                                <AddressLine
                                    title={"Lugar de entrega"}
                                    address={adressChoosed ? adressChoosed : "S/N"}
                                />
                                <View
                                    style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#EEECEC",
                                        marginBottom: 10,
                                    }}
                                />



                            </View>

                        </View>
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                    <Button
                        full
                        onPress={() => {
                            onCheckOut();
                        }}
                    >
                        {"Confirmar compra"}
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
