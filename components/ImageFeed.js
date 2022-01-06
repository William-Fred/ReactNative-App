import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default function ImageFeed() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = () => {
    firebase
      .firestore()
      .collectionGroup("userPosts")
      .get()
      .then((snapshot) => {
        let img = snapshot.docs.map((images) => {
          const image = images.data();
          const id = images.id;
          return { id, ...image };
        });
        console.log(img);
        setImages(img);
      });
  };
  images
    .sort((a, b) => (a.creation.seconds > b.creation.seconds ? 1 : -1))
    .reverse();
  return (
    <View styles={styles.container}>
      <LinearGradient colors={["#214F4B", "#8B9D83"]}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={images}
          renderItem={({ item }) => (
            <View style={styles.feedContainer}>
              <View style={styles.shadow}>
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadURL }}
                ></Image>

                <Text style={styles.textCaption}>{item.caption}</Text>
              </View>
            </View>
          )}
        ></FlatList>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  feedContainer: {
    marginTop: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 4,
    // borderColor: "#fff",
    backgroundColor: "transparent",
  },
  textCaption: {
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#333",
  },
  image: {
    marginTop: 50,
    height: 330,
    width: 330,
    margin: 6,
    borderRadius: 10,
    borderColor: "#FAFAFA",
    borderWidth: 0.5,
  },
  shadow: {
    shadowColor: "#001524",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.0,
    elevation: 24,
  },
});
