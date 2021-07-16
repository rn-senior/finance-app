import { StyleSheet } from "react-native";

export default StyleSheet.create({
  profileImage: {
    position: "absolute",
    zIndex: 100,
  },
  inicialsContainer: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  namesContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
  },
  name: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    borderTopColor: "#EEECEC",
    borderTopWidth: 1,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
});
