import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  containerView: {
    alignSelf: "center",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  contain: {
    flexDirection: "row",
    paddingVertical: 8,
    flex: 1,
  },
  thumb: { width: 48, height: 48, marginRight: 10, borderRadius: 24 },
  content: {
    flexDirection: "row",
    justifyContent: "center",
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  swipeContent: {
    width: 90,
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
