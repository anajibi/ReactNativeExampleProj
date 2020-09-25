import React, { Component } from "react";
import { Text, View, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

function RenderItem(props) {
  console.log(JSON.stringify(props));
  const item = props.item;
  if (props.isLoading) return <Loading />;
  else if (props.errMess)
    return (
      <view>
        <Text>{props.errMess}</Text>
      </view>
    );
  else if (item != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + item.image }}>
          <Card.FeaturedTitle style={{ textAlign: "justify" }}>
            {item.name}
          </Card.FeaturedTitle>
          <Card.FeaturedSubtitle>
            <Text>{item.designation}</Text>
          </Card.FeaturedSubtitle>
        </Card.Image>

        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }
  animate = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.animate());
  };
  render() {
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
        >
          <RenderItem
            item={
              this.props.leaders.leaders.filter((leader) => leader.featured)[0]
            }
            isLoading={this.props.leaders.isLoading}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos2 }] }}
        >
          <RenderItem
            item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            isLoading={this.props.dishes.isLoading}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
        >
          <RenderItem
            item={
              this.props.promotions.promotions.filter(
                (promo) => promo.featured
              )[0]
            }
            isLoading={this.props.promotions.isLoading}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
