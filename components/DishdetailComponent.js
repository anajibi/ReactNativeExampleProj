import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  Alert,
  PanResponder,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    const { dishId } = this.props.route.params;

    this.state = {
      favorite: this.props.favorites.some((el) => el === dishId),
      showModal: false,
      author: "",
      comment: "",
      rating: null,
    };
  }
  markFavorite = (dishId) => {
    this.props.postFavorite(dishId);
  };
  static navigationOptions = {
    title: "Dish Details",
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  ratingCompleted = (rating) => {
    this.setState({ rating });
  };

  handleAuthorInput = (author) => {
    this.setState({ author });
  };

  handleCommentInput = (comment) => {
    this.setState({ comment });
  };
  handleComment() {
    const { rating, author, comment } = this.state;
    //const dishId = this.props.navigation.getParam("dishId", "");
    const dishId = this.props.route.params.dishId;
    this.toggleModal();
    this.props.postComment(dishId, rating, author, comment);
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    });
  }
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
          toggleModal={this.toggleModal}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              imageSize={30}
              startingValue={5}
              showRating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              onChangeText={this.handleAuthorInput}
              leftIcon={{ type: "font-awesome", name: "user-o" }}
            />
            <Input
              placeholder="Comment"
              onChangeText={this.handleCommentInput}
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
            />
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment();
                  this.resetForm();
                }}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="gray"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
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
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card>
        <Card.Title>Comments</Card.Title>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}
function RenderDish(props) {
  var view;
  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };
  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      view
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "cancelled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState))
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + props.dish.name + " to favorite?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress();
              },
            },
          ],
          { cancelable: false }
        );
      else if (recognizeComment(gestureState)) props.toggleModal();
      return true;
    },
  });
  if (props.dish != null)
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        {...panResponder.panHandlers}
        ref={(ref) => (view = ref)}
      >
        <Card style={{ flex: 1, flexDirection: "row" }}>
          <Card.Image source={{ uri: baseUrl + props.dish.image }}>
            <Card.FeaturedTitle>
              <Text style={{ color: "black" }}>{props.dish.name}</Text>
            </Card.FeaturedTitle>
          </Card.Image>
          <Text style={{ margin: 10 }}>{props.dish.description}</Text>
          <View style={styles.icons}>
            <Icon
              raised
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress()
              }
            />
            <Icon
              raised
              name="pencil"
              type="font-awesome"
              color="#512DA8"
              onPress={props.toggleModal}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  else return <View></View>;
}

const styles = StyleSheet.create({
  icons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
