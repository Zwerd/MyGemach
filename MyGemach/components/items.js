import React, {Component} from 'react';
import {Switch, Alert, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";
import ItemDetails from "./itemDetails";

let today  = new Date();
let dim = Dimensions.get('window');
let barHeight = StatusBar.currentHeight * 2
let data = {}

const options={
  title:null,
  takePhotoButtonTitle:'צלם תמונה',
  chooseFromLibraryButtonTitle:'בחר מספריה מקומית',
  cancelButtonTitle: 'ביטול'
}

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //display items
      displayGemach: false,
      displayImage: false,
      displaySearch:false,
      //setting for Gemach
      itemNumber:this.props.navigation.state.params.data.itemNumber,
      date:new Date().toLocaleDateString("en-US"),
      gemachName: this.props.navigation.state.params.data.gemachName,
      gemachDescription: this.props.navigation.state.params.data.gemachDescription,
      pickedImage: this.props.navigation.state.params.data.pickedImage,
      key:0,
      index:0,
      //setting for all section
      itemData:{},
      itemSelected:[],
      itemsList:[],
      editor:{},
      searchList:[],
      item:{}
     };
  }


componentWillMount(){
  console.log('check will mount: --- ',this.props.navigation.state.params.data)
  this.setState({
    itemsList:this.props.navigation.state.params.data.itemData,
    displayGemach:true,
    key:this.props.navigation.state.params.data.itemData.length
  })
}

componentDidUpdate(){
  this.props.navigation.state.params.update(this.state.itemsList,this.props.navigation.state.params.data.itemNumber)
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
      itemNumber:this.state.key+1,
      itemsList:[...prevState.itemsList,{
        key:this.state.key,
        itemNumber:this.state.key,
        date:today.toLocaleDateString("en-US"),
        gemachName:this.state.gemachName,
        gemachDescription:this.state.gemachDescription,
        pickedImage:this.state.pickedImage,
        cardBackgroundColor:'white',
        selected:false,
      }]
    }));
    console.log('checking item: ',this.props.navigation.state.params.data.itemNumber)

    this.refs.creator.close()
  }

findItem(itemNumber){
  let newList = this.state.itemsList
  for(a=0;a<newList.length;a++){
    if(newList[a].key == itemNumber){
      return newList.indexOf(newList[a])
    }
  }
}

selectedItem = (itemNumber) => {
  let index = this.findItem(itemNumber)
  let newList = this.state.itemsList
  let itemSelected = this.state.itemSelected
  if(newList[index].cardBackgroundColor == 'white'){
    newList[index].cardBackgroundColor = 'rgb(201,241,255)'
    newList[index].selected = true
    itemSelected.push(itemNumber)
    this.setState({itemsList:newList,itemSelected:itemSelected})
  }else if(newList[index].cardBackgroundColor == 'rgb(201,241,255)'){
    newList[index].cardBackgroundColor = 'white'
    newList[index].selected = false
    itemSelected.splice(itemSelected.indexOf(itemNumber),1)
    this.setState({itemsList:newList,itemSelected:itemSelected})
  }
}

removeApproved(){
  if(this.state.itemSelected.length==1){
    Alert.alert(
      'מחיקת פריט',
      'האם למחוק את הפריט שנבחר לצמיתות?',
      [
        {text: 'ביטול', onPress: () => false, style: 'cancel'},
        {text: 'אישור', onPress: () => this.remove() }
      ],
    )
  }else if(this.state.itemSelected.length>1){
    Alert.alert(
      'מחיקת פריט',
      'האם למחוק את הפריטים שנבחרו לצמיתות?',
      [
        {text: 'ביטול', onPress: () => false, style: 'cancel'},
        {text: 'אישור', onPress: () => this.remove() }
      ],
    )
  }
}

remove(){
  let newList = this.state.itemsList
  for(a=this.state.itemsList.length-1;a>=0;a--){
    if(this.state.itemsList[a].selected == true){
      newList.splice(newList.indexOf(this.state.itemsList[a]),1)
    }
  };this.setState({itemsList:newList,itemSelected:[]})
}


edit(){
  let itemsList = this.state.itemsList
  if(this.state.itemSelected.length>1){
    Alert.alert(
      'שגיאה',
      'יש לבחור פריט אחד בלבד',
      [
        {text: 'אישור', onPress: () => {
          this.setState({itemSelected:[]})
          for(a=0;a<itemsList.length;a++){
            if(itemsList[a].selected == true){
              itemsList[a].selected=false
              itemsList[a].cardBackgroundColor='white'
            }
          }
          this.setState({itemsList:itemsList})
        }, style: 'cancel'}
      ],
    )
  }else if(this.state.itemSelected.length==1){
    for(a=0;a<itemsList.length;a++){
      if(itemsList[a].selected == true){
        this.setState({
          editor:{
            gemachName:itemsList[a].gemachName,
            gemachDescription:itemsList[a].gemachDescription,
            pickedImage:itemsList[a].pickedImage,
            key:itemsList[a].key,
            date:itemsList[a].date,
            cardBackgroundColor:'white',
            selected:false,
            index:itemsList.indexOf(itemsList[a])
          }
        })
      }
    }this.refs.editor.open()
  }
}

gemachEditor(){
  let itemsList = this.state.itemsList
  itemsList[this.state.editor.index]=this.state.editor,
  this.setState({
    itemsList:itemsList,
    itemSelected:[],
  });this.refs.editor.close()
}

openItem = (itemNumber) => {
  this.refs.itemMenu.open()
  data = this.state.itemsList[this.findItem(itemNumber)]
  this.setState({itemData:data})
}


renderList(data){
  return data.map(data =>
    <ItemDetails
      backgroundColor={data.cardBackgroundColor}
      callbackFromItems={this.selectedItem}
      callbackModalbox={this.openItem}
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
  this.setState({searchOpen:true, back:true})
}

removeSearch(){
  this.setState({searchOpen:false, back:false,searchList:[],displayGemach:true})
}

//search function
searchByText(text){
  let data = []
  for(i=0;i<this.state.itemsList.length;i++){
    if(this.state.itemsList[i].gemachName.includes(text)){
      data.push(this.state.itemsList[i])
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
        ref={"itemMenu"}
        >
        <View>
          <View style={{backgroundColor:'#00B0F0', alignItems:'center',height:barHeight}}>
            <Text>{this.state.itemData.itemName}</Text>
          </View>
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
      </Modal>



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
              {!this.state.displayImage && <Text style={{fontSize:20}}>בחר תמונה</Text>}
              {this.state.displayImage && <Image source={this.state.pickedImage} style={styles.previewImage}/>}
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              placeholder={'שם הפריט'}
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
        <ImageBackground source={require('../images/itemsBackground.png')} style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: barHeight}}>
          <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
            {this.state.back && <TouchableOpacity
            onPress={()=>this.removeSearch()}>
            <Image source={require('../images/exit.png')} style={{width: barHeight, height: barHeight}}/>
          </TouchableOpacity> ||
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}>
              <Image source={require('../images/back.png')} style={{width: barHeight, height: barHeight}}/>
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
            {!this.state.searchOpen &&
              <View style={{flex:2, flexDirection: 'row-reverse', alignItems:'center', justifyContent:'space-around'}}>
                <Text style={styles.fontStyle}>{this.props.navigation.state.params.data.gemachName}</Text>
                <Text style={styles.fontStyle}>סה''כ: {this.state.itemsList.length}</Text>
              </View>}
        </View>
        <ScrollView style={{height:dim.height-barHeight}}>
        {this.state.displayGemach && this.renderList(this.state.itemsList) || this.renderList(this.state.searchList)}
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
