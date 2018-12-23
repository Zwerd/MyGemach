import React, {Component} from 'react';
import {Dimensions, Image,ImageBackground, TouchableOpacity, StyleSheet, Text, View,StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Modal from 'react-native-modalbox';
let dim = Dimensions.get('window');
let height = StatusBar.currentHeight * 1.5

export default class ItemDetails extends Component {
constructor(props) {
  super(props);
  this.state = {
    backgroundColor:this.props.backgroundColor,
    };
}
/*
selectedItem(){
  if(this.state.backgroundColor === 'rgb(201,241,255)'){
    //this.setState({backgroundColor:'white'})
    this.props.callbackSelectedItem('remove',this.props.itemNumber)
  }else{
    //this.setState({backgroundColor:'rgb(201,241,255)'})
    this.props.callbackSelectedItem('add', this.props.itemNumber)
  }
}
*/

render(){
  return(
  <TouchableOpacity
    onLongPress={() => this.props.callbackFromItems(this.props.itemNumber)}
    onPress={() => this.props.callbackModalbox(this.props.itemNumber)}
    style={[{backgroundColor:this.props.backgroundColor},styles.display]}
    >
    <View style={{ flexDirection: 'row-reverse'}}>
      <View style={styles.View}>
        <Text>שם: {this.props.name}</Text>
        <Text>תיאור: {this.props.description}</Text>
        <Text>תאריך: {this.props.date}</Text>
        <Text>מספר: {this.props.itemNumber+1}</Text>
      </View>
      <View style={[styles.View,styles.ViewImage]}>
        <ImageBackground source={this.props.pickedImage} style={styles.previewImage}>
        </ImageBackground>
      </View>
    </View>
  </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  display:{
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    marginRight:null,
    marginBottom:0,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  View:{
    height: dim.height/8,
    width: ((dim.width-11)/4) * 3,
    borderWidth:null,
    borderRadius: 10,
    padding:2,
  },
  ViewImage:{
    width: (dim.width-16)/4,
    overflow: 'hidden',
  },
  previewImage: {
    width: "100%",
    height: "100%",
  }
});
