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
  // viewText: {
  //   flexDirection: "row",
  //   flex: 1,
  //   alignItems: "center",
  // },
  // viewText1: {
  //   flex: 5,
  //   justifyContent: "space-between",
  //   marginVertical: 5,
  // },
  viewText2: {
    flexDirection: "column",
    flex: 0.5,
    justifyContent: "center",
    marginBottom: 2,
  },
  icon: {
    width: 25,
    height: 25,
  },
  contentPicker: {
    height: 80,
    width: 50,
    alignItems: "center",
  },
});
