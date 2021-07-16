import * as Utils from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },

    imageWishlist: {
        width: Utils.scaleWithPixel(120),
        height: Utils.scaleWithPixel(120),
        borderRadius: 8,
    },
    salePercentList: {
        position: "absolute",
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingBottom: 2,
    },
    costPrice: {
        //paddingHorizontal: 8, 
        paddingVertical: 1,
        textDecorationLine: "line-through"
    },
    viewText: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        paddingVertical: 10
    },
});
