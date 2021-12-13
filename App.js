import "react-native-gesture-handler";
import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const fetchData = () => {
    fetch("http://192.168.0.4:3001/imageuser")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
