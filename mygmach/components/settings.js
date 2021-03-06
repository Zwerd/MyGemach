import React, {Component} from 'react';
import {Alert, Linking, Dimensions, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation'



let today  = new Date();
let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 2

const options={
  title:null,
  takePhotoButtonTitle:'צלם תמונה',
  chooseFromLibraryButtonTitle:'בחר מספריה מקומית',
  cancelButtonTitle: 'ביטול'
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //display items
      displayGemach: false,
      displayImage: false,
      displaySearch:false,
      //setting for Gemach
      date:new Date().toLocaleDateString("en-US"),
      gemachName: '',
      gemachDescription: '',
      pickedImage: null,
      key:0,
      index:0,
      //setting for all section
      itemSelected:[],
      dataList:[],
      searchList:[],
      editor:{},
     };
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/itemsBackground.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}>
              <Image source={require('../images/back.png')} style={{width: barHeight, height: barHeight}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center', justifyContent:'space-around'}}>
            <Text style={styles.fontStyle}>הגדרות</Text>
          </View>
        </View>
        <ScrollView style={{backgroundColor:'rgba(255, 255, 255, 0.8)',height:dim.height-barHeight}}>
          <View style={{borderBottomWidth:10, borderColor:'#DCDCDC'}}>
            <View style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>שפה</Text>
              <Text style={{fontSize:barHeight/2.5,color:'#DCDCDC'}}>עברית</Text>
            </View>
            <View style={{margin:5, marginTop:0,justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>נגישות</Text>
              <Text style={{fontSize:barHeight/2.5,color:'#DCDCDC'}}>רגיל</Text>
            </View>
          </View>
          <View style={{borderBottomWidth:10, borderColor:'#DCDCDC',justifyContent:'center'}}>
            <View style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>התראות</Text>
              <Text style={{fontSize:barHeight/2.5,color:'#DCDCDC'}}>ללא</Text>
            </View>
            <View style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>עדכונים</Text>
            </View>
            <View style={{margin:5, marginTop:0,justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>עזרה</Text>
            </View>
          </View>
          <View style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}>
            <Text style={{fontSize:barHeight/2}}>אודות</Text>
          </View>
        </ScrollView>
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row', alignItems: 'center',justifyContent:'space-around',height:barHeight}}>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fontStyle:{
    fontFamily:'nrkis',
    fontSize:StatusBar.currentHeight,
    color: 'white',
    alignItems:'center'
  },
  header:{
    backgroundColor: 'rgb(0,176,240)',//#00B0F0
    borderColor: "#008CBA",
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button:{
    justifyContent: 'center',
    height: barHeight,
    margin: 5,
    borderRadius: 25,
    borderWidth:1,
  },
  modalbox:{
    justifyContent: 'center',
    height: null,
  },
  textInput:{
    flex:1,
    fontSize:StatusBar.currentHeight,
    borderColor: 'gray',
    margin:2,
  },
  ViewTitle: {
    width: ((dim.width-22)/4) * 3,
  },
  imageBox:{
    backgroundColor: "white",
    borderColor: "black",
    borderStyle:'dashed',
    borderWidth:1,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    height: dim.height/6,
    width: dim.width/3,
    margin:5,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius:2,
  },
});
