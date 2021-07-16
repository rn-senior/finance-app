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
    justifyContent: "space-around",
    // alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginVertical: 6,
    marginHorizontal: 10,
  },
  viewIcon: {
    position: "absolute",
    left: 30,
    top: 18,
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
