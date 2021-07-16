import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  inputItem: {
    flex: 5.0,
    paddingLeft: 8,
  },
  checkbox: {
    alignSelf: "center",
    width: 20,
    height: 20,
  },
  label: {
    margin: 8,
  },
  buttonContainer: {
    width: "100%",
    height: 160,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
