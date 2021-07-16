import { HeaderMessage, Icon, SafeAreaView, Text } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import React, { useEffect, useState } from "react";
import { Platform, View, Image, ActivityIndicator, Alert } from "react-native";
import {
  Actions,
  Bubble,
  GiftedChat,
  SystemMessage,
  Send,
} from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { getAsync, postAsync } from "../../services/ConnectApi";
import { useStore } from "react-redux";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { color } from "react-native-reanimated";

const messagesInit = require("./data/messages.js");
const messagesOldInit = require("./data/old_messages.js");
let _isMounted = true;
let _isAlright = false;

const Messages = (props) => {
  const { navigation, route } = props;
  const { itemInit } = route.params;
  const store = useStore();
  const userId = store.getState().auth.login.success.profile.id;
  const nombreUser = store.getState().auth.login.success.profile.nombres;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const agente =
    userId === itemInit.usuario_id_vendedor
      ? itemInit.comprador
      : itemInit.vendedor;
  const [messages, setMessages] = useState([]);
  const [loadEarlier, setLoadEarlier] = useState(true);
  const [typingText, setTypingText] = useState(null);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [loading, setLoading] = useState(true);

  const fechaUTC = (fecha) => {
    let date = new Date(fecha);
    return date;
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const getMessages = () => {
    getAsync(
      "/message?transaccion_id=" + itemInit.id,
      {
        onSuccess: (response) => {
          // setBandeja(response);
          let array = response.map((item) => {
            return {
              _id: item.id,
              text: item.texto,
              createdAt: fechaUTC(item.fechaCreacion),
              user: {
                _id: item.usuario_id,
                name: nombreUser,
              },
            };
          });
          setMessages(array);
        },
        onError: (error) => {
          // setLoading(false);
        }, // id:Session.user.id,
      },
      null
    );
  };

  useEffect(() => {
    getMessages();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const postMessage = (body) => {
    postAsync(
      "/message",
      {
        onSuccess: (response) => {
          // listPaymentEntry();
        },
        onError: (error) => {},
        data: body, // id:Session.user.id,
      },
      null
    );
  };

  const messageIdGenerator = () => {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // useEffect(() => {
  //   _isMounted = true;
  //   return () => {
  //     _isMounted = true;
  //   };
  // }, []);

  const iniciales = () => {
    return agente.nombres.charAt(0) + agente.apellidos.charAt(0);
  };

  const handleChoosePhoto = () => {
    const options = {};
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert("Error", error);
      } else {
        const { uri } = response;
        const message = {
          _id: messageIdGenerator(),
          createdAt: Date.now(),
          user: {
            _id: userId,
            name: nombreUser,
          },
          image: uri,
        };
        onSend([message]);
      }
      // setImage(response.uri)
    });
  };

  const onLoadEarlier = () => {
    setIsLoadingEarlier(true);

    setTimeout(() => {
      if (_isMounted === true) {
        setMessages(GiftedChat.prepend(messages, messagesOldInit));
        setLoadEarlier(false);
        setIsLoadingEarlier(false);
      }
    }, 500); // simulating network
  };

  const onSend = (messagesNew = []) => {
    setMessages(GiftedChat.append(messages, messagesNew));
    // answerDemo(messagesNew);
    messagesNew.map((message) => {
      postMessage({
        texto: message.text,
        leido: 0,
        mensaje: message.text,
        fechaCreacion: message.createdAt,
        estado: 1,
        transaccion_id: itemInit.id,
        usuario_id: userId,
      });
    });
  };

  const answerDemo = (messages) => {
    if (messages.length > 0) {
      if (messages[0].image || messages[0].location || !_isAlright) {
        setTypingText("React Native is typing");
      }
    }

    // setTimeout(() => {
    //   if (_isMounted === true) {
    //     if (messages.length > 0) {
    //       if (messages[0].image) {
    //         onReceive("Nice picture!");
    //       } else if (messages[0].location) {
    //         onReceive("My favorite place");
    //       } else {
    //         if (!_isAlright) {
    //           _isAlright = true;
    //           onReceive("Alright");
    //         }
    //       }
    //     }
    //   }

    //   setTypingText(null);
    // }, 500);
  };

  const onReceive = (text) => {
    const messagesNew = GiftedChat.append(messages, {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: agente.id,
        name: agente.nombres,
        // avatar: "",
      },
    });
    setMessages(messagesNew);
  };

  const renderCustomActions = (props) => {
    if (Platform.OS === "ios") {
      return <CustomActions {...props} handleChoosePhoto={handleChoosePhoto} />;
    }
    const options = {
      "Action 1": (props) => {
        alert("option 1");
      },
      "Action 2": (props) => {
        alert("option 2");
      },
      Cancel: () => {},
    };
    return <Actions {...props} options={options} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            // backgroundColor: "#f0f0f0",
            backgroundColor: "#f0f0f0",
          },
          right: {
            backgroundColor: "#0191CB",
          },
        }}
      />
    );
  };

  const renderAvatar = () => {
    // return (
    //   <View
    //     style={{
    //       width: 36,
    //       height: 36,
    //       borderRadius: 18,
    //       backgroundColor: colors.primary,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text style={{ color: "#fff" }}>{nombreUser.charAt(0)}</Text>
    //   </View>
    // );
    return null;
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  };

  const renderLoading = () => {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ flex: 1, paddingLeft: 5 }}
      />
    );
  };

  const renderCustomView = (props) => {
    return <CustomView {...props} />;
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 20, marginBottom: 10 }}>
          <Icon name={"paper-plane"} size={20} color={colors.primary} />
        </View>
      </Send>
    );
  };

  const renderFooter = (props) => {
    if (typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{typingText}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <HeaderMessage
        // title={t("reviews")}
        title={t(agente.nombres + " " + agente.apellidos)}
        subTitle={
          userId === itemInit.usuario_id_vendedor ? "Comprador" : "Vendedor"
        }
        // subTitle={t("Vendedor")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={"#FF551E"}
              enableRTL={true}
            />
          );
        }}
        // renderRightSecond={() => {
        //   return (
        //     <Text headline primaryColor>
        //       {t("replay")}
        //     </Text>
        //   );
        // }}
        renderSecondLeft={() => {
          return (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primaryBlueColor,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                {iniciales()}
              </Text>
            </View>
          );
        }}
        // renderRight={() => {
        //   return (
        //     <Image
        //       source={Images.videollamada}
        //       style={{ width: 24, height: 24 }}
        //     />
        //   );
        // }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      {loading ? (
        renderLoading()
      ) : (
        <GiftedChat
          alignTop={true}
          messages={messages}
          isAnimated={true}
          showAvatarForEveryMessage={false}
          onSend={onSend}
          inverted={false}
          // loadEarlier={loadEarlier}
          // onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={isLoadingEarlier}
          user={{
            _id: userId, // sent messages should have same user._id
          }}
          renderActions={renderCustomActions}
          renderBubble={renderBubble}
          renderSystemMessage={renderSystemMessage}
          renderCustomView={renderCustomView}
          renderAvatar={renderAvatar}
          renderSend={renderSend}
          textInputProps={{}}
          // renderFooter={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

export default Messages;
