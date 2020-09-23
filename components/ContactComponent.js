import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

export default function () {
  return (
    <Card>
      <Card.Title>Contact Information</Card.Title>
      <Text>
        {
          "121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net"
        }
      </Text>
    </Card>
  );
}
