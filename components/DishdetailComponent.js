import React from "react";
import { View, Text, FlatList, VirtualizedList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
  };
};

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    const { favorites } = this.props.route.params;
    const { dishId } = this.props.route.params;

    this.state = {
      favorite: favorites.some((el) => el === dishId),
    };
  }

  static navigationOptions = {
    title: "Dish Details",
  };
  markFavorite = (dishId) => {
    this.setState({ favorites: this.state.favorites.concat(dishId) });
  };

  render() {
    const { dishId } = this.props.route.params;
    const { markFavorite } = this.props.route.params;
    return (
      <VirtualizedList>
        <RenderDish
          dish={this.state.dishes.dishes[+dishId]}
          favorite={this.state.favorite}
          onPress={() => {
            markFavorite(dishId);
            this.setState({ favorite: true });
          }}
        />
        <RenderComments
          comments={this.state.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </VirtualizedList>
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
    <Card title="Comments">
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
export default connect(mapStateToProps)(Dishdetail);
