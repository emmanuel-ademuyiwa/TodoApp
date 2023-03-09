import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";
import AddTask from "./Components/AddTask/AddTask";
import TitleBar from "./Components/TitleBar/TitleBar";
import ToDos from "./Components/ToDos/ToDos";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.text}>To-Do List</Text>
        <TitleBar />
        <ToDos />
        <Button title="Add Task" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0D121C" },
  container: {
    backgroundColor: "#0D121C",
    height: "100%",
    padding: 20,
    color: "#fff",
    gap: 24,
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
