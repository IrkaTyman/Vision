import { StyleSheet } from "react-native";

export const _iconContainer = (
  size: number,
  checked: boolean,
  fillColor: string,
  unfillColor: string,
) => {
  return {
    width: size,
    height: size,
    borderWidth: 1,
    borderColor: fillColor,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: checked ? fillColor : unfillColor,
  };
};
export const _textStyle = (checked: boolean) => {
  return {
    fontSize: 16,
    color: "#757575",
    textDecorationLine: checked ? "line-through" : "none",
  };
};
export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  textContainer: {
    marginLeft: 16,
  },
});
