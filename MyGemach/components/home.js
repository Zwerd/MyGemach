import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";
import Card from "./Card";
import {createStackNavigator} from 'react-navigation'

let {height, width} = Dimensions.get('window');
const options={
  title:null,
  takePhotoButtonTitle:'צלם תמונה',
  chooseFromLibraryButtonTitle:'בחר מספריה מקומית',
  cancelButtonTitle: 'ביטול'
}


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:null,
      displayGemach: false,
      gemachName: '',
      gemachDescription: '',
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
      console.log("pickedImage: " +this.state.pickedImage)
      }
    });
  }

  createGemach(){
    let today  = new Date();
    this.setState({
      displayGemach:true,
      date: today.toLocaleDateString("en-US")
    });
    console.log("pickedImage: " +this.state.pickedImage)
    this.refs.creator.close()
  }

  resetHandler = () =>{
    this.reset();
  }

  reset = () => {
    this.setState({
      pickedImage: null
    });
  }

  createDate(){
    let date = String(new Date())
    this.setState({
      date: date
    })
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
          style={styles.textInput}
          onChangeText={(text) => this.setState({gemachName: text})}
        />
        <Text style={{fontSize:StatusBar.currentHeight}}>תיאור:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({gemachDescription: text})}
        />
        <TouchableOpacity
          style={styles.head}
          onPress={this.pickImageHandler}
          >
          <Text style={{fontSize:StatusBar.currentHeight}}>בחר תמונה</Text>
          <Image source={this.state.pickedImage}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.head}
          onPress={() => this.createGemach()}
          >
          <Text style={{fontSize:StatusBar.currentHeight}}>אישור</Text>
        </TouchableOpacity>
      </Modal>


        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.head}>
          <Text style={{fontSize:StatusBar.currentHeight}}>הגמח שלי</Text>
        </View>
        {this.state.displayGemach &&
          <TouchableOpacity
            style={styles.displayGemach}
            onPress={() => this.refs.creator.open()}
            >
            <View style={{ flexDirection: 'row-reverse'}}>
              <View style={[styles.View,styles.ViewTitle]}>
                <Text>שם הגמח: {this.state.gemachName}</Text>
                <Text>תיאור: {this.state.gemachDescription}</Text>
                <Text>תאריך פתיחה: {this.state.date}</Text>
              </View>
              <View style={[styles.View,styles.ViewImage]}>
                <Image source={this.state.pickedImage} style={styles.previewImage}/>
              </View>
            </View>
          </TouchableOpacity>
        }

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
  textInput:{
    fontSize:StatusBar.currentHeight,
    borderColor: 'black',
    borderRadius:10,
    borderWidth: 2,
    margin:5,
  },
  displayGemach:{
    backgroundColor: 'rgba(255,255,255, 0.8)',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  View:{
    backgroundColor: "white",
    height: height/8,
    margin:2,
  },
  ViewTitle: {
    width: ((width-22)/4) * 3,
  },
  ViewImage:{
    width: (width-22)/4,
    borderColor: "black",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius:10,
  }
});
