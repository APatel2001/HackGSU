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

  var [picture, setPicture] = useState("");

  const pictureHandler = (image64) => {
    setPicture(() => {picture: image64})
  }
  
  useEffect(() => {
    // monitors for change in the picture state
    return () => {

      Alert.alert(
        
        "Picture",
        "Picture Taken",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }, [picture])

  return (
    <View style={style.container}>
      
      <Camera passed={pictureHandler}></Camera>
      {console.log(picture)}
      
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
