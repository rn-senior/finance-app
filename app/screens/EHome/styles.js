import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  paddingSrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  paddingFlatList: {
    paddingTop: 8,
  },
  viewStore: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  countryImg: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 2,
  },
  title: {
    color: "#2FB573",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
  },
  searchIcon: {
    width: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    flex: 1,
    height: "100%",
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  sellButton: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 2,
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 15,
    alignSelf: "center",
  },
  subtitle: {
    marginVertical: 2,
    fontSize: 22,
    fontWeight: "700",
  },
});
