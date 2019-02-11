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

export default class ItemDetails extends React.Component {
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

findItem(itemNumber){
  let newList = this.state.dataList
  for(a=0;a<newList.length;a++){
    if(newList[a].key == itemNumber){
      return newList.indexOf(newList[a])
    }
  }
}


renderList(data){
  return data.map(data =>
    <Card
      backgroundColor={data.cardBackgroundColor}
      callbackSelectedItem={this.selectedItem}
      navigate={() => this.props.navigation.navigate("Items",
                      {update:this.onChangeData.bind(this),data:data})}
      remove={this.state.remove}
      edit={this.state.edit}
      key={data.key}
      itemNumber={data.key}
      date={data.date}
      display={data.displayGemach}
      name={data.gemachName}
      description={data.gemachDescription}
      pickedImage={data.pickedImage}
    />
  )}

  renderHistory(history){
    let key = 0
    return history.map(data =>
      <View key={key+=1} style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderBottomWidth:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:barHeight/2}}>{data.fullName}, {data.address}, {data.phone}, {data.deliverDate}, {data.reciverDate}</Text>
      </View>
    )}


openSearch(){
  this.setState({displaySearch:true})
}

removeSearch(){
  this.setState({displaySearch:false,searchList:[],displayGemach:true})
}

//search function
searchByText(text){
  let data = []
  for(i=0;i<this.state.dataList.length;i++){
    if(this.state.dataList[i].gemachName.includes(text)){
      data.push(this.state.dataList[i])
    }
  }this.setState(prevState => ({
    displayGemach:false,
    searchList:data}))
}

  render() {
    console.log('itemDetails:',this.props.navigation.state.params.itemData)
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/itemsBackground.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Items")}>
              <Image source={require('../images/back.png')} style={{width: barHeight, height: barHeight}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center', justifyContent:'space-around'}}>
            <Text style={styles.fontStyle}>{this.props.navigation.state.params.itemData.gemachName}</Text>

          </View>
        </View>
        <ScrollView style={{backgroundColor:'rgba(255, 255, 255, 0.8)',height:dim.height-barHeight}}>
          <View style={{padding:5,width:dim.width,height:dim.width}}>
            <Image source={this.props.navigation.state.params.itemData.pickedImage} style={{borderRadius:2,width:'100%',height:'100%'}}/>
          </View>
          <View style={{padding:5,flex: 1, flexDirection: 'row-reverse',alignItems:'center'}}>
            <View style={{flex:1,justifyContent: 'center',}}>
              <View style={{backgroundColor:!this.props.navigation.state.params.itemData.delivered&&'green'||'red',borderRadius:25,height:barHeight/2,width:barHeight/2}}></View>
            </View>
            <View style={{flex:3,justifyContent:'center'}}>
              <Text style={{fontSize:barHeight/2}}>{!this.props.navigation.state.params.itemData.delivered&&'פריט זמין'||'פריט אינו זמין'}</Text>
            </View>
          </View>
            {!this.props.navigation.state.params.itemData.delivered ||
          <View style={{padding:5, flex:2}}>
              <Text style={{fontSize:barHeight/2}}>פרטי לקוח:</Text>
              <Text style={{fontSize:barHeight/2}}>שם מלא: {this.props.navigation.state.params.itemData.customerData.fullName}</Text>
              <Text style={{fontSize:barHeight/2}}>כתובת: {this.props.navigation.state.params.itemData.customerData.address}</Text>
              <Text style={{fontSize:barHeight/2}}>מספר טלפון: {this.props.navigation.state.params.itemData.customerData.phone}</Text>
              <Text style={{fontSize:barHeight/2}}>תאריך מסירה: {this.props.navigation.state.params.itemData.customerData.deliverDate}</Text>
              <Text style={{fontSize:barHeight/2}}>תאריך החזרה: {this.props.navigation.state.params.itemData.customerData.reciverDate}</Text>
          </View>
            }
        </ScrollView>
            {this.props.navigation.state.params.itemData.delivered &&
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row', alignItems: 'center',justifyContent:'space-around',height:barHeight}}>
            <TouchableOpacity
              style={{height:barHeight, width:barHeight}}
              onPress={() => Linking.openURL('whatsapp://send?phone=+972'+this.props.navigation.state.params.itemData.customerData.phone.substring(1))}
              >
                <Image source={require('../images/whatsapp-logo.png')} style={{width: '100%', height: '100%'}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height:barHeight, width:barHeight}}
              onPress={() => Linking.openURL(`tel:${this.props.navigation.state.params.itemData.customerData.phone}`)}
              >
                <Image source={require('../images/call.png')} style={{width: '100%', height: '100%'}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height:barHeight, width:barHeight}}
              onPress={() => Linking.openURL(`sms:${this.props.navigation.state.params.itemData.customerData.phone}`)}
              >
                  <Image source={require('../images/message.png')} style={{width: '100%', height: '100%'}} />
            </TouchableOpacity>
          </View>
          ||
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row', alignItems: 'center',justifyContent:'space-around',height:barHeight}}>
          </View>
        }
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
