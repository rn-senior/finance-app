import { Button, Header, Icon, SafeAreaView, TextInput } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

const successInit = {
  email: true,
};
const ResetPassword = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onReset = () => {
    if (email == "") {
      setSuccess({
        ...success,
        email: false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("SignIn");
      }, 500);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={"Reestablecer correo"}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            padding: 20,
            width: "100%",
          }}
        >
          <TextInput
            style={[
              BaseStyle.textInput,
              {
                marginTop: "20%",
                marginBottom: "10%",
                borderBottomWidth: 2,
                borderColor: colors.primaryBlueColor,
              },
            ]}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            autoCorrect={false}
            placeholder={"Correo electrónico"}
            placeholderTextColor={
              success.email ? BaseColor.grayColor : colors.primary
            }
            value={email}
            selectionColor={colors.primary}
          />
          <View style={{ width: "100%", alignItems: "center" }}>
            <Button
              style={{ marginTop: "6%" }}
              onPress={() => {
                onReset();
              }}
              loading={loading}
            >
              {t("reset_password")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
