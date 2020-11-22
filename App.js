import React, {useState, useEffect} from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
} from "react-native"
import Camera from "./components/Camera";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={style.text}>RecycleMate</Text>
      <Image source={require('./images/logo.png')} style={style.image} />
      <Text style={style.text2}>"A cleaner tomorrow"</Text>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}

function CameraScreen() {
  return (
    <View style={style.container}>
      <Camera></Camera>      
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Camera" component={CameraScreen}  options= {{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  image: {
    marginBottom: 20,
    marginTop: 75,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 30,
    marginBottom: 100,
    fontStyle: 'italic',
    fontFamily: "times",
  },  
})


AppRegistry.registerComponent('HackGSU', () => App);

export default App

