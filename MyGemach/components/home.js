import React, {Component} from 'react';
import {Alert, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";
import Card from "./card";

let today  = new Date();
let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 2

const options={
  title:null,
  takePhotoButtonTitle:'צלם תמונה',
  chooseFromLibraryButtonTitle:'בחר מספריה מקומית',
  cancelButtonTitle: 'ביטול'
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date().toLocaleDateString("en-US"),
      displayGemach: false,
      displayImage: false,
      displayText:true,
      itemSelected:[],
      gemachName: '',
      gemachDescription: '',
      pickedImage: null,
      searchOpen:false,
      back:false,
      key:0,
      dataList:[],
      editor:{},
      searchList:[],
      index:0,
     };
  }

  pickImageHandler = () => {
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

  editPickImageHandler = () => {
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState(prevState => ({
          editor:{...prevState.editor,pickedImage: { uri: res.uri }}}));
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
                  date:today.toLocaleDateString("en-US"),
                  gemachName:this.state.gemachName,
                  gemachDescription:this.state.gemachDescription,
                  pickedImage:this.state.pickedImage,
                  cardBackgroundColor:'white',
                  selected:false
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
  if(this.state.itemSelected.length==1){
    Alert.alert(
      'מחיקת קרן',
      'האם למחוק את הקרן שנבחרה לצמיתות?',
      [
        {text: 'ביטול', onPress: () => false, style: 'cancel'},
        {text: 'אישור', onPress: () => this.remove() }
      ],
    )
  }else if(this.state.itemSelected.length>1){
    Alert.alert(
      'מחיקת קרן',
      'האם למחוק את הקרנות הנבחרות לצמיתות?',
      [
        {text: 'ביטול', onPress: () => false, style: 'cancel'},
        {text: 'אישור', onPress: () => this.remove() }
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
      'שגיאה',
      'יש לבחור פריט אחד בלבד',
      [
        {text: 'אישור', onPress: () => {
          this.setState({itemSelected:[]})
          for(a=0;a<dataList.length;a++){
            if(dataList[a].selected == true){
              dataList[a].selected=false
              dataList[a].cardBackgroundColor='white'
            }
          }console.log('dataList: ',dataList)
          this.setState({dataList:dataList})
        }, style: 'cancel'}
      ],
    )
  }else if(this.state.itemSelected.length==1){
    for(a=0;a<dataList.length;a++){
      if(dataList[a].selected == true){
        this.setState({
          editor:{
            gemachName:dataList[a].gemachName,
            gemachDescription:dataList[a].gemachDescription,
            pickedImage:dataList[a].pickedImage,
            key:dataList[a].key,
            date:dataList[a].date,
            cardBackgroundColor:'white',
            selected:false,
            index:dataList.indexOf(dataList[a])
          }
        })
      }
    }this.refs.editor.open()
  }
}

gemachEditor(){
  let dataList = this.state.dataList
  dataList[this.state.editor.index]=this.state.editor,
  this.setState({
    dataList:dataList,
    itemSelected:[],
  });this.refs.editor.close()
}


renderList(){
  return this.state.dataList.map(data =>
    <Card
      backgroundColor={data.cardBackgroundColor}
      callbackSelectedItem={this.selectedItem}
      navigate={() => this.props.navigation.navigate("Items",
                      {Home:data.gemachName})}
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

renderSearchList(){
  return this.state.searchList.map(data =>
    <Card
      backgroundColor={this.state.cardBackgroundColor}
      callbackFromHome={this.removeItem}
      navigate={() => this.props.navigation.navigate("Items",
                      {Home:data.gemachName})}
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
  )
}


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
  this.setState({searchOpen:true, back:true})
}

removeSearch(){
  this.setState({searchOpen:false, back:false,searchList:[],displayGemach:true})
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

      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"editor"}
        >
        <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.editPickImageHandler}>
              <Image source={this.state.editor.pickedImage} style={styles.previewImage}/>
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              value={this.state.editor.gemachName}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState => ({editor:{...prevState.editor, gemachName: text}}))}
            />
            <TextInput
              value={this.state.editor.gemachDescription}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState => ({editor:{...prevState.editor,gemachDescription: text}}))}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.header,styles.button]}
          onPress={() => this.gemachEditor()}
          >
          <Text style={styles.fontStyle}>אישור</Text>
        </TouchableOpacity>
      </Modal>

      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"creator"}
        >
        <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.pickImageHandler}>
              {this.state.displayText && <Text style={{fontSize:20}}>בחר תמונה</Text>}
              {this.state.displayImage && <Image source={this.state.pickedImage} style={styles.previewImage}/>}
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              placeholder={'שם הקרן'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({gemachName: text})}
            />
            <TextInput
              placeholder={'תיאור'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({gemachDescription: text})}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.header,styles.button]}
          onPress={() => this.createGemach()}
          >
          <Text style={styles.fontStyle}>אישור</Text>
        </TouchableOpacity>
      </Modal>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
            {this.state.back && <TouchableOpacity
            onPress={()=>this.removeSearch()}>
            <Image source={require('../images/back.png')} style={{width: barHeight, height: barHeight}}/>
          </TouchableOpacity> ||
          <TouchableOpacity
              onPress={() => console.log('setting was press')}>
              <Image source={require('../images/setting.png')} style={{width: barHeight, height: barHeight}}/>
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={()=>this.openSearch()}>
              {this.state.searchOpen && <TextInput
                                          placeholder={'חיפוש לפי שם'}
                                          style={{width:dim.width-barHeight,backgroundColor:'white',borderWidth:1,borderRadius:2}}
                                          onChangeText={(text) => this.searchByText(text)}
                                        /> ||
              <Image source={require('../images/search.png')} style={{width: barHeight, height: barHeight}}/>}
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center', justifyContent:'space-around'}}>
            {!this.state.searchOpen && <Text style={styles.fontStyle}>הגמ''ח שלי</Text>}
          </View>
        </View>
        <ScrollView style={{height:dim.height-barHeight}}>
        {this.state.displayGemach && this.renderList() || this.renderSearchList()}
        </ScrollView>
          <View style={{backgroundColor: 'rgb(0,176,240)',flexDirection: 'row', alignItems: 'center', justifyContent:'space-around'}}>
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
    borderWidth: 2,
    borderRadius: 10,
  },
  textInput:{
    flex:1,
    fontSize:StatusBar.currentHeight,
    borderColor: 'black',
    borderRadius:5,
    borderWidth: 1,
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
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    height: dim.height/6,
    width: dim.width/3,
    margin:2,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius:10,
  },
});
