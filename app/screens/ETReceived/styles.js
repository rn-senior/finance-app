import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    headerView: {
        // marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    viewCart: {
        width: Utils.scaleWithPixel(33.33),
        height: Utils.scaleWithPixel(33.33),
        borderRadius: Utils.scaleWithPixel(90 / 2),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    profileItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 20,
        paddingTop: 20,
    },
    separator: {
        height: 0.5,
        backgroundColor: "#CDCACA",
        width: "90%",
        margin: 0,
        padding: 0,
        marginTop: 17,
    },
});
