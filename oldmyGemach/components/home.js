import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modalbox';
import Card from "./Card";
import {createStackNavigator} from 'react-navigation'

let {height, width} = Dimensions.get('window');
const options={
  title:'Image Picker App',
  takePhotoButtonTitle:'Take a Photo using camera',
  chooseFromLibraryButtonTitle:'Pick Image from Library',
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
      pickedImage: null
     };
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });

      }
    });
  }

  resetHandler = () =>{
    this.reset();
  }

  render() {
    return (
      <View style={styles.container}>
      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"creator"}
        >
        <Text style={{fontSize:StatusBar.currentHeight}}>שם הגמח:</Text>
        <TextInput
          style={{fontSize:StatusBar.currentHeight, borderColor: 'gray', borderWidth: 2}}
          onChangeText={(text) => this.setState({text})}
          Placeholder='check'
        />
        <Text style={{fontSize:StatusBar.currentHeight}}>תיאור:</Text>
        <TextInput
          style={{fontSize:StatusBar.currentHeight, borderColor: 'gray', borderWidth: 2}}
          onChangeText={(text) => this.setState({text})}
          Placeholder='check'
        />
        <Text style={{fontSize:StatusBar.currentHeight}}>בחר תמונה</Text>

      </Modal>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.head}>
          <Text style={{fontSize:StatusBar.currentHeight}}>הגמח שלי</Text>
        </View>
          <TouchableOpacity
            style={styles.head}
            onPress={() => this.refs.creator.open()}
            >
            <Text style={{fontSize:StatusBar.currentHeight}}>צור גמח חדש</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  head:{
    backgroundColor: 'rgba(192,192,192, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modalbox:{
    height: null,
    borderWidth: 2,
    borderRadius: 10,
  },

});
