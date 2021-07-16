import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
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
    marginVertical: 20,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
    paddingTop: 20,
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(17),
    height: Utils.scaleWithPixel(17),
    alignItems: "center",
    borderRadius: 4,

  },
});
