import React from 'react'
import { View,Text, Image, StyleSheet, TextInput } from 'react-native';


export default function savePhoto(props) {
    console.log(props.route.params.image)
    return (
        <View style={styles.container}> 
            <Image style={styles.image}source={{uri: props.route.params.image}}>
            </Image>
            <TextInput style={styles.textInput}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 300,
        height: 300,
    },
    textInput:{
        height: 50, 
        borderWidth: 2,
        borderRadius: 10
      }
})