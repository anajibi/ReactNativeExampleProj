import React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuComponent from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";

const MenuStack = createStackNavigator();
const MenuStackScreen = ({ navigation }) => (
  <MenuStack.Navigator>
    <MenuStack.Screen
      name="Menu"
      options={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Button
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
            title="Back"
            color="#fff"
          />
        ),
      }}
      component={MenuComponent}
      initialParams={{ navigation }}
    />
  </MenuStack.Navigator>
);
const DishdetailStack = ({ route, navigation }) => (
  <MenuStack.Navigator>
    <MenuStack.Screen
      name="Dishdetail"
      component={() => <Dishdetail navigation={navigation} route={route} />}
      options={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Button
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
            title="Back"
            color="#fff"
          />
        ),
      }}
    />
  </MenuStack.Navigator>
);

const Drawer = createDrawerNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" overlayColor="transparent">
        <Drawer.Screen name="Menu" component={MenuStackScreen} />
        <Drawer.Screen name="Dishdetail" component={DishdetailStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
