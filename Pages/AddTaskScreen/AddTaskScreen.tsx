import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Moment from "moment";
import AddTask from "../../Components/AddTask/AddTask";
import { useNavigation } from "@react-navigation/native";

const AddTaskScreen = () => {
  const navigation: any = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const date = new Date();
  const [theDate, setTheDate] = useState<any>(
    Moment(date).format("MMMM Do, YYYY")
  );
  const [theTime, setTheTime] = useState<any>("");
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
          <AddTask
            theDate={theDate}
            theTime={theTime}
            setTheDate={setTheDate}
            setTheTime={setTheTime}
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0D121C" },
  container: {
    backgroundColor: "#0D121C",
    height: "100%",
    padding: 20,
    color: "#fff",
    gap: 24,
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
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
