import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
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
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          isLoading={this.props.leaders.isLoading}
        />
        <RenderItem
          item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
