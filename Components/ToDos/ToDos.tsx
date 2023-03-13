import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import { useSelector } from "react-redux";
import { _TOGGLE_COMPLETE } from "../../redux/todo/todoActions";
import * as Notifications from "expo-notifications";
import Moment from "moment";

interface Props {
  tab: number;
}

const ToDos = ({ tab }: Props) => {
  const tasksArray = useSelector((state: any) => state.tasks.tasksArray);
  const [tasks, setTasks] = useState<any>();
  const [date, setDate] = useState(new Date());
  const dateHHMMSS = date.toLocaleTimeString();
  const currentDay = Moment(date).format("MMMM Do, YYYY");
  const [reminder, setReminder] = useState(false);

  // Notifications.getExpoPushTokenAsync();

  async function schedulePushNotification(item: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Pending task!",
        body: item.title,
        data: item,
      },
      trigger: { seconds: 1 },
    });
  }

  function checkReminder() {
    tasksArray.find(
      (item: any) =>
        Moment(new Date(JSON.parse(item.selectedDate))).format(
          "MMMM Do, YYYY"
        ) === currentDay &&
        new Date(JSON.parse(item.selectedTime)).toLocaleTimeString() ===
          dateHHMMSS &&
        schedulePushNotification(item)
    );
  }

  checkReminder();

  useEffect(() => {
    setTasks(
      tab === 1
        ? tasksArray
        : tab === 2
        ? tasksArray.filter((item: any) => item.completed)
        : tab === 3
        ? tasksArray.filter((item: any) => !item.completed)
        : tasksArray.filter((item: any) => item.starred)
    );
  }, [tab, tasksArray]);

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <ScrollView
      style={styles.outsideContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tasks?.length < 1 || tasks === undefined ? (
        <View style={styles.noDataContainer}>
          <Image source={require("../../assets/no-data.png")} />
          <Text style={styles.text}>No data</Text>
        </View>
      ) : (
        tasks?.map((task: any) => <Todo key={task.id} task={task} />)
      )}
    </ScrollView>
  );
};

export default ToDos;

const styles = StyleSheet.create({
  outsideContainer: {
    height: "100%",
  },

  container: {
    gap: 20,
    paddingVertical: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  noDataContainer: {
    width: "100%",
    height: 100,
    display: "flex",
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginVertical: "50%",
  },
});
