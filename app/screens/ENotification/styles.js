import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: "black",
  },
  messageContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
