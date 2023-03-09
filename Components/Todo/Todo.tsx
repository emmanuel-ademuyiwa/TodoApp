import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Todo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lorem ipsum dolor sit</Text>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d222f6e",
    height: 60,
    padding: 12,
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
});
