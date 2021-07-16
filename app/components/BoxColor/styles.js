import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  imageBackground: {
    backgroundColor: "#FF8A65",
    height: 110,
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    fontFamily: "Helvetica Neue",
  },
  title: {
    marginVertical: 6,
    marginHorizontal: 10,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 35,
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
