import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: BaseColor.whiteColor,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  followLocationIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BaseColor.whiteColor,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabbar: {
    backgroundColor: BaseColor.whiteColor,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
    padding: 0,
    paddingHorizontal: 20,
    // borderBottomWidth: 0,
  },
  tab: {
    // width: 120,
    width: "auto",
    padding: 4,
    // borderBottomWidth: 0,
  },
});
