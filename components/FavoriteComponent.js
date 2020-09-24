import React, { Component } from "react";
import { FlatList, View, Text, Alert } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import Swipeout from "react-native-swipeout";
import { deleteFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});
class Favorites extends Component {
  static navigationOptions = {
    title: "My Favorites",
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => {
            Alert.alert(
              "Delete Favorite?",
              "Are you sure you wish to delete the favorite dish " +
                item.name +
                "?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log(item.name + "Not Deleted"),
                  style: " cancel",
                },
                {
                  text: "OK",
                  onPress: () => this.props.deleteFavorite(item.id),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ];
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <ListItem
            key={index}
            hideChevron={true}
            onPress={() => navigate("Dishdetail", { dishId: item.id })}
          >
            <Avatar source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
              <ListItem.Title>
                <Text>{item.name}</Text>
              </ListItem.Title>
              <ListItem.Subtitle>
                <Text>{item.description}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Swipeout>
      );
    };

    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes.filter((dish) =>
            this.props.favorites.some((el) => el === dish.id)
          )}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
