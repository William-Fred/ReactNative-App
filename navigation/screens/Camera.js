import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "expo-modules-core";

export default function CameraScreen({ navigation }) {
  const [hasGalleryPermission, setGalleryPermission] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      // if (Platform.OS !== 'web') {
      const { libraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cancel === true) {
        setGalleryPermission(libraryStatus === "granted");
      }
    })();
    return () => {
      cancel = false;
    };
  }, []);

  //Take pictures
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync(null);
      //console.log(photo)
      setImage(photo.uri);
      console.log(photo.uri);
    }
  };
  //Pick images from media library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (result.cancelled === false) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  //Toggle between full scale picture and small size picture when the user has taken a pciture from camera
  const toogleZoom = () => {
    console.log("toogle");
    setIsZoomed((previousState) => !previousState);
  };

  if (hasPermission === null || hasGalleryPermission === false) {
    return <View></View>;
  }
  if (hasPermission === false || hasGalleryPermission === false) {
    return <Text>No acces to camera!</Text>;
  }

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Camera style={{ flex: 1 }} type={type} ref={(ref) => setCamera(ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
          }}
        >
          <View style={styles.photoPanel}>
            <View>
              <Ionicons
                style={styles.imageIcon}
                name="image-outline"
                onPress={() => pickImage()}
              ></Ionicons>
            </View>

            <View>
              <Pressable style={styles.buttton_parent}>
                <Pressable
                  style={styles.button_child}
                  onPress={() => takePicture()}
                ></Pressable>
              </Pressable>
            </View>
            <View>
              <Ionicons
                style={styles.saveIcon}
                name="checkmark-outline"
                onPress={() => navigation.navigate("savePhoto", { image })}
              ></Ionicons>
            </View>
          </View>

          <View style={styles.cameraIconContainer}>
            <Ionicons
              name="camera-reverse"
              style={styles.cameraIcon}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            ></Ionicons>
          </View>

          {/* Displaying image */}
          {image && (
            <TouchableOpacity
              onPress={toogleZoom}
              style={isZoomed ? styles.largeImage : styles.smallImage}
            >
              <Image
                source={{ uri: image }}
                style={isZoomed ? styles.largeImage : styles.smallImage}
              />
              {isZoomed && (
                <Text style={{ position: "absolute", left: "50%", top: "50%" }}>
                  Go back
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  photoPanel: {
    backgroundColor: "transparent",
    height: "10%",
    width: "100%",
    flexDirection: "row",
    bottom: 1,
    borderRadius: 10,
    position: "absolute",
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  button_child: {
    borderRadius: 150,
    padding: 10,
    elevation: 20,
    backgroundColor: "white",
    margin: 5,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 5,
  },
  buttton_parent: {
    borderRadius: 150,
    elevation: 20,
    margin: 5,
    backgroundColor: "white",
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  smallImage: {
    height: "50%",
    width: "50%",
  },
  largeImage: {
    height: "100%",
    width: "100%",
  },
  save: {
    marginLeft: 80,
    marginTop: 15,
  },
  saveIcon: {
    fontSize: 40,
    color: "white",
  },
  imageIcon: {
    alignItems: "center",
    fontSize: 40,
    color: "white",
  },
  cameraIconContainer: {
    alignItems: "flex-end",
  },
  cameraIcon: {
    fontSize: 40,
    color: "white",
    marginRight: 10,
  },
});
