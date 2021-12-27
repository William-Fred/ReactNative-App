import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function Map(props) {
  const posts = props.posts;
  console.log(posts);
  posts.forEach((post) => {
    console.log(post.GPSLatitude);
    console.log(post.GPSLongitude);
  });

  return (
    <View style={styles.container}>
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
          {posts.map((val, index) => {
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  list: {
    height: "50%",
  },
});
