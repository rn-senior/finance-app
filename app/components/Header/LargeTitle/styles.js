import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    // paddingHorizontal: 20,
  },
  viewStore: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
    paddingHorizontal: 4,
  },
  countryImg: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 2,
  },
  badge: {
    width: 11,
    height: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
    position: "absolute",
    // right: -3,
    // top: -2,
    right: 0,
    top: 0,
  },
});
