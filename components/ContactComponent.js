import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
export default class ContactComponent extends React.Component {
  render() {
    return (
      <Card>
        <Animatable.View animation="fadeInDownBig" duration={2000} delay={1000}>
          <Card.Title>Contact Information</Card.Title>
          <Text>
            {
              "121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net"
            }
          </Text>
          <Button
            title=" Send Email"
            buttonStyle={{ backgroundColor: "#512DA8" }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.sendMail}
          />
        </Animatable.View>
      </Card>
    );
  }
  sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "Enquiry",
      body: "To whom it may concern:",
    });
  };
}
