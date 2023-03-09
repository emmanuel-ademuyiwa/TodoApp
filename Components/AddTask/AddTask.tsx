import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddTask = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AddTask</Text>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "#fff",
  },
});
