import React from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  Button,
} from "react-native"
import ImagePicker from "react-native-image-picker"
import Camera from "./components/Camera";

const options = {
  title: 'Select Picture',
  customButtons: [{ name: 'Image', title: 'Pick an image:' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const App = () => {

  const pickImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
        }
      )
    }
  return (
    <View style={style.container}>
      <Camera></Camera>
      <Button
        title = "Choose an image from the gallery"
        onPress={pickImage}
      ></Button>
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
