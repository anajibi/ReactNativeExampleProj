import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuComponent from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { useRoute } from "@react-navigation/native";
import Home from "./HomeComponent";
import ContactComponent from "./ContactComponent";
import AboutComponent from "./AboutComponent";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native";
import CustomDrawerContent from "./DrawerCostumeContent";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#512DA8",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
};
const FavoriteStack = createStackNavigator();

const favoritesScreen = ({ navigation }) => (
  <FavoriteStack.Navigator>
    <FavoriteStack.Screen
      name="favorite"
      component={Favorites}
      initialParams={{ navigation }}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </FavoriteStack.Navigator>
);
const ReservationNavigator = createStackNavigator();

const ReservationScreen = ({ navigation }) => (
  <ReservationNavigator.Navigator>
    <ReservationNavigator.Screen
      name="Reservation"
      component={Reservation}
      initialParams={{ navigation }}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </ReservationNavigator.Navigator>
);
const LoginNavigator = createStackNavigator();

const LoginScreen = ({ navigation }) => (
  <LoginNavigator.Navigator>
    <LoginNavigator.Screen
      name="Login"
      component={Login}
      initialParams={{ navigation }}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </LoginNavigator.Navigator>
);
const MenuStack = createStackNavigator();

const DishdetailStack = ({ route, navigation }) => (
  <MenuStack.Navigator initialRouteName="Menu">
    <MenuStack.Screen
      name="Menu"
      component={MenuComponent}
      initialParams={{ navigation }}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
    <MenuStack.Screen
      name="Dishdetail"
      component={Dishdetail}
      initialParams={{
        navigation,
        route: useRoute(),
      }}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </MenuStack.Navigator>
);
const HomeStack = createStackNavigator();

const HomeScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </HomeStack.Navigator>
);
const ContactStack = createStackNavigator();

const AboutStack = createStackNavigator();

const ContactScreen = () => (
  <ContactStack.Navigator>
    <ContactStack.Screen
      name={"Contact Information"}
      component={ContactComponent}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </ContactStack.Navigator>
);

const AboutScreen = () => (
  <AboutStack.Navigator>
    <AboutStack.Screen
      name={"About Us"}
      component={AboutComponent}
      options={({ navigation }) => ({
        ...screenOptionStyle,
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </AboutStack.Navigator>
);

const Drawer = createDrawerNavigator();

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerType="slide"
          initialRouteName="Home"
          overlayColor="#"
          drawerStyle={{
            backgroundColor: "#c6cbef",
            width: 240,
          }}
          contentComponent
        >
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="sign-in"
                  type="font-awesome"
                  size={24}
                  color={tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="home"
                  type="font-awesome"
                  size={24}
                  color={tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Menu"
            component={DishdetailStack}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="list"
                  type="font-awesome"
                  size={24}
                  color={tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Contact Us"
            component={ContactScreen}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="address-card"
                  type="font-awesome"
                  size={22}
                  color={tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="About Us"
            component={AboutScreen}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="info-circle"
                  type="font-awesome"
                  size={24}
                  color={tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Reservation"
            component={ReservationScreen}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24}
                  iconStyle={{ color: tintColor }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Favorites"
            component={favoritesScreen}
            options={{
              drawerIcon: ({ tintColor }) => (
                <Icon
                  name="heart"
                  type="font-awesome"
                  size={24}
                  iconStyle={{ color: tintColor }}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
