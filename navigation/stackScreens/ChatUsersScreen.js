import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default function ChatUsersScreen({ navigation }, props) {
  console.log(props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let allUsers = [];
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        console.log("total users: ", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(documentSnapshot.data());
          allUsers.push(documentSnapshot.data());
        });
        setUsers(allUsers);
      });
  }, []);
  console.log(users);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        row={3}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat", { users: item });
            }}
          >
            <Text style={styles.user}>{item.Name}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    margin: 10,
  },
  user: {
    color: "#fff",
  },
});
