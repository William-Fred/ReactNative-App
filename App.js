import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react'
import { NavigationContainer}from '@react-navigation/native';
import BottomTabNavigator from './navigation/TabNavigator';

function App(){
  
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>

    
  );
}

export default App;