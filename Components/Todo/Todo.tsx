import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  _DELETE_TASK,
  _EDIT_DATA,
  _EDIT_MODAL,
  _TOGGLE_COMPLETE,
  _TOGGLE_STARRED,
} from "../../redux/todo/todoActions";

export interface Prop {
  task: {
    id: number;
    title: string;
    description: string;
    theDate: string;
    completed: boolean;
    reminder: boolean;
    starred: boolean;
    selectedTime: any;
    selectedDate: any;
  };
}

const Todo = ({ task }: Prop) => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const [date, setDate] = useState(new Date());
  const dateHHMMSS = date.toLocaleTimeString();
  const [isEnabled, setIsEnabled] = useState(task.completed);

  const reminder = new Date(JSON.parse(task.selectedTime));
  const reminderHHMMSS = reminder.toLocaleTimeString();

  const targetDate = new Date(JSON.parse(task.selectedDate));
  const targetDateFormatted = Moment(targetDate).format("MMMM Do, YYYY");
  const currentDay = Moment(date).format("MMMM Do, YYYY");

  const toggle = () => {
    setIsEnabled((previousState: boolean) => !previousState);
  };

  function refreshClock() {
    setDate(new Date());
  }

  function checkReminder() {
    if (reminderHHMMSS === dateHHMMSS) {
      console.log("It's time");
    }
  }

  function checkDay() {
    if (targetDateFormatted === currentDay) {
      checkReminder();
    }
  }

  checkDay();

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(_EDIT_DATA(task));
          navigation.navigate("AddTask");
        }}
        style={styles.titleContainer}
      >
        <Text style={styles.text}>{task?.title}</Text>
        <Text style={styles.descText}>{task?.description}</Text>
      </TouchableOpacity>
      <View style={styles.completedContainer}>
        <Text style={styles.descText}>{targetDateFormatted}</Text>
        {task.starred ? (
          <TouchableOpacity onPress={() => dispatch(_TOGGLE_STARRED(task))}>
            <Image
              style={styles.imgIcon}
              source={require("../../assets/filled-star.png")}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => dispatch(_TOGGLE_STARRED(task))}>
            <Image
              style={styles.imgIcon}
              source={require("../../assets/star.png")}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => dispatch(_DELETE_TASK(task))}>
          <Image
            style={styles.imgIcon}
            source={require("../../assets/delete.png")}
          />
        </TouchableOpacity>
        <Switch
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
          trackColor={{ false: "#fff", true: "#fff" }}
          thumbColor={isEnabled ? "#2196F3" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            dispatch(_TOGGLE_COMPLETE(task));
            toggle();
          }}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d222e",
    minHeight: 60,
    padding: 12,
    justifyContent: "center",
    borderRadius: 10,
    gap: 18,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  descText: {
    fontSize: 14,
    color: "#fff",
  },
  titleContainer: {
    gap: 4,
  },
  completedContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgIcon: {
    width: 15,
    height: 15,
  },
});
