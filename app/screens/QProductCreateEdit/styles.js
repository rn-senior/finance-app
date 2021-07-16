import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    height: 32,
    justifyContent: "center",
    marginTop: 5,
  },
  contain: {
    alignItems: "center",
    paddingTop: 0,
    paddingHorizontal: 20,
    width: "100%",
  },
  viewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: "rgba(0,0,0, .1)",
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: BaseColor.grayColor,
  },
  textAreaInput: {
    height: 90,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: BaseColor.grayColor,
  },
  textInputPrice: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "40%",
    color: BaseColor.grayColor,
    alignSelf: "flex-start",
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 0,
    marginBottom: 20,
  },
  textInput2: {
    height: 35,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 3,
    width: 120,
    marginLeft: 5,
    color: BaseColor.grayColor,
  },
  headerImageStyle: {
    // height: 250,
    width: "100%",
    top: 0,
    alignSelf: "center",
    position: "absolute",
    // zIndex: 999,
    paddingBottom: 0,
  },
  headerStyle: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // zIndex: 200
  },
  icon: {
    width: 20,
    height: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  colorsSizeContent: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  addButton: {
    width: 48,
    height: 30,
    margin: 3,
    marginLeft: 10,
  },
  deleteButton: {
    width: 48,
    height: 30,
    margin: 3,
    backgroundColor: "#C62105",
  },
});
