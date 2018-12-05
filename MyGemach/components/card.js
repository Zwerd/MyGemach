import React, {Component} from 'react';
import {Dimensions, Image,ImageBackground, TouchableOpacity, StyleSheet, Text, View,StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Modal from 'react-native-modalbox';
let dim = Dimensions.get('window');
let height = StatusBar.currentHeight * 1.5
class Card extends Component {
constructor(props) {
  super(props);
  this.state = {
    };
}
render(){

  return(
  <TouchableOpacity
    onPress={this.props.navigate}
    style={styles.display}
    >
    <View style={{ flexDirection: 'row-reverse'}}>
      <View style={styles.View}>
        <Text>שם: {this.props.name}</Text>
        <Text>תיאור: {this.props.description}</Text>
        <Text>תאריך: {this.props.date}</Text>
      </View>
      <View style={[styles.View,styles.ViewImage]}>
        <ImageBackground source={this.props.pickedImage} style={styles.previewImage,{borderRadius:5}}>
        {this.props.removeItem &&
          <TouchableOpacity style={{width: height,height: height}} onPress={console.log('the item removed')}>
            <Image source={require('../images/miniRemove.png')} style={{width: "100%",height: "100%"}}/>
          </TouchableOpacity>}
        </ImageBackground>
      </View>
    </View>
  </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  display:{
    backgroundColor: 'rgba(255,255,255, 0.8)',
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    marginBottom:0,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  View:{
    backgroundColor: "white",
    height: dim.height/8,
    width: ((dim.width-10)/4) * 3,
    borderRadius: 10,
    padding:2,
  },
  ViewImage:{
    width: (dim.width-16)/4,
    borderRadius:10,
  },
  previewImage: {
    width: "100%",
    height: "100%",

  }
});

export default Card
