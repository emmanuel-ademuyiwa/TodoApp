import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Todo from "../Todo/Todo";

const ToDos = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
    </ScrollView>
  );
};

export default ToDos;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    // height: "50%",
    paddingVertical: 20,
  },
});
