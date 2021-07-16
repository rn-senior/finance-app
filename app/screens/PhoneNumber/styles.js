import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 65,
    padding: 10,
    width: "100%",
  },
  container: {
    height: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#96F1F9",
  },
  progressBar: {
    flexDirection: "row",
    height: 4,
    width: "100%",
  },
});
