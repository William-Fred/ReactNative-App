import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
require("firebase/firestore");
// require("firebase/firebase-storage");
export default function savePhoto(props, { navigation }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [caption, setCaption] = useState("");
  //Toggle between full scale picture and small size picture when the user has taken a pciture from camera
  const toogleZoom = () => {
    console.log("toogle");
    setIsZoomed((previousState) => !previousState);
  };

  const saveImage = async () => {
    const uri = props.route.params.image;
    const path = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(10)}`;

    console.log(path);

    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(path).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePost(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  //Save post
  const savePost = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_section}>
        <TouchableOpacity
          onPress={toogleZoom}
          style={isZoomed ? styles.largeImage : styles.smallImage}
        >
          <Image
            source={{ uri: props.route.params.image }}
            style={isZoomed ? styles.largeImage : styles.smallImage}
          />
          {isZoomed && (
            <Ionicons name="arrow-back" style={styles.icon}></Ionicons>
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type in image text..."
          onChangeText={(caption) => setCaption(caption)}
          style={styles.textInput}
        ></TextInput>

        <View>
          <Button title="Save image" onPress={saveImage}></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  top_section: {
    height: "50%",
    width: "100%",
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  textInput: {
    height: 120,
    width: 230,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 7,
  },
  smallImage: {
    height: 120,
    width: 120,
    borderRadius: 15,
  },

  largeImage: {
    height: "100%",
    width: "100%",
  },
  icon: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    position: "absolute",
    left: 10,
    top: 10,
    borderWidth: 3,
    borderColor: "white",
  },
});
