import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
require("firebase/firestore");
require("firebase/firebase-firestore-compat");
export default function savePhoto(props, { navigation }) {
  console.log(props.route.params);
  const [isZoomed, setIsZoomed] = useState(false);
  const [caption, setCaption] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [sentUri, setSentUri] = useState("");
  useEffect(() => {
    if (props.route.params.image.length === 0) {
      if (
        props.route.params.pickedImage.exif == undefined ||
        props.route.params.pickedImage.exif == undefined
      ) {
        setLongitude(0);
        setLatitude(0);
      } else {
        setLongitude(props.route.params.pickedImage.exif.GPSLongitude);
        setLatitude(props.route.params.pickedImage.exif.GPSLatitude);
      }
    }
    if (props.route.params.image.length === 0) {
      setSentUri(props.route.params.pickedImage.uri);
    }
    if (props.route.params.pickedImage.length === 0) {
      setSentUri(props.route.params.image.uri);
    }
  });

  //Toggle between full scale picture and small size picture when the user has taken a picture from camera
  const toogleZoom = () => {
    console.log("toogle");
    setIsZoomed((previousState) => !previousState);
  };

  //saving image to firebase storage where a map called posts is holding all images
  const saveImage = async () => {
    const uri = sentUri;
    const path = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    console.log(path);
    console.log(uri);
    const response = await fetch(uri);
    const blob = await response.blob();
    //https://firebase.google.com/docs/storage/web/upload-files
    //Calling firebase storage at first. The ref method is a relative path to initialize the reference with,
    //for example path/to/image.jpg. Ref - returns a reference to a relative path from this reference.
    //Put- uploads data to this reference's location.
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
    task.on("USER_POSTS_STATE_CHANGED", taskProgress, taskError, taskCompleted);
  };

  //https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-8_2
  //Save post to userPosts and add attributes to userPost doc
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
        GPSLongitude: longitude,
        GPSLatitude: latitude,
      })
      .then(() => {
        props.navigation.popToTop();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(longitude);
  console.log(latitude);
  console.log(sentUri);

  if (props.route.params.pickedImage.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.top_section}>
          <TouchableOpacity
            onPress={toogleZoom}
            style={isZoomed ? styles.largeImage : styles.smallImage}
          >
            <Image
              source={{ uri: props.route.params.image.uri }}
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
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 100,
          }}
        >
          <Button
            style={{ marginTop: 200, marginLeft: 200 }}
            title="Save image"
            onPress={saveImage}
          ></Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.top_section}>
        <TouchableOpacity
          onPress={toogleZoom}
          style={isZoomed ? styles.largeImage : styles.smallImage}
        >
          <Image
            source={{ uri: props.route.params.pickedImage.uri }}
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
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 100,
        }}
      >
        <Button
          style={{ marginTop: 200, marginLeft: 200 }}
          title="Save image"
          onPress={saveImage}
        ></Button>
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
