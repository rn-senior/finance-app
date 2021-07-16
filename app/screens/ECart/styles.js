import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: "rgba(0,0,0, .1)",
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  icon: {
    width: 20,
    height: 20,
  },
});
