import React, {Component} from 'react';
import {FlatList, Alert, Switch, TextInput, Dimensions, Image,ImageBackground, TouchableOpacity, StyleSheet, Text, View,StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation'
import OptionsMenu from "react-native-options-menu";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';



let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 1.5
let today  = new Date();

const myIcon = (<View name="rocket" size={30} color="#900" />)

export default class ItemDetails extends Component {
constructor(props) {
  super(props);
  this.state = {
    backgroundColor:this.props.backgroundColor,
    pressed:false,
    delivered:false,
    customerData:'',
    };
}

delivered(){
  if(this.state.delivered){
    return "אינו זמין"
  }else{
    return "זמין"
  }
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

pressed(){
  Activity.openOptionsMenu()
}
  /*
 Alert.alert(
    'null',
    [
      {text: 'מסירה', onPress: () => false, style: 'cancel'},
      {text: 'צפייה', onPress: () => false, style: 'cancel' },
      {text: 'החזרה', onPress: () => false, style: 'cancel' },
      {text: 'היסטוריה', onPress: () => false, style: 'cancel' },
    ]
  )
}
*/

delivered(){
  Alert.alert(
    'מסירת פריט',
    'האם למחוק את הפריטים שנבחרו לצמיתות?',
    [
      {text: 'ביטול', onPress: () => false, style: 'cancel'},
      {text: 'אישור', onPress: () => this.remove() }
    ],
  )
}

//this.props.callbackModalbox(this.props.itemNumber)
render(){
  return(
  <View style={[{backgroundColor:this.props.backgroundColor},styles.display]}>
  <TouchableOpacity
    onLongPress={() => this.props.callbackFromItems(this.props.itemNumber)}
    onPress={() => alert('pressed!')}
    >
    <View style={{ flexDirection: 'row-reverse'}}>
      <View style={[styles.View,styles.ViewImage,{flex:2}]}>
        <ImageBackground source={this.props.pickedImage} style={[styles.previewImage,{flexDirection: 'row-reverse'}]}>
          <View style={{backgroundColor:'red',borderRadius:25,height:barHeight,width:barHeight}}></View>
        </ImageBackground>
      </View>
      <View style={[styles.View,{flex:4}]}>
        <Text style={{fontSize:StatusBar.currentHeight}}>{this.props.itemNumber+1}. {this.props.name}</Text>
        <Text>{this.state.customerData}</Text>
        <Text>{this.delivered()}</Text>
      </View>


          <Menu onSelect={value => alert(`Selected number: ${value}`)}>
            <MenuTrigger>
              <Image source={require('../images/miniMenu.png')} style={{width: barHeight, height: barHeight}}/>
            </MenuTrigger>
            <MenuOptions >
              <MenuOption value={1} style={{fontSize:barHeight/2}} text='מסירה'/>
              <MenuOption value={2} disabled={false} style={{fontSize:barHeight/2}} text='צפיה'/>
              <MenuOption value={3} disabled={true} style={{fontSize:barHeight/2}} text='החזרה'/>
              <MenuOption style={{margin:2, borderTopWidth:1, borderColor:'#00B0F0',fontSize:barHeight/2}} value={4} text='היסטוריה'/>
            </MenuOptions>
          </Menu>

    </View>
  </TouchableOpacity>





  </View>
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
  textInput:{
    flex:1,
    fontSize:StatusBar.currentHeight,
    borderColor: 'black',
    borderRadius:5,
    borderWidth: 1,
    margin:2,
  },
  View:{
    height: dim.height/6,
    width: ((dim.width-11)/4) * 3,
    borderWidth:null,
    borderRadius: 10,
    padding:2,
  },
  ViewImage:{
    width: (dim.width-16)/3,
    overflow: 'hidden',
  },
  previewImage: {
    width: "100%",
    height: "100%",
  }
});
