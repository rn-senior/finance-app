import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    padding: 25,
    paddingTop: 0,
    flex: 1,
  },
  contentActionBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    alignSelf: "center",
    marginTop: 36,
    fontWeight: "bold",
    borderRadius: 50,
    width: "80%",
    height: 48,
  },
});
