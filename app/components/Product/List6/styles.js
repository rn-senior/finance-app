import * as Utils from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 15,
    borderRadius: 20,
    // backgroundColor: "#fff",
    marginBottom: 10,
    /* borderColor: "#9B9998",
    backgroundColor: "#9B9998", */
  },
  contain2: {
    flexDirection: "row",
    paddingVertical: 5,
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
  viewText1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  contentLeft: {
    flex: 7,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  contentRight: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
