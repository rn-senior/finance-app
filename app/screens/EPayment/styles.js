import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  inputItem: {
    flex: 5.5,
    paddingLeft: 10,
    marginHorizontal: "2%",
  },
  checkbox: {
    alignSelf: "center",
    width: 20,
    height: 20,
  },
  label: {
    margin: 8,
  },
  digiNumber: {
    flex: 6.5,
    marginLeft: 10,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    height: 160,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  rowText: {
    color: "#747474",
    marginVertical: 9,
    fontSize: 16,
    fontWeight: "600",
  },
  tarjets: {
    borderWidth: 2,
    width: 55,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  generalText: {
    color: "#747474",
    fontSize: 16,
    marginBottom: 8,
  },
});
