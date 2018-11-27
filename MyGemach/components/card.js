import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation'
let dim = Dimensions.get('window');

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
    style={styles.displayGemach}
    >
    <View style={{ flexDirection: 'row-reverse'}}>
      <View style={[styles.View,styles.ViewTitle]}>
        <Text>שם הגמח: {this.props.gemachName}</Text>
        <Text>תיאור: {this.props.gemachDescription}</Text>
        <Text>תאריך פתיחה: {this.props.date}</Text>
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
    height: dim.height/8,
    margin:2,
  },
  ViewTitle: {
    width: ((dim.width-22)/4) * 3,
  },
  ViewImage:{
    width: (dim.width-22)/4,
    borderColor: "black",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius:10,
  }
});

export default Card
