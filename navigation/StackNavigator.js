import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import CameraScreen from "./screens/Camera";
import savePhoto from "./screens/savePhoto";
import LegendDetails from "./stackScreens/legendDetailScreen";
import ChatScreen from './stackScreens/ChatScreen';

const Stack = createStackNavigator();



const ProfileStackNavigator = () =>{
    
}
const CameraStackNavigator = () =>{
    return(
        <Stack.Navigator>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="savePhoto" component={savePhoto} />
        </Stack.Navigator>
    )
}
const InfoStackNavigator = () =>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="Information" component={InfoScreen}></Stack.Screen>
        <Stack.Screen name="LegendDetails" component={LegendDetails} />
    </Stack.Navigator>
    )
}
const HomeStackNavigator = () =>{
    return(
        <Stack.Navigator>
        <Stack.Screen name="Homes" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    )
}
export { CameraStackNavigator, HomeStackNavigator, InfoStackNavigator}  ;