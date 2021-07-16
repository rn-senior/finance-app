import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { AboutUsData } from "@data";
import * as Utils from "@utils";
import React, { useState } from "react";
import { ScrollView, View, FlatList } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const AboutUs = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [ourTeam, setOurTeam] = useState(AboutUsData);
  const valores = [
    {
      key: "Somos seguros",
      text:
        "Las personas tienen que tener la completa seguridad sobre la protección de su información, dinero y que sus transacciones se realicen bajo el procedimiento establecido. Además, la misma plataforma debe transmitir un ecosistema de seguridad y confianza.",
    },
    {
      key: "Somos cercanos",
      text:
        "Tenemos vocación de servicio, atendemos a nuestros clientes con una actitud positiva, cortés, y buscamos una relación de confianza para que los usuarios sepan qué estamos con ellos en favor de sus intereses.",
    },
    {
      key: "Somos innovadores",
      text:
        "Los usuarios deben asociarnos con mejora continua de sistemas y servicios para ofrecerles cada vez un mejor valor.",
    },
    {
      key: "Somos comprometidos",
      text:
        "Trabajamos comprometidos para responder a las necesidades de nuestros principales stakeholder, generando un entorno cooperativo hacía los intereses del comercio electrónico.",
    },
  ];

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("about_us")}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View>
          <Image
            source={Images.splashImage}
            style={{ width: "100%", height: 135 }}
          />
          <View style={styles.titleAbout}>
            <Text title1 semibold whiteColor>
              {t("about_us")}
            </Text>
            <Text subhead whiteColor>
              {t("slogan_about_us")}
            </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text headline semibold>
            {"¿Quienes somos?"}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Somos una nueva startup con el propósito de mejorar la experiencia
            de comprar en línea. Nuestro objetivo es crear una comunidad de
            gente honesta; en donde se respeten las buenas prácticas del
            comercio electrónico. Para compradores; un espacio en donde las
            personas no tengan temor y sientan total libertad al momento de
            hacer sus compras. Para vendedores; un canal para transmitir mayor
            confianza y una herramienta que los ayude a una mejor gestión y
            optimización de sus ventas.
          </Text>
          <Text body2 style={{ marginTop: 10 }}>
            La principales funciones en la que nos centraremos son la Tecnología
            y el Servicio al cliente. Utilizamos la tecnología para desarrollar
            una plataforma de calidad que ayude a una mejor trazabilidad y
            mejora de nuestros servicios. Contaremos con una atención de primer
            nivel para atender a cualquier problema o necesidad que puedan tener
            nuestros clientes. Buscando unir ambas aristas a través de la
            innovación y la mejora continua.
          </Text>
          <Text headline semibold style={{ marginTop: 20 }}>
            {"Visión"}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Ser una de las principales empresas de tecnología que ayude a
            impulsar el comercio electrónico.
          </Text>
          <Text headline semibold style={{ marginTop: 20 }}>
            {"Misión"}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Crear un ecosistema que facilite, agregue valor y genere nuevas
            formas de realizar transacciones electrónicas.
          </Text>
          <Text headline semibold style={{ marginTop: 20 }}>
            {"Valores"}
          </Text>
          <FlatList
            data={valores}
            renderItem={({ item }) => (
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name={"circle"} size={8} />
                  <Text style={[styles.item, { marginLeft: 5 }]}>
                    {item.key + ":"}
                  </Text>
                </View>
                <Text style={[styles.item, { marginTop: 5 }]}>{item.text}</Text>
              </View>
            )}
          />
          <Text headline semibold style={{ marginTop: 20 }}>
            {"¿De donde venimos?"}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Nuestra propósito nace a raíz de la pandemia covid-19 que estamos
            viviendo en estos momentos. Esta coyuntura nos ha llevado a una
            transformación digital nunca antes vista y en consecuencia en
            nuestro modo de vida. Esta habiendo un crecimiento exponencial en el
            comercio electrónico y en la creación de nuevos emprendimientos. Sin
            embargo, junto a este crecimiento también ha surgido varias
            complicaciones en los servicios, por lo que algunas personas pueden
            no sentirse del todo seguras al comprar en linea.
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Nuestra idea empezó porque que varios miembros y/o familiares de
            nuestro equipo también tuvieron estas complicaciones. Cuestiones tan
            esenciales como el tiempo para realizar una entrega o la simple
            devolución de un producto. Por nuestro interés en tecnología y
            sistemas; creímos que debía haber una mejor manera de llevar a cabo
            estos procesos. Le pusimos atención a los principales problemas de
            las plataformas actuales y diseñamos un modelo pensado en garantizar
            las buenas prácticas del comercio electrónico.
          </Text>
          <Text headline semibold style={{ marginTop: 20 }}>
            {"¿Hacia donde nos dirigimos?"}
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            Esperamos que nuestro servicio se considere un estándar de ventas
            para las buenas practicas y que logré alcanzar a la mayor cantidad
            de personas posible. Para ello, buscaremos implementar múltiples
            integraciones entre sistemas para ampliar los canales de transmisión
            disponibles. Estamos comprometidos en cada vez mejorar nuestros
            servicios para brindarle a usted una mejor experiencia. Nuestro
            marco de acción girará en perfeccionar los 3 ejes de nuestra
            propuesta de valor a través de la innovación y la mejora continua.
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            A lo largo del tiempo, crearemos nuevos modelos de compra que
            permitan ampliar nuevas y diferentes situaciones de venta.
            Consideramos que existe mucho potencial en el desarrollo de pagos
            electrónicos. Incitaremos la innovación y creatividad para buscar
            nuevas ideas internas y externas que nos ayuden con nuestro
            propósito. Fortaleceremos nuestra identidad de comunidad para
            mejorar la relación de cercanía con los usuarios y entender más a
            profundidad sus necesidades.
          </Text>
          <Text body2 style={{ marginTop: 5 }}>
            En el futuro, esperamos que la empresa sea una de las principales
            impulsaras de la tecnología y líderes dentro de su rubro. Nos
            adaptaremos al avance de nuevos desarrollos para mejorar y ofrecer
            diferentes tipos de servicios. También esperamos expandirnos hacia
            otras regiones que puedan beneficiarse de nuestro modelo. Como
            participante del ecosistema, buscaremos ser promotores del
            e-commerce mediante alianzas y asociaciones que beneficien a los
            consumidores.
          </Text>
          {/* <Text headline semibold style={{ marginTop: 20, marginBottom: 15 }}>
            {t("meet_our_team")}
          </Text> */}
          {/* <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {ourTeam.map((item, index) => {
              return (
                <View
                  style={{
                    height: 200,
                    width: Utils.getWidthDevice() / 2 - 30,
                    marginBottom: 20,
                  }}
                  key={"ourTeam" + index}
                >
                  <Card
                    image={item.image}
                    onPress={() => navigation.navigate(item.screen)}
                  >
                    <Text footnote whiteColor>
                      {item.subName}
                    </Text>
                    <Text headline whiteColor semibold>
                      {item.name}
                    </Text>
                  </Card>
                </View>
              );
            })}
          </View> */}
          {/* <Text headline semibold>
            {t("our_service")}
          </Text>
          {ourTeam.map((item, index) => {
            return (
              <ProfileDescription
                key={"service" + index}
                image={item.image}
                name={item.name}
                subName={item.subName}
                description={item.description}
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          })} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
