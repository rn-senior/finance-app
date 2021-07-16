import * as Utils from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
    textDecorationLine: "line-through",
    fontSize: 12,
    color: "#9B9998",
  },
  viewText: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
