import React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();
import Main from "./components/MainComponent";
import Constants from "expo-constants";
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
