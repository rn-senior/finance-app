import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    // marginTop: 10,
    padding: 10,
    width: "100%",
  },
  contain: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2FB573",
    fontStyle: "italic",
  },
  content: {
    flex: 0.4,
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
  },
  title: {
    width: "60%",
    textAlign: "center",
    // marginVertical: 25,
    marginVertical: "7%",
  },
  firstButton: {
    height: 48,
    // height: "14%",
    borderRadius: 50,
    width: "80%",
    marginTop: 15,
    marginBottom: 30,
  },
});
