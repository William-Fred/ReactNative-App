import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
          {/* <Image source={{ uri: props.route.params.image }}></Image> */}
        </TouchableOpacity>
        <TextInput
          placeholder="Type in image text..."
          style={styles.textInput}
        ></TextInput>
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
    width: 225,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  smallImage: {
    height: "50%",
    width: "50%",
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
