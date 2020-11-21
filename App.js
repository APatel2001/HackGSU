import React, {useState} from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  Button,
} from "react-native"

import Camera from "./components/Camera";


const App = () => {

  const [picture, setPicture] = useState();

  const pictureHandler = (image) => {
    setPicture(() => {picture = image})
  }
  
  return (
    <View style={style.container}>
      
      <Camera passed={pictureHandler}></Camera>

      
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
