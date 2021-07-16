import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    contentLeft: {
        flex: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    thumb: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        backgroundColor: "#005492",
        alignItems: "center",
    },
    contentRight: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    viewIcon: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    viewText: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    imageBackground: {
        height: 30,
        width: 50,
        marginEnd: 10,
    },
});
