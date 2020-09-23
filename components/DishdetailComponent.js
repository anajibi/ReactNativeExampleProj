import React from "react";
import {
  View,
  Text,
  FlatList,
  VirtualizedList,
  ScrollView,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});
class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    const { dishId } = this.props.route.params;

    this.state = {
      favorite: this.props.favorites.some((el) => el === dishId),
    };
  }
  markFavorite = (dishId) => {
    this.props.postFavorite(dishId);
  };
  static navigationOptions = {
    title: "Dish Details",
  };

  render() {
    const { dishId } = this.props.route.params;
    return (
      <>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.state.favorite}
          onPress={() => {
            this.markFavorite(dishId);
            this.setState({ favorite: true });
          }}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </>
    );
  }
}
function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comments</Card.Title>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}
function RenderDish(props) {
  if (props.dish != null)
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + props.dish.image }}>
          <Card.FeaturedTitle>
            <Text style={{ color: "black" }}>{props.dish.name}</Text>
          </Card.FeaturedTitle>
        </Card.Image>
        <Text style={{ margin: 10 }}>{props.dish.description}</Text>
        <Icon
          raised
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log("Already favorite") : props.onPress()
          }
        />
      </Card>
    );
  else return <View></View>;
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
