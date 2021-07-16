import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    // height: 32,
    justifyContent: "center",
    marginBottom: 15,
  },
  contain: {
    alignItems: "center",
    padding: 20,
    // width: "100%",
    flex: 1,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
});
