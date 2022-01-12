import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
export default function MapImageInfo(props) {
  //   console.log(props.route);

  const receivedObj = props.route.params;
  console.log(receivedObj);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: receivedObj.image }}></Image>
      <Text>{receivedObj.caption}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});
