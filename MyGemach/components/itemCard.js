import React, {Component} from 'react';
import {FlatList, Alert, Switch, TextInput, Dimensions, Image,ImageBackground, TouchableOpacity, StyleSheet, Text, View,StatusBar} from 'react-native';
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

export default class ItemCard extends Component {
constructor(props) {
  super(props);
  this.state = {
    backgroundColor:this.props.backgroundColor,
    pressed:false,
    delivered:this.props.delivered,
    customerData:{data:1,checking:2},
    status:true,
    disabled:{fontSize:barHeight/2,fontWeight:'bold',color:'#DCDCDC'},
    enabled:{fontSize:barHeight/2,color:'black'}
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

checkValue(value){
  if(value==1){
    return this.deliver()
  }else if(value==2){
    return this.returned()
  }else if(value==3){
    return this.historiesView()
  }
}

deliver(){
  this.props.callDeliverModalbox(this.props.itemNumber)
}

returned(){
  this.props.callReturnedModalbox(this.props.itemNumber)
}

historiesView(){
  this.props.callHistoriesModalbox(this.props.itemNumber)
  console.log('check')
}


//this.props.callbackModalbox(this.props.itemNumber)
render(){
  return(

  <View style={[{backgroundColor:this.props.backgroundColor},styles.display]}>
  <TouchableOpacity
    onLongPress={() => this.props.callbackFromItems(this.props.itemNumber)}
    onPress={() => this.props.callRenderItemDetails(this.props.itemNumber)}
    >
    <View style={{ flexDirection: 'row-reverse'}}>
      <View style={[styles.View,styles.ViewImage,{flex:2}]}>
        <ImageBackground source={this.props.pickedImage} style={[styles.previewImage,{flexDirection: 'row-reverse'}]}>
          <View style={{backgroundColor:!this.props.delivered&&'green'||'red',borderRadius:25,height:barHeight/2,width:barHeight/2}}></View>
        </ImageBackground>
      </View>
      <View style={[styles.View,{flex:4}]}>
        <Text style={{fontSize:StatusBar.currentHeight}}>{this.props.itemNumber+1}. {this.props.name}</Text>
        <Text>{JSON.stringify(this.props.customerData)}</Text>
        <Text>{console.log('check')}</Text>
      </View>

         <Menu onSelect={value => this.checkValue(value)}>
            <MenuTrigger>
              <Image source={require('../images/miniMenu.png')} style={{width: barHeight, height: barHeight}}/>
            </MenuTrigger>
            <MenuOptions >
              <MenuOption value={1} style={{margin:2}} disabled={this.props.delivered}>
                <Text style={!this.props.delivered && this.state.enabled || this.state.disabled}>מסירה</Text>
              </MenuOption>
              <MenuOption value={2} style={{margin:2}} disabled={!this.props.delivered}>
                <Text style={this.props.delivered && this.state.enabled || this.state.disabled}>החזרה</Text>
              </MenuOption>
              <MenuOption value={3} style={{margin:2, borderTopWidth:1, borderColor:'#00B0F0'}}>
                <Text style={this.state.enabled}>היסטוריה</Text>
              </MenuOption>
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
    borderColor: '#00B0F0',
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
