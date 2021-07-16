import { BaseColor } from "@config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FF551E",
    height: 70,
  },
  contentLeft: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 20,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 30,
  },
  contentRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 9,
    bottom: 0,
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
  icon: {
    width: 20,
    height: 20,
  },
});
