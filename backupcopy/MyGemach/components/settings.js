import React, {Component} from 'react';
import {Alert, Linking, Dimensions, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Language from './language.js'
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';


let today  = new Date();
let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 2



export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //display items
      setLanguage:'heb',
      language:this.props.language=='eng'?Language.eng:Language.heb,
      check:barHeight,
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

setLanguage(value){
  let language = (value=='eng'?Language.eng:Language.heb)
  console.log('set lang',value)
  this.setState({language:language})
  this.props.navigation.state.params.language(value)
}


  render() {
    console.log('this check:',this.state.check)
    return (
      <MenuProvider>
      <View style={styles.container}>
        <ImageBackground source={require('../images/itemsBackground.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row-reverse', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1, flexDirection: 'row-reverse', alignItems:'center'}}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}>
              <Image source={require('../images/back.png')} style={{width: barHeight, height: barHeight}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row-reverse', alignItems:'center', justifyContent:'space-around'}}>
            <Text style={styles.fontStyle}>{this.state.language.settings.title}</Text>
          </View>
        </View>
        <ScrollView style={{backgroundColor:'rgba(255, 255, 255, 0.8)',height:dim.height-barHeight}}>
          <View style={{borderBottomWidth:10, borderColor:'#DCDCDC'}}>
            <View style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>{this.state.language.settings.language.title}</Text>

              <Menu renderer={renderers.NotAnimatedContextMenu} onSelect={value => this.setLanguage(value)}>
                 <MenuTrigger>
                   <Text style={{fontSize:barHeight/2.5}}>{this.state.language.settings.language.value}</Text>
                 </MenuTrigger>
                 <MenuOptions >
                   <MenuOption value={'heb'} style={{margin:2}}>
                     <Text style={{fontSize:barHeight/2.5}}>עברית</Text>
                   </MenuOption>
                   <MenuOption value={'eng'} style={{margin:2}}>
                     <Text style={{fontSize:barHeight/2.5}}>English</Text>
                   </MenuOption>
                 </MenuOptions>
               </Menu>


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
            <TouchableOpacity
              style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}
              onPress={() => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.mygemach')
              }}
            >
              <Text style={{fontSize:barHeight/2}}>עדכונים</Text>
            </TouchableOpacity>
            <View style={{margin:5, marginTop:0,justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>עזרה</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{margin:5, marginTop:0, borderBottomWidth:1,borderColor:'#DCDCDC',justifyContent:'center'}}
            onPress={() => {
              Linking.openURL('http://zwerd.com/2019/02/17/new_open_source_app.html')
            }}
          >
            <Text style={{fontSize:barHeight/2}}>אודות</Text>
          </TouchableOpacity>
        </ScrollView>
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row-reverse', alignItems: 'center',justifyContent:'space-around',height:barHeight}}>
          </View>
        </ImageBackground>
      </View>
      </MenuProvider>
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
