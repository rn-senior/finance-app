import { Header, Icon, Image, SafeAreaView, Text } from "@components";
import { BaseStyle, useTheme, Images } from "@config";
import React, { useState } from "react";
import { ScrollView, View, FlatList, ImageBackground } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const TermsAndConditions = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={"Términos y condiciones"}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        {/* <View>
          <Image source={Images.terms} style={{ width: "100%", height: 135 }} />
          <View
            style={[
              styles.titleAbout,
              { backgroundColor: colors.orangeColor, opacity: 0.7 },
            ]}
          >
            <Text title1 semibold whiteColor>
              {"Bienvenido a qury"}
            </Text>
          </View>
        </View> */}
        <ImageBackground
          source={Images.terms}
          style={{
            width: "100%",
            height: 160,
          }}
        >
          <View
            style={[
              styles.titleAbout,
              { backgroundColor: colors.orangeColor, opacity: 0.7 },
            ]}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text title1 semibold whiteColor>
              {"Bienvenido a qury"}
            </Text>
          </View>
        </ImageBackground>
        <View style={{ padding: 20 }}>
          {/* <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {"Bienvenido a qury"}
          </Text> */}
          <Text body2 style={{ marginTop: 5 }}>
            Somos una empresa que brinda el servicio de pagos custodiados para
            asegurar buenas prácticas comerciales. Para garantizar un correcto
            entendimiento entre usted (“El usuario”) y nosotros Quipucamayoc
            Technology S.A.C, conocido comercialmente como qury. Estas
            condiciones de uso constituyen un contrato entre El usuario y qury.
            Es importante la presencia de este documento, ya que sirve como guía
            y explica la naturaleza de la relación que tiene El usuario con
            qury, así como las condiciones que trae como consecuencia esa
            relación.
          </Text>
          <Text body2 style={{ marginTop: 10 }}>
            Por favor lea con atención y pausadamente los puntos y temas que
            desarrollaremos a continuación. Es importante que considere que para
            abrir una cuenta en qury, tiene que tener como mínimo 18 años. Al
            abrir y/o usar una cuenta de qury, usted estará aceptando todas las
            políticas, términos y condiciones expuestos en estos documentos. Por
            lo que no se podrá tomar ninguna acción legal en contra sobre las
            disposiciones presentadas.
          </Text>
          <Text body2 style={{ marginTop: 10 }}>
            Asimismo, se estaría afirmando y sosteniendo que los datos asociados
            en la cuenta son verídicos y corresponden a la persona que los esta
            escribiendo y/o un referido que cuenta con la autorización o
            consentimiento del titular de la cuenta. De no ser así, se estaría
            incurriendo en un delito contra la fe publica según el decreto
            legislativo N°635. qury no se responsabiliza con los problemas que
            puedan ocurrir en el futuro producto de disputas entre personas
            cuyos datos no corresponden a quien se esta presentando.
          </Text>
          <Text body2 style={{ marginTop: 10 }}>
            qury recalca que este documento está constantemente sujeto a
            revisión por lo que se podrían hacer modificaciones periódicas de
            los puntos que se presentan. Estas modificaciones en el documento
            serán notificadas a los usuarios con una anticipación de 5 días.
            Todo lo presentado son consideraciones para lograr el ecosistema de
            buenas prácticas que qury quiere construir. Nos consideramos
            abiertos a la comunidad para escuchar sus necesidades en búsqueda de
            mejorar y lograr este mismo objetivo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
