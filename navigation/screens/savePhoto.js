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

export default function savePhoto(props) {
  console.log(props.route.params.image);
  const [isZoomed, setIsZoomed] = useState(false);

  //Toggle between full scale picture and small size picture when the user has taken a pciture from camera
  const toogleZoom = () => {
    console.log("toogle");
    setIsZoomed((previousState) => !previousState);
  };

  const saveImage = () => {
    const id = 0;
    const fileToUpload = props.route.params.image;
    const data = new FormData();
    data.append("image", fileToUpload);
    fetch("http://192.168.0.4:5000/api/Image/Image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
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
