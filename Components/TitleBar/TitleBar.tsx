import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

interface Prop {
  tab: number;
  setTab: (value: number) => void;
}

const TitleBar = ({ tab, setTab }: Prop) => {
  const handleTab = (value: number) => setTab(value);
  return (
    <View style={styles.container}>
      <View style={tab === 1 && styles.activeText}>
        <Text style={styles.text} onPress={() => handleTab(1)}>
          All
        </Text>
      </View>
      <View style={tab === 2 && styles.activeText}>
        <Text style={[styles.text]} onPress={() => handleTab(2)}>
          Completed
        </Text>
      </View>

      <View style={tab === 3 && styles.activeText}>
        <Text style={[styles.text]} onPress={() => handleTab(3)}>
          Incomplete
        </Text>
      </View>

      <View style={tab === 4 && styles.activeText}>
        <Text style={[styles.text]} onPress={() => handleTab(4)}>
          Starred
        </Text>
      </View>
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    padding: 8,
  },
  activeText: {
    borderBottomWidth: 3,
    borderBottomColor: "#206fc9",
  },
});
