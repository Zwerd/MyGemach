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
      gemachName: '',
      itemNumber:[],
      itemSelected:false,
      gemachDescription: '',
      pickedImage: null,
      displayImage: false,
      displayText:true,
      searchOpen:false,
      searchText:'',
      back:false,
      key:0,
      dataList:[],
      searchList:[],
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

  createGemach(){
    this.setState(prevState => ({
      displayGemach:true,
      displayImage:false,
      displayText:true,
      date: today.toLocaleDateString("en-US"),
      key: this.state.key+1,
      dataList: [...prevState.dataList,{key:this.state.key,
                  date:this.state.date,
                  gemachName:this.state.gemachName,
                  gemachDescription:this.state.gemachDescription,
                  pickedImage:this.state.pickedImage}]
    }));
    this.refs.creator.close()
  }

selectedItem = (command, itemNumber) => {
  let numberList = this.state.itemNumber
  if(command == 'remove' && numberList.length == 1){
    console.log('remove lest selected item: '+itemNumber)
    numberList.splice(numberList.indexOf(itemNumber),1)
    this.setState({itemNumber:numberList,itemSelected:false})
  }else if(command == 'remove'){
    console.log('remove selected item: '+itemNumber)
    numberList.splice(numberList.indexOf(itemNumber),1)
    this.setState({itemNumber:numberList})
  }else if(command == 'add'){
    console.log('add selected item: '+itemNumber)
    numberList.push(itemNumber)
    this.setState({itemNumber:numberList,itemSelected:true})
  }
  console.log('end','command is: '+command, 'itemNumber is: '+this.state.itemNumber)
}

removeApproved(){
  if(this.state.itemSelected && this.state.itemNumber.length==1){
    Alert.alert(
      'מחיקת קרן',
      'האם למחוק את הקרן שנבחרה לצמיתות?',
      [
        {text: 'ביטול', onPress: () => false, style: 'cancel'},
        {text: 'אישור', onPress: () => this.remove() }
      ],
    )
  }else if(this.state.itemSelected){
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
  for(a=0;a<newList.length;a++){
    for(b=0;b<this.state.itemNumber.length;b++){
      if(newList[a].key == this.state.itemNumber[b]){
        console.log('going to remove item number: ' +a +' number b is: '+b, newList)
        console.log('the key of datalist is: ' +newList[a].key, 'the item number is: ' +this.state.itemNumber[b])
        newList.splice(newList.indexOf(newList[a]), 1)
      }
    }
  }this.setState({dataList:newList,itemNumber:[],itemSelected:false})
}


renderList(){
  console.log('render the list map again')
  return this.state.dataList.map(data =>
    <Card
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
            {!this.state.searchOpen && <Text style={styles.fontStyle}>הצדקה שלי</Text>}
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
    backgroundColor: 'rgb(0,176,240)',
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
