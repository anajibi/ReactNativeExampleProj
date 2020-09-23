import React from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  static navigationOptions = {
    title: "Menu",
  };

  markFavorite = (dishId) => {
    this.setState({ favorites: this.state.favorites.concat(dishId) });
  };
  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() =>
            navigate("Dishdetail", {
              dishId: item.id,
              favorites: this.state.favorites,
            })
          }
          imageSrc={{ uri: baseUrl + item.image }}
        />
      );
    };
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Menu);
