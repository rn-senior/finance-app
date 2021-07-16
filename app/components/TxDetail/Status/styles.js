import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    flexDirection: "row",
    paddingVertical: 10,
    height: 80,
  },
  contain2: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  contentLeft: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  contentRight: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  viewIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  viewText: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  imageBackground: {
    // height: 335,
    height: 20,
    width: 20,
  },
});
