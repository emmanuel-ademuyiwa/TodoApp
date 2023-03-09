import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const AddTask = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Task name here ..." style={styles.textInput} />
      <TextInput
        placeholder="Description"
        editable
        // multiline
        numberOfLines={4}
        maxLength={40}
        style={styles.textInput}
      />
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    height: 150,
    // backgroundColor: "#1D222F6E",
    display: "flex",
    borderWidth: 1,
  },

  textInput: {
    color: "white",
    backgroundColor: "#0D121C",
    height: 40,
  },
});
