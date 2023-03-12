import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import TitleBar from "../../Components/TitleBar/TitleBar";
import ToDos from "../../Components/ToDos/ToDos";
import { useNavigation } from "@react-navigation/native";

const Mainpage = () => {
  const navigation: any = useNavigation();
  const [tab, setTab] = useState<number>(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>To-Do List</Text>
        <TitleBar tab={tab} setTab={setTab} />

        <ToDos tab={tab} />

        <View style={styles.centeredView}>
          <Pressable
            style={[styles.buttonOpen]}
            onPress={() => navigation.navigate("AddTask")}
          >
            <Text style={styles.textStyle}>Add Task</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Mainpage;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0D121C" },
  container: {
    backgroundColor: "#0D121C",
    height: "100%",
    padding: 20,
    color: "#fff",
    gap: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingTop: 12,
    position: "relative",
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
