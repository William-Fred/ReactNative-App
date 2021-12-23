import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { FlatList } from "react-native-gesture-handler";
function Map(props) {
  const posts = props.posts;
  console.log(posts);
  posts.forEach((post) => {
    console.log(post.GPSLatitude);
    console.log(post.GPSLongitude);
  });
  // console.log(posts[9].GPSLatitude);
  // console.log(posts[9].GPSLongitude);

  return (
    <View style={styles.container}>
      <View>
        {/* <FlatList
          data={posts}
          renderItem={({ item }) => ( */}
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
          {/* <MapView
              style={styles.map}
              initialRegion={{
                latitude: item.GPSLatitude,
                longitude: item.GPSLongitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
            >
              <Marker
                coordinate={{
                  latitude: item.GPSLatitude,
                  longitude: item.GPSLongitude,
                }}
                title="majorna"
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                  source={{ uri: item.downloadURL }}
                ></Image>
              </Marker>
            </MapView> */}
          {/* )}
        ></FlatList> */}
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
