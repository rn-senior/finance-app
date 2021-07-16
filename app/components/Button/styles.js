import { StyleSheet } from "react-native";
import { BaseColor, Typography, FontWeight } from "@config";

export default StyleSheet.create({
  default: {
    height: 48,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: 280,
  },
  textDefault: {
    ...Typography.buttonText,
    color: BaseColor.whiteColor,
    fontWeight: FontWeight.semibold,
  },
  outline: {
    borderWidth: 1,
  },

  full: {
    width: "100%",
    // width: 280,
    alignSelf: "auto",
  },
  round: {
    borderRadius: 50,
  },
});
