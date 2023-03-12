import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import { useSelector } from "react-redux";
import { _TOGGLE_COMPLETE } from "../../redux/todo/todoActions";

interface Props {
  tab: number;
}

const ToDos = ({ tab }: Props) => {
  const tasksArray = useSelector((state: any) => state.tasks.tasksArray);
  const [tasks, setTasks] = useState<any>();

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

  return (
    <ScrollView
      style={styles.outsideContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tasks?.length < 1 || tasks === undefined ? (
        <View style={styles.noDataContainer}>
          <Image source={require("../../assets/empty.png")} />
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
