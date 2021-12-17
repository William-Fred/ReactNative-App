import * as React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollContainer,
  ImageBackground,
  Image,
} from "react-native";

export default function HomeScreen({ navigation, route }) {
  return (
    <ImageBackground
      source={require("./../../images/nature.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Photo and chat app!</Text>
          <View style={styles.iconPosition}>
            <Ionicons
              style={styles.topBarChatIcon}
              name="ios-chatbubbles-outline"
              onPress={() => navigation.navigate("ChatUsersScreen")}
            ></Ionicons>
          </View>
        </View>
        <View
          style={{
            paddingLeft: 120,
            justifyContent: "center",
            alignitems: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}> </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  div: {
    backgroundColor: "#333",
    paddingTop: 50,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  topBar: {
    height: "10%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topBarText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Arial",
    fontStyle: "italic",
    marginLeft: 105,
  },
  iconPosition: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    width: 35,
    height: 35,
    marginLeft: 50,
  },
  topBarChatIcon: {
    color: "white",
    flexDirection: "row",
    borderColor: "white",
    fontSize: 20,
    marginLeft: 7,
    marginTop: 5,
  },
});
