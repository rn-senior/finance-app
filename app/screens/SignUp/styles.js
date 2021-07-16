import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    marginBottom: 20,
  },
  textInput: {
    height: 46,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },
  activityStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    opacity: 0.3,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // height: 80,
    // backgroundColor: "black",
    // opacity: 0.3,
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
  firstText: {
    color: "#747474",
    fontSize: 16,
    marginTop: 22,
  },
  otherText: {
    color: "#747474",
    fontSize: 16,
    marginTop: 26,
  },
  businessText: {
    color: "#747474",
    fontSize: 16,
  },
});
