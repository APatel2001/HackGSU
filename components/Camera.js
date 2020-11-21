'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from "react-native-image-picker"

class Camera extends PureComponent {
    
    options = {
        title: 'Select Picture',
        customButtons: [{ name: 'Image', title: 'Pick an image:' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    };
    
    pickImage = () => {
        ImagePicker.launchImageLibrary(this.options, (response) => {
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

    state = {
        flash: false,
    }


    
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}

        />
        <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>

            <Icon.Button
                name="image"
                backgroundColor = ""
                onPress={this.pickImage.bind(this)}
                size={40}
            >
            </Icon.Button>
          
            <Icon.Button
                name="camera"
                backgroundColor=""
                onPress={this.takePicture.bind(this)}
                size={40}
            > 
            </Icon.Button>
            
            
            <Icon.Button
                name={this.state.flash ? "flash-on" : "flash-off"}
                backgroundColor = ""
                onPress={this.checkFlash.bind(this)}
                size={40}
            >
            </Icon.Button>

            
        </View>
      </View>
    );
  }

  checkFlash = () => {
    this.setState(prevState => {
        return {flash: !prevState.flash}
    })
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera