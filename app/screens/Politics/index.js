import { Button, Header, SafeAreaView, Text, TextInput } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { patchAsync } from "../../services/ConnectApi";

const Politics = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const profile = route.params?.user;
  const [politics, setPolitics] = useState(profile.disclaimer);
  const [loading, setLoading] = useState(false);

  const enviarPoliticas = () => {
    const body = {
      id: profile.id,
      disclaimer: politics,
    };
    patchAsync(
      "/usuarios",
      {
        onSuccess: (response) => {
          setLoading(false);
          navigation.goBack();
        },
        onError: (error) => {
          setLoading(false);
          Alert.alert("Error", "No se puedieron guardar los cambios");
        },
        data: body,
      },
      null
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <View style={{ flex: 1 }}>
        <Header
          title={t("Políticas y responsabilidades")}
          styleContentCenter={{ flex: 3 }}
          renderLeft={true}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <View style={styles.contentTitle}>
              <Text semibold style={{ fontSize: 16 }}>
                {
                  "Agrega tus politicas y responsabilidades que el comprador debe tener en cuenta al comprar productos de tu catálogo"
                }
              </Text>
            </View>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  backgroundColor: colors.backgroundContain,
                  height: 400,
                },
              ]}
              onChangeText={(text) => setPolitics(text)}
              multiline={true}
              autoCorrect={false}
              placeholder={""}
              placeholderTextColor={BaseColor.grayColor}
              value={politics}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            style={{ alignSelf: "center" }}
            loading={loading}
            onPress={() => {
              setLoading(true);
              enviarPoliticas();
            }}
          >
            {t("Guardar")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Politics;
