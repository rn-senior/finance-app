import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    height: 32,
    justifyContent: "center",
  },
  contain: {
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    height: 56,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 20,
  },
  profileItem2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  follow: {
    minWidth: 80,
    height: 28,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  viewFollow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  icon: {
    width: 16,
    height: 18,
    marginLeft: 6,
    marginRight: 14,
  },
});
