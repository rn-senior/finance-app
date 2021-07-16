import { Button, Icon, Image, Text } from "@components";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Modal, Alert, StyleSheet } from "react-native";
import styles from "./styles";

const AlertView = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const [modalVisible, setModalVisible] = useState(true);
  const {
    title,
    message,
    buttonColor,
    jsonPath,
    onShowAlert,
    onDismissAlert,
    type,
    onPressOk,
    onPressConfirm,
    onPressCancel,
  } = props;

  const typeAlert = () => {
    switch (type) {
      case "error":
        return errorAlert();

      case "confirm":
        return confirmAlert();
      default:
        return informationAlert();
    }
  };

  const confirmAlert = () => {
    return (
      <Modal
        visible={modalVisible}
        // visible={true}
        transparent={true}
        animationType="slide"
        onShow={onShowAlert}
        onDismiss={onDismissAlert}
        // {...attrs}
        // onRequestClose={() => {
        //   // Alert.alert("Modal has been closed.");
        //   // setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ ...styles.modalText, color: "#000" }}>{title}</Text>
            <View style={styles.separator} />
            <Text style={styles.textStyle}>{message}</Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <TouchableOpacity
                style={{
                  ...styles.confirmButton,
                  backgroundColor: buttonColor,
                }}
                onPress={onPressConfirm}
              >
                <Text style={styles.okStyle}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.cancelButton, backgroundColor: buttonColor }}
                onPress={onPressCancel}
              >
                <Text style={styles.errorStyle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const errorAlert = () => {
    return (
      <Modal
        visible={true}
        transparent={true}
        animationType="slide"
        onShow={onShowAlert}
        onDismiss={onDismissAlert}
        // {...attrs}
        // onRequestClose={() => {
        //   // Alert.alert("Modal has been closed.");
        //   // setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ ...styles.modalText, color: "#C62105" }}>
              {title}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.textStyle}>{message}</Text>
            <TouchableOpacity
              style={{ ...styles.buttonOpen, backgroundColor: buttonColor }}
              onPress={onPressOk}
            >
              <Text style={styles.errorStyle}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const informationAlert = () => {
    return (
      <Modal
        visible={true}
        transparent={true}
        animationType="slide"
        onShow={onShowAlert}
        onDismiss={onDismissAlert}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.separator} />
            <Text style={styles.textStyle}>{message}</Text>
            <View style={styles.separator} />
            <TouchableOpacity
              style={{ ...styles.buttonOpen, backgroundColor: buttonColor }}
              onPress={onPressOk}
            >
              <Text style={styles.okStyle}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return <View>{typeAlert()}</View>;
};

AlertView.defaultProps = {
  title: "",
  visible: false,
  onShowAlert: () => {},
  onDismissAlert: () => {},
  type: "information",
  // onPressOk: () => {},
  onPressConfirm: () => {},
  onPressCancel: () => {},
};

AlertView.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onShowAlert: PropTypes.func,
  onDismissAlert: PropTypes.func,
  type: PropTypes.string,
  // onPressOk: PropTypes.func,
  onPressConfirm: PropTypes.func,
  onPressCancel: PropTypes.func,
};

export default AlertView;
