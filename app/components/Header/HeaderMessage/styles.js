import React from "react";
import { StyleSheet, I18nManager } from "react-native";
import { BaseStyle } from "@config";

export default StyleSheet.create({
  contain: {
    height: 53,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEECEC",
  },
  // contentLeft: {
  //   flex: 1,
  //   justifyContent: "center",
  //   paddingHorizontal: 20,
  //   width: 60,
  // },
  thumb: { width: 40, height: 40, borderRadius: 20 },
  left: {
    flex: 1.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contentLeft: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 5,
    height: "100%",
  },
  contentLeftSecond: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    height: "100%",
  },
  contentCenter: {
    flex: 1.9,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  contentRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 20,
    height: "100%",
  },
  contentRightSecond: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
  },
  right: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
