import React, {Component} from 'react';
import {Alert, Switch, TextInput, Dimensions, Image,ImageBackground, TouchableOpacity, StyleSheet, Text, View,StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Modal from 'react-native-modalbox';
let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 1.5
let today  = new Date();

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
  Alert.alert(
    [
      {text: 'מסירה', onPress: () => false, style: 'cancel'},
      {text: 'צפייה', onPress: () => false, style: 'cancel' },
      {text: 'החזרה', onPress: () => false, style: 'cancel' },
      {text: 'היסטוריה', onPress: () => false, style: 'cancel' },
    ]
  )
}


render(){
  return(
  <View style={[{backgroundColor:this.props.backgroundColor},styles.display]}>
  <TouchableOpacity
    onLongPress={() => this.props.callbackFromItems(this.props.itemNumber)}
    onPress={() => this.pressed()}
    >
    <View style={{ flexDirection: 'row-reverse'}}>
      <View style={[styles.View,styles.ViewImage,{flex:2.5}]}>
        <ImageBackground source={this.props.pickedImage} style={[styles.previewImage,{flexDirection: 'row-reverse'}]}>
          <View style={{backgroundColor:'red',borderRadius:25,height:barHeight,width:barHeight}}></View>
        </ImageBackground>
      </View>
      <View style={[styles.View,{flex:4}]}>
        <Text style={{fontSize:StatusBar.currentHeight}}>{this.props.itemNumber+1}. {this.props.name}</Text>
        <Text>{this.state.customerData}</Text>
        <Text>{this.delivered()}</Text>
      </View>
      <View style={{flex:1}}>
        <Image source={require('../images/miniMenu.png')} style={{width: barHeight/2, height: barHeight}}/>
      </View>
    </View>
  </TouchableOpacity>
  {this.state.pressed &&
    <View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={'שם השואל'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'כתובת השואל'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'מספר השואל'}
        />
        <View style={{flexDirection:'row-reverse'}}>
        <Text>תאריך השאלה: {today.toLocaleDateString("en-US")}</Text>
        <Text>תאריך החזרה: </Text><TextInput
          style={styles.textInput}
        />
        </View>
      </View>
    </View>
  }
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
