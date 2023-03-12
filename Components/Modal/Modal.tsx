import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import AddTask from "../AddTask/AddTask";

import Moment from "moment";

interface Props {
  modalVisible: boolean;
  setModalVisible: (modal: boolean) => void;
}

const CustomModal = ({ modalVisible, setModalVisible }: Props) => {
  const date = new Date();
  const [theDate, setTheDate] = useState<any>(
    Moment(date).format("MMMM Do, YYYY")
  );
  const [theTime, setTheTime] = useState<any>("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddTask
              theDate={theDate}
              theTime={theTime}
              setTheDate={setTheDate}
              setTheTime={setTheTime}
            />
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add Task</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "relative",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#0D121C",
    borderRadius: 10,
    padding: 35,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 480,
    position: "absolute",
    bottom: -20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#206fc9",
    height: 48,
    width: "100%",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalCloseBtnContainer: {
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: 55,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomModal;
