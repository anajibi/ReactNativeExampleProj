import React from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  static navigationOptions = {
    title: "Menu",
  };

  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          leftAvatar={{ source: require(`./images/uthappizza.png`) }}
          hideChevron={true}
          bottomDivider
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
        >
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}
