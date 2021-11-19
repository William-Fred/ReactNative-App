import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { InfoStackNavigator, CameraStackNavigator, HomeStackNavigator } from "./StackNavigator";
import ChatScreen from './stackScreens/ChatScreen';
const Tab = createBottomTabNavigator();


//Bottom tabs 
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({route}) =>({
        headerShown:false,
        tabBarIcon: ({focused ,color, size})=>{
            let iconName;
            let RouteName = route.name

            //check if rout name is home
            if(RouteName === 'Home'){
                iconName = focused ? 'home' : 'home-outline'
            }
            else if(RouteName === 'Api'){
                iconName = focused ? 'list' : 'list-outline'
            }
            else if(RouteName === 'Camera'){
                iconName = focused ? 'camera' : 'camera-outline'
            }

            return <Ionicons name={iconName} size={size} color={color}></Ionicons>
        },
    })}>
      
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Api" component={InfoStackNavigator} />
      <Tab.Screen name="Camera" component={CameraStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;