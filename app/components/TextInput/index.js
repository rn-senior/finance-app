import { BaseColor, BaseStyle, useFont, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { I18nManager, TextInput, View } from "react-native";

export default function Index(props) {
  const font = useFont();
  const { colors } = useTheme();
  const cardColor = colors.card;
  const {
    style,
    onChangeText,
    onChange,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    textContentType,
    defaultValue,
    ref,
    onKeyPress,
    ...attrs
  } = props;
  return (
    <View style={[BaseStyle.textInput, { backgroundColor: cardColor }, style]}>
      <TextInput
        style={{
          fontFamily: `${font}-Regular`,
          flex: 1,
          height: "100%",
          textAlign: I18nManager.isRTL ? "right" : "auto",
          color: colors.text,
          paddingTop: 5,
          paddingBottom: 5,
        }}
        // onChange={(text) => {
        //   onChange({ type, text });
        // }}
        textAlignVertical={textAlignVertical}
        onChangeText={onChangeText}
        onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={success ? BaseColor.grayColor : colors.primary}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        textContentType={textContentType}
        defaultValue={defaultValue}
        ref={ref}
        onKeyPress={onKeyPress}
        {...attrs}
      />
      {icon}
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  textContentType: PropTypes.string,
  ref: PropTypes.string,
  defaultValue: PropTypes.string,
  onKeyPress: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  onChangeText: (text) => {},
  onFocus: () => {},
  placeholder: "Placeholder",
  value: "",
  success: true,
  secureTextEntry: false,
  keyboardType: "default",
  autoCapitalize: "none",
  multiline: false,
  textAlignVertical: "center",
  icon: null,
  onSubmitEditing: () => {},
  textContentType: "none",
  defaultValue: "",
  onKeyPress: () => {},
  onChange: (text) => {},
};
