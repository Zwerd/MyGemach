import React, {Component} from 'react';
import {Alert, Dimensions, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
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

export default class Histories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language:this.props.navigation.state.params.language,
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
      <View key={key+=1} style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderWidth:1,borderColor:'#00B0F0',margin:5,marginBottom:0,padding:2}}>
        <View style={{ borderBottomWidth:1, borderColor:'gray'}}>
          <Text style={{fontSize:barHeight/2.5}}>{data.fullName}, {data.address}, {data.phone}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',margin:6,marginBottom:0}}>
          <Text style={{flex:2,fontSize:barHeight/2.5,fontWeight:'bold',textAlign: 'center'}}>{this.state.language.deliverDate}</Text>
          <Text style={{flex:2,fontSize:barHeight/2.5,fontWeight:'bold',textAlign: 'center'}}>{data.deliverDate}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',margin:6,marginBottom:0}}>
          <Text style={{flex:2,fontSize:barHeight/2.5,fontWeight:'bold',textAlign: 'center'}}>{this.state.language.reciverDate}</Text>
          <Text style={{flex:2,fontSize:barHeight/2.5,fontWeight:'bold',textAlign: 'center'}}>{data.reciverDate}</Text>
        </View>
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
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/itemsBackground.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row-reverse', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1, flexDirection: 'row-reverse', alignItems:'center'}}>
            {this.state.displaySearch && <TouchableOpacity
            onPress={()=>this.removeSearch()}>
            <Image source={require('../images/exit.png')} style={{width: barHeight, height: barHeight}}/>
          </TouchableOpacity> ||
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Items")}>
              <Image source={require('../images/back.png')} style={{width: barHeight, height: barHeight}}/>
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={()=>this.openSearch()}>
              {this.state.displaySearch && <TextInput
                                          placeholder={this.state.language.search}
                                          style={{width:dim.width-barHeight,backgroundColor:'white',borderWidth:1,borderRadius:2}}
                                          onChangeText={(text) => this.searchByText(text)}
                                        /> ||
              <Image source={require('../images/search.png')} style={{width: barHeight, height: barHeight}}/>}
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row-reverse', alignItems:'center', justifyContent:'space-around'}}>
            {!this.state.displaySearch && <Text style={styles.fontStyle}>{this.state.language.title}</Text>}
          </View>
        </View>
        <ScrollView style={{height:dim.height-barHeight}}>
        <View>
           {this.renderHistory(this.props.navigation.state.params.historiesData)}
        </View>
        </ScrollView>
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row-reverse', alignItems: 'center',height:barHeight}}>
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
