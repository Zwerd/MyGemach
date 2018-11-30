import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Modal from 'react-native-modalbox';
let dim = Dimensions.get('window');

class Item extends Component {
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
        <Image source={this.props.pickedImage} style={styles.previewImage}/>
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
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius:10,
  }
});

export default Item
