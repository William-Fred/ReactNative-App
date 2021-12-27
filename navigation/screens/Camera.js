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
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "expo-modules-core";

export default function CameraScreen({ navigation }) {
  const [hasGalleryPermission, setGalleryPermission] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState([]);
  const [pickedImage, setPickedImage] = useState([]);
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
      setImage(photo.uri);
      console.log(photo);
      setPickedImage([]);
    }
  };
  //Pick images from media library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      exif: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    // console.log(result.exif.GPSLatitude);
    // console.log(result.exif.GPSLongitude);

    if (result.cancelled === false) {
      setPickedImage(result);
      console.log(result);
    }
  };

  //convert
  const maniPulateImage = async () => {
    const manipResult = await manipulateAsync(image, [{ rotate: 0 }], {
      compress: 0.1,
      format: SaveFormat.JPEG,
    });
    console.log(manipResult.uri);
    // setImage(manipResult);
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
              <Button
                title="compress"
                onPress={() => maniPulateImage()}
              ></Button>
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
                onPress={() =>
                  navigation.navigate("savePhoto", { pickedImage, image })
                }
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
          <View
            style={{
              flex: 0.3,
              height: "10%",
              width: "50%",
              marginLeft: 20,
            }}
          >
            {pickedImage && (
              <TouchableOpacity
                onPress={toogleZoom}
                style={isZoomed ? styles.largeImage : styles.smallImage}
              >
                <Image
                  source={{ uri: pickedImage.uri }}
                  style={isZoomed ? styles.largeImage : styles.smallImage}
                />
                {isZoomed}
              </TouchableOpacity>
            )}
            {image && (
              <TouchableOpacity
                onPress={toogleZoom}
                style={isZoomed ? styles.largeImage : styles.smallImage}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={isZoomed ? styles.largeImage : styles.smallImage}
                />
                {isZoomed}
              </TouchableOpacity>
            )}
          </View>
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
    height: "70%",
    width: "70%",
    borderRadius: 100,
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
