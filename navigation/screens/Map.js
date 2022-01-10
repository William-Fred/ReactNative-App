import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function Map(props) {
  const posts = props.posts;

  const [updatedPost, setUpdatedPosts] = useState([]);

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
        console.log(updatedPost);
      });
  };
  // console.log(posts);
  console.log(updatedPost);
  return (
    <View style={styles.container}>
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
          >
            {/* <Text style={styles.text}>Get latest</Text> */}
          </Ionicons>
        </View>
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
                key={index}
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
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});
export default connect(mapStateToProps, null)(Map);
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  top: {
    marginLeft: 10,
    height: "5%",
    backgroundColor: "transparent",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
// console.log(posts);
// const [posts, setPosts] = useState(props.posts);
