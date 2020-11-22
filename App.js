import React, {useState, useEffect} from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
} from "react-native"

import Camera from "./components/Camera";


const App = () => {

  return (
    <View style={style.container}>
      <Camera></Camera>      
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  }
  
})


AppRegistry.registerComponent('HackGSU', () => App);

export default App
