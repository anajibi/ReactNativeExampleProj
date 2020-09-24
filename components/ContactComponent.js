import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

export default function () {
  return (
    <Card>
      <Animatable.View animation="fadeInDownBig" duration={2000} delay={1000}>
        <Card.Title>Contact Information</Card.Title>
        <Text>
          {
            "121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net"
          }
        </Text>
      </Animatable.View>
    </Card>
  );
}
