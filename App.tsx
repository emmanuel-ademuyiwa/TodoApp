import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Mainpage from "./Pages/Mainpage/Mainpage";
import { StatusBar } from "react-native";
import AddTaskScreen from "./Pages/AddTaskScreen/AddTaskScreen";
import { useLayoutEffect } from "react";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Mainpage" component={Mainpage} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
