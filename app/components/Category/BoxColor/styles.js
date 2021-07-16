import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
  },
  numTarget: {
    fontSize: 32,
    marginLeft: 14,
    color: "white",
  },
  // imageBackground: {
  //   width: "50%",
  //   flexDirection: "column",
  // },
  secondTarget: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 12,
  },
  title: {
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 10,
    fontSize: 24,
    color: "white",
    // fontFamily: "Helvetica Neue",
  },
  title2: {
    marginTop: 10,
    marginLeft: 24,
    fontSize: 16,
    marginBottom: 4,
    color: "white",
    // fontFamily: "Helvetica Neue",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 35,
    fontFamily: "Helvetica Neue",
    color: "white",
  },
  viewIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    width: 29,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: BaseColor.whiteColor,
  },
});
