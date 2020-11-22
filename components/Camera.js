import React, { PureComponent } from 'react';
import Modal, { ModalContent } from 'react-native-modals';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Button, Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from "react-native-image-picker"
const API_KEY = 'AIzaSyCy97f35oLhKxB-ecV08bdYLV-nY23VzWs';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log('callGoogleVisionAsync -> result', result);

  return result.responses[0].labelAnnotations[0].description;
}


class Camera extends PureComponent {
    
    constructor(props) {
      super(props);
      this.state = {
        flash: false,
        image: null,
        status: null,
        firstModal: false,
        secondModal: false,
        thirdModal: false,
      }

      
    }

    // TODO Modal main function

    firstModalFunction = () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          firstModal: !prevState.firstModal
        }
      })
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
    pickImage = async () => {
        image = null;
        ImagePicker.launchImageLibrary(this.options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            if (image == null) {
              image = await response.data
              try {
                const result = await callGoogleVisionAsync(image);
                console.log(result);
                this.firstModalFunction();
                this.setState({ status: result });
              } catch (error) {
                this.setState({ status: "Failed" })
              }
            }
          }
            }
        )

    }
    
  render() {


    return (


      <View style={styles.container}>

        <Modal visible={this.state.firstModal}>
          <View style={styles.modalView}>
            <Text style={styles.textModal}>{this.state.status + " " + "is recyclable"}</Text>
            <Image source={require('../images/vector.png')} style={{width: 100, height: 100}} resizeMode="contain"/>
            <View style={{alignItems: "stretch"}}>
              <Button color="#20d623" style={styles.modalButton} title="OK" onPress={this.firstModalFunction.bind(this)} />

            </View>
          </View>
        </Modal>


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
      this.setState({ image:  data.uri})
      this.setState({ status: 'Loading....' })
      try {
        const result = await callGoogleVisionAsync(data.base64);
        console.log(result);
        this.setState({ status: result });
        this.firstModalFunction();
      } catch (error) {
        this.setState({ status: "Failed" })
      }
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


  modalView: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: 200,
    height: 250,
  },

  modalButton: {
    alignSelf: "stretch"
  },

  textModal: {
    fontSize: 15,
    marginTop: 20
  }
});



export default Camera