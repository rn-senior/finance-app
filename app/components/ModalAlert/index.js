import { Button, Icon, Image, Text } from "@components";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Modal, Alert, StyleSheet } from "react-native";
import styles from "./styles";

const ModalAlert = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const {
    title,
    //message,
    visible,
    buttonColor,
    jsonPath,
    onShowAlert,
    onDismissAlert,
    type,
    onPressOk,
    onPressConfirm,
    onPressCancel,
    ...attrs
  } = props;
  let { message } = props;
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const typeAlert = () => {
    switch (type) {
      case "error":
        message
          ? null
          : (message = "En mantenimiento. Por favor intente más tarde");
        return errorAlert();

      case "success":
        message ? null : (message = "Transacción realizada con éxito");
        return successAlert();
      case "confirm":
        message
          ? null
          : (message =
              "Esta acción no se puede deshacer, está seguro de que desea continuar?");
        return confirmAlert();
      default:
        message
          ? null
          : (message = "En mantenimiento. Por favor intente más tarde");
        return informationAlert();
    }
  };

  const successAlert = () => {
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onShow={onShowAlert}
        onDismiss={onDismissAlert}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={{ ...styles.modalText, color: "#000" }}>{title}</Text>
            <View style={styles.separator} /> */}
            <Icon name={"check-double"} style={styles.iconSuccess} />

            <Text style={styles.textStyle}>{message}</Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <TouchableOpacity
                style={{ ...styles.buttonOpen, backgroundColor: buttonColor }}
                onPress={onPressOk}
              >
                {/* <View style={styles.separator} /> */}

                <Text style={styles.okStyle}>Aceptar</Text>
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
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onShow={onShowAlert}
        onDismiss={onDismissAlert}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={{ ...styles.modalText, color: "#000" }}>{title}</Text> */}
            <Icon name={"times"} style={styles.iconError} />
            <Text style={styles.textStyle}>{message}</Text>
            <TouchableOpacity
              style={{ ...styles.buttonOpen, backgroundColor: buttonColor }}
              onPress={onPressOk}
            >
              {/* <View style={styles.separator} /> */}

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
        visible={modalVisible}
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
            {/* <Text style={styles.modalText}>{title}</Text> */}
            {/* <View style={styles.separator} /> */}
            <Text style={styles.textStyle}>{message}</Text>
            <View style={styles.separator} />
            <TouchableOpacity
              style={{ ...styles.buttonOpen, backgroundColor: buttonColor }}
              onPress={onPressOk}
            >
              <Text style={styles.okStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const confirmAlert = () => {
    return (
      <Modal
        visible={modalVisible}
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
            {/* <Text style={styles.modalText}>{title}</Text> */}
            {/* <View style={styles.separator} /> */}
            <Text style={styles.textStyle}>{message}</Text>
            <View style={styles.separator} />
            <View style={{ flexDirection: "row", width: "100%" }}>
              <TouchableOpacity
                style={{
                  ...styles.confirmButton,
                  backgroundColor: buttonColor,
                }}
                onPress={onPressOk}
              >
                <Text style={styles.confirmStyle}>Borrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.confirmButton,
                  backgroundColor: buttonColor,
                }}
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

  return (
    <View>
      {/* <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onShow={onShowAlert}
        onDismiss={onDismissAlert}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.separator} />
            <Text style={styles.textStyle}>{message}</Text>
            <View style={styles.separator} />
            <TouchableOpacity
              style={{ ...styles.buttonOpen, backgroundColor: buttonColor }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.okStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {/* {type === "information" ? informationAlert() : errorAlert()} */}
      {typeAlert()}
    </View>
  );
};

ModalAlert.defaultProps = {
  title: "",
  visible: false,
  onShowAlert: () => {},
  onDismissAlert: () => {},
  type: "information",
  onPressOk: () => {},
  onPressConfirm: () => {},
  onPressCancel: () => {},
};

ModalAlert.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onShowAlert: PropTypes.func,
  onDismissAlert: PropTypes.func,
  type: PropTypes.string,
  onPressOk: PropTypes.func,
  onPressConfirm: PropTypes.func,
  onPressCancel: PropTypes.func,
};

export default ModalAlert;
