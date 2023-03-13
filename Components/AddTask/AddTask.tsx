import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _EDIT_DATA, _SAVE_TODO } from "../../redux/todo/todoActions";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import Moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";

interface Props {
  theDate: string;
  theTime: string;
  setTheDate: (desc: string) => void;
  setTheTime: (desc: string) => void;
}

const AddTask = ({ setTheDate, setTheTime, theDate, theTime }: Props) => {
  const newDate = new Date();
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const editedData = useSelector((state: any) => state.tasks.editedData);

  const [isEnabled, setIsEnabled] = useState(
    editedData?.selectedTime ? true : false
  );
  const [selectedTime, setSelectedTime] = useState<any>(
    editedData?.selectedTime
      ? new Date(editedData && JSON.parse(editedData?.selectedTime))
      : newDate
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    editedData?.selectedTime
      ? new Date(editedData && JSON.parse(editedData?.selectedDate))
      : newDate
  );

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const setDate = (event: any, date: any) => {
    const newDate = Moment(date).format("MMMM Do, YYYY");
    const selectedDateFormat = Moment(selectedDate).format("MMMM Do, YYYY");
    setSelectedDate(date);
    setTheDate(newDate ? newDate : selectedDateFormat);
  };

  const setTime = (event: any, time: any) => {
    setSelectedTime(time);
    const data = new Date(time);
    const hrs = data.getHours();
    const mins = data.getMinutes();
    const reminder = hrs + ":" + mins;
    setTheTime(reminder);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Add Task</Text>
        <Formik
          enableReinitialize={editedData ? true : false}
          initialValues={{
            id: editedData?.id || uuid.v4(),
            title: editedData?.title || "",
            description: editedData?.description || "",
            completed: editedData?.completed || false,
            starred: editedData?.starred || false,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required Field"),
          })}
          onSubmit={(values, { setErrors, resetForm }) => {
            const newSelectedDate = JSON.stringify(selectedDate);
            const newSelectedTime = JSON.stringify(selectedTime);

            let errors = {};
            if (
              Object.entries(errors).length === 0 &&
              errors.constructor === Object
            ) {
              dispatch(
                _SAVE_TODO({
                  ...values,
                  selectedTime: newSelectedTime,
                  selectedDate: newSelectedDate,
                })
              );
              resetForm();
              dispatch(_EDIT_DATA(""));
              navigation.navigate("Mainpage");
            } else {
              setErrors(errors);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View style={styles.titleContainer}>
                <TextInput
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("email")}
                  value={values.title}
                  placeholderTextColor="#fff"
                  placeholder="Task title"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  <ErrorMessage component={Text} name={"title"} />
                </Text>
              </View>

              <TextInput
                placeholderTextColor="#fff"
                placeholder="Description"
                editable
                multiline
                numberOfLines={4}
                style={[styles.textInput, styles.multiLineTextInput]}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                defaultValue={values.description}
              />

              {/* <DatePicker setTheDate={setTheDate} setTheTime={setTheTime} /> */}

              <View style={styles.pickerContainer}>
                <View style={styles.dateContainer}>
                  <RNDateTimePicker
                    onChange={setDate}
                    themeVariant="dark"
                    value={selectedDate}
                  />
                </View>
                <View style={styles.reminderContainer}>
                  <View style={styles.switchContainer}>
                    <Text style={styles.text}>Set Reminder ?</Text>
                    <Switch
                      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                      trackColor={{ false: "#fff", true: "#fff" }}
                      thumbColor={isEnabled ? "#2196F3" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>

                  {isEnabled && (
                    <RNDateTimePicker
                      onChange={setTime}
                      themeVariant="dark"
                      value={selectedTime}
                      mode="time"
                    />
                  )}
                </View>
              </View>

              <View style={styles.modalCloseBtnContainer}>
                <Pressable
                  style={styles.buttonOpen}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.textStyle}>{"Save Task"}</Text>
                </Pressable>

                <Pressable
                  style={styles.buttonOpen}
                  onPress={() => {
                    navigation.navigate("Mainpage");
                    dispatch(_EDIT_DATA(""));
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    gap: 10,
    position: "relative",
  },
  titleText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  textInput: {
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 12,
    height: 48,
    fontSize: 18,
  },
  multiLineTextInput: {
    height: 100,
  },

  pickerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  dateContainer: {
    marginLeft: -12,
  },
  reminderContainer: {
    gap: 12,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  modalCloseBtnContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  buttonOpen: {
    backgroundColor: "#206fc9",
    height: 48,
    width: "45%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    bottom: 0,
  },
  errorText: {
    color: "red",
  },
  errorBorder: {
    borderColor: "#FF4D4F",
    color: "#FF4D4F",
  },
  titleContainer: {
    gap: 4,
  },
});
