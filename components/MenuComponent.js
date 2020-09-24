import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

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
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Tile
            containerStyle={{ margin: 10 }}
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() =>
              navigate("Dishdetail", {
                dishId: item.id,
                favorites: this.state.favorites,
                markFavorite: this.markFavorite,
              })
            }
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };
    const { navigate } = this.props.navigation;
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{props.dishes.errMess}</Text>
        </View>
      );
    }
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
