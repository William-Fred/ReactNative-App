import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function MapScreen(props) {
  const [updatedPost, setUpdatedPosts] = useState([]);

  //Refresh images to show up on the map, if new images are uploaded.
  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((images) => {
          const data = images.data();
          const id = images.id;
          return { id, ...data };
        });
        setUpdatedPosts(posts);
      });
  };

  //Map is always starting on initial region coordinates, Gothenburg.
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 57.693225,
          longitude: 11.926355555555554,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      >
        <View style={styles.top}>
          <Ionicons
            name="refresh-circle"
            style={styles.icon}
            onPress={getUserPosts}
          ></Ionicons>
        </View>
        {/* looping through every object in updatedPost list and placing a marker with a image and the objects coordinates, for each object in the list */}
        {updatedPost.map((val, index) => {
          return (
            <Marker
              coordinate={{
                latitude: val.GPSLatitude,
                longitude: val.GPSLongitude,
              }}
              key={index}
              title={val.caption}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 100 }}
                source={{ uri: val.downloadURL }}
              ></Image>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}
export default MapScreen;
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  top: {
    marginLeft: 10,
    height: "5%",
    backgroundColor: "transparent",
  },

  button: {
    backgroundColor: "#fff",
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#214F4B",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    backgroundColor: "#214F4B",
    opacity: 0.6,
    marginTop: 10,
  },
  icon: {
    fontSize: 40,
    color: "#214F4B",
  },
});
