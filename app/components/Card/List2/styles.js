import { StyleSheet } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  contentRate: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: Utils.scaleWithPixel(70),
    height: Utils.scaleWithPixel(70),
    borderRadius: 8,
  },
});
