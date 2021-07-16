import * as Utils from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },

  imageWishlist: {
    width: parseInt(Utils.scaleWithPixel(65)),
    height: parseInt(Utils.scaleWithPixel(65)),
    borderRadius: 4,
  },
  salePercentList: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  costPrice: {
    fontWeight: "600",
    textDecorationLine: "line-through",
    fontSize: 12,
    color: "#9B9998",
  },
  // viewText: {
  //   flexDirection: "row",
  //   flex: 1,
  //   alignItems: "center",
  // },
  viewText1: {
    flex: 1,
    justifyContent: "center",
  },
  viewText2: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 5,
  },
});
