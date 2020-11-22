import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from "react-native-image-picker"

class Camera extends PureComponent {
    

    constructor(props) {
      super(props);
      this.state = {
        flash: false,
      }
    }

    options = {
        title: 'Select Picture',
        customButtons: [{ name: 'Image', title: 'Pick an image:' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.5,
        base64: true
    };
    
    // TODO pickImage
    pickImage = () => {
        ImagePicker.launchImageLibrary(this.options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            // console.log(response.data)
            this.props.passed(response.data)
            
          }
            }
        )
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
        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", backgroundColor: 'rgba(52, 52, 52, 0.0)' }}>

            <Icon.Button
                name="image"
                backgroundColor= "rgba(52, 52, 52, 0.0)"
                onPress={this.pickImage.bind(this)}
                size={40}
            >
            </Icon.Button>
          
            <Icon.Button
                name="camera"
                backgroundColor="rgba(52, 52, 52, 0.0)"
                onPress={this.takePicture.bind(this)}
                size={40}
            > 
            </Icon.Button>
            
            
            <Icon.Button
                name={this.state.flash ? "flash-on" : "flash-off"}
                backgroundColor = "rgba(52, 52, 52, 0.0)"
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

  //TODO takePicture
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // console.log(data.base64);
      this.props.passed(data.base64);

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(52, 52, 52, 1.0)'
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