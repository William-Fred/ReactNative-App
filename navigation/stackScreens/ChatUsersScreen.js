import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function ChatUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    fetch("http://192.168.0.4:5000/api/User", {
      method: "GET",
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setUsers(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={({ Id }, index) => Id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { users: item })}
          >
            <Text>{item.Username}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
