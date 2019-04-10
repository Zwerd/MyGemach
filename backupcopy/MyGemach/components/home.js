import React, {Component} from 'react';
import {Alert, AsyncStorage, Dimensions, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";
import Language from './language.js'
import Card from "./card";

let today  = new Date();
let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 2
let language = Language['heb']

const options=(language)={
  title:null,
  takePhotoButtonTitle:language.home.image.camera,
  chooseFromLibraryButtonTitle:language.home.image.library,
  cancelButtonTitle:language.home.image.cancel,
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //language
      language:Language['heb'],
      //display items
      displayGemach:false,
      displayImage:false,
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



  componentWillMount() {
    /*AsyncStorage.getItem('language')
      .then(value => {
        this.setState({ language: JSON.parse(value) || Language['heb']})
      })
      .done()*/
      AsyncStorage.getItem('dataList')
        .then(value => {
          this.setState({ dataList: JSON.parse(value) || []})
        })
        .done()
        AsyncStorage.getItem('displayGemach')
          .then(value => {
            this.setState({ displayGemach: JSON.parse(value) || []})
          })
          .done()
    }

  componentDidUpdate() {
    let dataList = this.state.dataList
    //AsyncStorage.setItem('language', JSON.stringify(this.state.language))
    AsyncStorage.setItem('dataList', JSON.stringify(this.state.dataList))
    AsyncStorage.setItem('displayGemach', JSON.stringify(this.state.displayGemach))
  }

pickImageHandler(){
  const options={
    title:null,
    takePhotoButtonTitle:this.state.language.home.image.camera,
    chooseFromLibraryButtonTitle:this.state.language.home.image.library,
    cancelButtonTitle:this.state.language.home.image.cancel,
  }
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          displayText:false,
          displayImage:true,
          pickedImage: { uri: res.uri }
        });
      }
    });
  }

  editPickImageHandler(){
    const options={
      title:null,
      takePhotoButtonTitle:this.state.language.home.image.camera,
      chooseFromLibraryButtonTitle:this.state.language.home.image.library,
      cancelButtonTitle:this.state.language.home.image.cancel,
    }
      ImagePicker.showImagePicker(options, res => {
        console.log('this is the image from editor:',res.uri)
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState(prevState => ({
            displayText:false,
            displayImage:true,
            editor:{...prevState.editor, pickedImage: { uri: res.uri }}
          }));
        }
      });
    }




  createGemach(){
    this.setState(prevState => ({
      displayGemach:true,
      displayImage:false,
      displayText:true,
      key:this.state.key+1,
      dataList: [...prevState.dataList,{
                  key:this.state.key,
                  itemNumber:this.state.key,
                  date:today.toLocaleDateString("en-US"),
                  gemachName:this.state.gemachName,
                  gemachDescription:this.state.gemachDescription,
                  pickedImage:this.state.pickedImage,
                  cardBackgroundColor:'white',
                  selected:false,
                  itemsList:[],
                }]
    }));
    this.refs.creator.close()
  }

findItem(itemNumber){
  let newList = this.state.dataList
  for(a=0;a<newList.length;a++){
    if(newList[a].key == itemNumber){
      return newList.indexOf(newList[a])
    }
  }
}

selectedItem = (itemNumber) => {
  let index = this.findItem(itemNumber)
  let newList = this.state.dataList
  let itemSelected = this.state.itemSelected
  if(newList[index].cardBackgroundColor == 'white'){
    newList[index].cardBackgroundColor = 'rgb(201,241,255)'
    newList[index].selected = true
    itemSelected.push(itemNumber)
    this.setState({dataList:newList,itemSelected:itemSelected})
  }else if(newList[index].cardBackgroundColor == 'rgb(201,241,255)'){
    newList[index].cardBackgroundColor = 'white'
    newList[index].selected = false
    itemSelected.splice(itemSelected.indexOf(itemNumber),1)
    this.setState({dataList:newList,itemSelected:itemSelected})
  }
}

removeApproved(){
  console.log('home remove check',this.state.language.home)
  if(this.state.itemSelected.length==1){
    Alert.alert(
      this.state.language.home.remove.one.title,
      this.state.language.home.remove.one.description,
      [
        {text: this.state.language.home.remove.one.cancel, onPress: () => false, style: 'cancel'},
        {text: this.state.language.home.remove.one.approve, onPress: () => {this.remove()} }
      ],
    )
  }else if(this.state.itemSelected.length>1){
    Alert.alert(
      this.state.language.home.remove.many.title,
      this.state.language.home.remove.many.description,
      [
        {text: this.state.language.home.remove.many.cancel, onPress: () => false, style: 'cancel'},
        {text: this.state.language.home.remove.many.approve, onPress: () => {this.remove()} }
      ],
    )
  }
}

remove(){
  let newList = this.state.dataList
  for(a=this.state.dataList.length-1;a>=0;a--){
    if(this.state.dataList[a].selected == true){
      newList.splice(newList.indexOf(this.state.dataList[a]),1)
    }
  };this.setState({dataList:newList,itemSelected:[]})
}


edit(){
  let dataList = this.state.dataList
  if(this.state.itemSelected.length>1){
    Alert.alert(
      this.state.language.home.edit.alert.title,
      this.state.language.home.edit.alert.description,
      [
        {text: this.state.language.home.edit.alert.approve, onPress: () => {
          this.setState({itemSelected:[]})
          for(a=0;a<dataList.length;a++){
            if(dataList[a].selected == true){
              dataList[a].selected=false
              dataList[a].cardBackgroundColor='white'
            }
          }
          this.setState({dataList:dataList})
        }, style: 'cancel'}
      ],
    )
  }else if(this.state.itemSelected.length==1){
    for(a=0;a<dataList.length;a++){
      if(dataList[a].selected == true){
        this.setState({
          editor:{
            key:dataList[a].key,
            itemNumber:dataList.indexOf(dataList[a]),
            date:dataList[a].date,
            gemachName:dataList[a].gemachName,
            gemachDescription:dataList[a].gemachDescription,
            pickedImage:dataList[a].pickedImage,
            cardBackgroundColor:'white',
            selected:false,
            itemsList:dataList[a].itemsList,
          }
        })
      }
    }this.refs.editor.open()
  }
}

gemachEditor(){
  let dataList = this.state.dataList
  dataList[this.state.editor.itemNumber]=this.state.editor,
  this.setState({
    dataList:dataList,
    itemSelected:[],
  });
  this.refs.editor.close()
}

onLanguageChange(value){
  this.setState({language:Language[value]})
}

onChangeData(update,itemNumber){
  let index = this.findItem(itemNumber)
  let data = this.state.dataList
  data[index].itemsList = update
  this.setState({
    dataList:data
  })
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


openCreator(){
  this.setState({
    gemachName: '',
    gemachDescription:'',
    pickedImage: null,
    displayImage: false,
    displayText:true,
  })
  this.refs.creator.open()
}

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
    console.log('image state:',this.state.editor.pickedImage)
    return (
      <View style={styles.container}>

      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"editor"}
        >
        <View style={{padding:10}}>
          <Text style={{fontSize:barHeight/2}}>{this.state.language.home.edit.title}</Text>
        </View>
        <View style={{flexDirection: 'row-reverse',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.editPickImageHandler.bind(this)}>
              <Image source={this.state.editor.pickedImage} style={styles.previewImage}/>
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              underlineColorAndroid={'gray'}
              value={this.state.editor.gemachName}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState => ({editor:{...prevState.editor, gemachName: text}}))}
            />
            <TextInput
              underlineColorAndroid={'gray'}
              value={this.state.editor.gemachDescription}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState => ({editor:{...prevState.editor,gemachDescription: text}}))}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.gemachEditor()}
            >
            <Text style={styles.fontStyle}>{this.state.language.home.edit.approve}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.refs.editor.close()}
            >
            <Text style={styles.fontStyle}>{this.state.language.home.edit.cancel}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"creator"}
        >
        <View style={{padding:10}}>
          <Text style={{fontSize:barHeight/2}}>{this.state.language.home.add.title}</Text>
        </View>
        <View style={{flexDirection: 'row-reverse',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.pickImageHandler.bind(this)}>
              {!this.state.displayImage && <Image source={require('../images/camera.png')} style={{width: "50%",height: "50%",}}/>}
              {this.state.displayImage && <Image source={this.state.pickedImage} style={styles.previewImage}/>}
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              underlineColorAndroid={'gray'}
              placeholder={this.state.language.home.add.name}
              style={styles.textInput}
              onChangeText={(text) => this.setState({gemachName: text})}
            />
            <TextInput
              underlineColorAndroid={'gray'}
              placeholder={this.state.language.home.add.description}
              style={styles.textInput}
              onChangeText={(text) => this.setState({gemachDescription: text})}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.createGemach()}
            >
            <Text style={styles.fontStyle}>{this.state.language.home.add.approve}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.refs.creator.close()}
            >
            <Text style={styles.fontStyle}>{this.state.language.home.add.cancel}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        <ImageBackground source={require('../images/itemsBackground.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row-reverse', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1, flexDirection: 'row-reverse', alignItems:'center'}}>
            {this.state.displaySearch && <TouchableOpacity
            onPress={()=>this.removeSearch()}>
            <Image source={require('../images/exit.png')} style={{width: barHeight, height: barHeight}}/>
          </TouchableOpacity> ||
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings",
                              {setLanguage:this.onLanguageChange.bind(this), language:this.state.language.settings})}>
              <Image source={require('../images/setting.png')} style={{width: barHeight, height: barHeight}}/>
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={()=>this.openSearch()}>
              {this.state.displaySearch && <TextInput
                                          placeholder={this.state.language.home.search.title}
                                          style={{width:dim.width-barHeight,backgroundColor:'white',borderWidth:1,borderRadius:2}}
                                          onChangeText={(text) => this.searchByText(text)}
                                        /> ||
              <Image source={require('../images/search.png')} style={{width: barHeight, height: barHeight}}/>}
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row-reverse', alignItems:'center', justifyContent:'space-around'}}>
            {!this.state.displaySearch && <Text style={styles.fontStyle}>{this.state.language.home.title}</Text>}
          </View>
        </View>
        <ScrollView  style={{height:dim.height-barHeight}}>
          <View>
            {this.state.displayGemach && this.renderList(this.state.dataList) || this.renderList(this.state.searchList)}
          </View>
        </ScrollView>
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row-reverse', alignItems: 'center', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={{height:barHeight, width:barHeight}}
              onPress={() => this.edit()}
              >
                <Image source={require('../images/edit.png')} style={{width: '100%', height: '100%'}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height:barHeight, width:barHeight}}
              onPress={() => this.openCreator()}
              >
                <Image source={require('../images/adding.png')} style={{width: '100%', height: '100%'}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height:barHeight, width:barHeight}}
              onPress={() => this.removeApproved()}
              >
                  <Image source={require('../images/remove.png')} style={{width: '100%', height: '100%'}} />
            </TouchableOpacity>
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
