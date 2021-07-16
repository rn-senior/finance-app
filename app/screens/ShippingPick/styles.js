import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import { useTheme } from "@config";

export default StyleSheet.create({
  inputItem: {
    flex: 5.0,
    paddingLeft: 8,
  },
  checkbox: {
    alignSelf: "center",
    width: 20,
    height: 20,
  },
  label: {
    margin: 8,
  },
  content: {
    marginVertical: 10,
    height: 50,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: "rgba(0,0,0, .2)",
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 3,
        shadowRadius: 3,
      },
    }),
    padding: 15,
  },
});
