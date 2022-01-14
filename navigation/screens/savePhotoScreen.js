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
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
require("firebase/firestore");
require("firebase/firebase-firestore-compat");
export default function savePhotoScreen(props, { navigation }) {
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
      var bytes = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(
        // `transferred: ${snapshot.bytesTransferred} / ${snapshot.totalBytes} `
        bytes + "% done"
      );
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
  //Save post to userPosts and add document and attributes to userPost collection
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

  const keyboardVerticalOffset =
    Platform.OS === "ios" ? 75 : 0 && Platform.OS === "web";
  const behavior =
    Platform.OS === "ios"
      ? "height"
      : "height" && Platform.OS === "android"
      ? "padding"
      : "padding";

  //Checking if it are a image taken with the camera in the application or a image picked for the phones library.
  //And returning a view for each to show the right image to the user.
  if (props.route.params.pickedImage.length === 0) {
    return (
      <LinearGradient style={{ flex: 1 }} colors={["#214F4B", "#fff"]}>
        <KeyboardAvoidingView
          behavior={behavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.container}
        >
          <View style={styles.top_section}>
            <Image
              source={{ uri: props.route.params.image.uri }}
              style={isZoomed ? styles.largeImage : styles.smallImage}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type in image text..."
              onChangeText={(caption) => setCaption(caption)}
              style={styles.textInput}
              clearButtonMode="while-editing"
              multiline={true}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            ></TextInput>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={saveImage}>
              <Text>Save image!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#214F4B", "#fff"]}>
      <KeyboardAvoidingView
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
        <View style={styles.top_section}>
          <Image
            source={{ uri: props.route.params.pickedImage.uri }}
            style={isZoomed ? styles.largeImage : styles.smallImage}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type in image text..."
            placeholderTextColor="#fff"
            onChangeText={(caption) => setCaption(caption)}
            style={styles.textInput}
            clearButtonMode="while-editing"
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          ></TextInput>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <Text style={styles.buttonText}>Save image!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  top_section: {
    marginTop: 10,
    height: "60%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  textInput: {
    height: 120,
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8B9D83",
    backgroundColor: "#214F4B",
    opacity: 0.4,
    fontSize: 20,
    color: "#fff",
  },
  smallImage: {
    flex: 1,
    borderRadius: 10,
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
  button: {
    marginTop: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#214F4B",

    width: 100,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    textAlign: "center",
    marginTop: 10,
    color: "#fff",
  },
});
