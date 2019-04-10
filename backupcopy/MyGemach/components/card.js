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
    onLongPress={() => this.props.callbackSelectedItem(this.props.itemNumber)}
    onPress={this.props.navigate}
    style={{backgroundColor:this.props.backgroundColor, borderWidth:1,borderColor:'#00B0F0',margin:5,marginBottom:0,padding:2}}
    >
    <View style={{flexDirection: 'row'}}>
      <Image source={this.props.pickedImage} style={{flex:1,borderRadius:2}}/>
      <View style={{flex:3,flexDirection:'column',margin:5,marginRight:0,marginBottom:0}}>
        <Text style={{fontSize:StatusBar.currentHeight}}>{this.props.itemNumber}. {this.props.name}</Text>
        <Text style={{fontSize:StatusBar.currentHeight/1.5}}>{this.props.description}</Text>
        <Text style={{fontSize:StatusBar.currentHeight/1.5}}>{this.props.date}</Text>
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
    borderWidth:1,
    borderColor:'#00B0F0',
  },
  View:{
    height: dim.height/8,

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

export default Card
