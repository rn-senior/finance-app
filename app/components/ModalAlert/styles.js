import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: "70%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    // padding: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "gray",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "100%",
    // marginTop: 40,
  },
  confirmButton: {
    borderRadius: 5,
    margin: 5,
    padding: 5,
    elevation: 2,
    width: "45%",
    // marginTop: 40,
  },
  cancelButton: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    elevation: 2,
    width: "45%",
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 15,
  },
  okStyle: {
    color: "green",
    textAlign: "center",
    fontSize: 20,
  },
  confirmStyle: {
    color: BaseColor.green1,
    textAlign: "center",
    fontSize: 20,
  },
  errorStyle: {
    color: BaseColor.red2,
    textAlign: "center",
    fontSize: 20,
  },
  iconError: {
    color: BaseColor.red2,
    textAlign: "center",
    fontSize: 45,
  },
  iconSuccess: {
    color: BaseColor.green1,
    textAlign: "center",
    fontSize: 45,
  },
  title: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    width: "100%",
    height: 0.5,
    backgroundColor: "black",
    marginVertical: 10,
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
