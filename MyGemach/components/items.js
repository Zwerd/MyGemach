import React, {Component} from 'react';
import {Switch, Alert, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';
import Modal from 'react-native-modalbox';
import { StackNavigator } from 'react-navigation'
import ImagePicker from "react-native-image-picker";
import ItemCard from "./itemCard";
import DatePicker from 'react-native-datepicker'

import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';


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
      //choose itemNumber
      chooseItemNumber:-1,
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
      delivered:false,
      //setting for all section
      customerData:{
        fullName:'',
        address:'',
        phone:'',
        deliverDate:'',
        reciverDate:'',
        deliverSwitch:false,
        reciverSwitch:false,
      },
      itemSelected:[],
      itemsList:[],
      editor:{},
      searchList:[],
      item:{}
     };
  }


componentWillMount(){
  console.log('items page data: ', this.props.navigation.state.params.data)
  this.setState({
    itemsList:this.props.navigation.state.params.data.itemsList,
    displayGemach:true,
    key:this.props.navigation.state.params.data.itemsList.length
  })
}

componentDidUpdate(){
  console.log('checking updateds: ',this.props.navigation.state.params.data.itemNumber)
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
        delivered:false,
        histories:[],
        customerData:{
          fullName:'',
          address:'',
          phone:'',
          deliverDate:'',
          reciverDate:'',
          deliverSwitch:false,
          reciverSwitch:false,
        },
      }]
    }));
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
        this.setState(prevState => ({
          editor:{...prevState.editor,
            key:itemsList[a].key,
            itemNumber:itemsList.indexOf(itemsList[a]),
            date:itemsList[a].date,
            gemachName:itemsList[a].gemachName,
            gemachDescription:itemsList[a].gemachDescription,
            pickedImage:itemsList[a].pickedImage,
            cardBackgroundColor:'white',
            selected:false,
            customerData:itemsList[a].customerData,
          }})
        )}
      }
    }this.refs.editor.open()
  }


gemachEditor(){
  let itemsList = this.state.itemsList
  itemsList[this.state.editor.index]=this.state.editor,
  this.setState({
    itemsList:itemsList,
    itemSelected:[],
  });this.refs.editor.close()
}

renderList(data){
  return data.map(data =>
    <ItemCard
      backgroundColor={data.cardBackgroundColor}
      callbackFromItems={this.selectedItem}
      callDeliverModalbox={this.deliverItem}
      callReturnedModalbox={this.returnedItem}
      callRenderItemDetails={(itemNumber) => this.props.navigation.navigate("ItemDetails",
                                   {itemsList:this.state.itemsList[this.findItem(itemNumber)]})}
      callHistoriesModalbox={(itemNumber) => this.props.navigation.navigate("Histories",
                                   {historiesData:this.state.itemsList[this.findItem(itemNumber)].histories})}
      remove={this.state.remove}
      edit={this.state.edit}
      key={data.key}
      itemNumber={data.key}
      date={data.date}
      display={data.displayGemach}
      name={data.gemachName}
      description={data.gemachDescription}
      pickedImage={data.pickedImage}
      delivered={data.delivered}
      customerData={data.customerData}
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

deliverItem = (itemNumber) => {
  this.setState({chooseItemData:itemNumber})
  this.refs.deliverItemMenu.open()
}
returnedItem = (itemNumber) => {
  Alert.alert(
    'החזרת פריט',
    'האם הפריט חזר לקרן?',
    [
      {text: 'ביטול', onPress: () => false, style: 'cancel'},
      {text: 'אישור', onPress: () => {
        let itemsList = this.state.itemsList
        console.log('this.is history error:',itemsList,itemNumber,itemsList[itemNumber].histories)
        itemsList[itemNumber].histories.unshift(itemsList[itemNumber].customerData)
        itemsList[itemNumber].delivered = false
        itemsList[itemNumber].customerData = {
          fullName:'',
          address:'',
          phone:'',
          deliverDate:'',
          reciverDate:'',
          deliverSwitch:false,
          reciverSwitch:false,
        }
        this.setState({
          chooseItemData:-1,
          itemsList:itemsList,
          customerData:{
            fullName:'',
            address:'',
            phone:'',
            deliverDate:'',
            reciverDate:'',
            deliverSwitch:false,
            reciverSwitch:false,
          }
        })
      }},
    ],
  )
}

approvedDelivering(){
  let itemsList = this.state.itemsList
  itemsList[this.findItem(this.state.chooseItemData)].customerData = this.state.customerData
  itemsList[this.findItem(this.state.chooseItemData)].delivered = true
  this.setState({
    chooseItemData:-1,
    itemsList:itemsList,
    customerData:{
      fullName:'',
      address:'',
      phone:'',
      deliverDate:'',
      reciverDate:'',
      deliverSwitch:false,
      reciverSwitch:false,
    }
  })
  this.refs.deliverItemMenu.close()
}
disapprovedDelivering(){
  this.setState({
    chooseItemData:-1,
    customerData:{
      fullName:'',
      address:'',
      phone:'',
      deliverDate:'',
      reciverDate:'',
      deliverSwitch:false,
      reciverSwitch:false,
    }
  })
  this.refs.deliverItemMenu.close()
}

historiesRender(itemNumber){
  <Text>{this.state.itemsList[itemNumber].histories}</Text>
}

  render() {
    return (
      <MenuProvider>
      <View style={styles.container}>

      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"deliverItemMenu"}
        >
          <View style={{padding:10,}}>
            <Text style={{fontSize:barHeight/2}}>מסירת פריט</Text>
          </View>
          <View style={{padding:10,paddingBottom:0}}>
            <TextInput
              underlineColorAndroid={'gray'}
              placeholder={'שם מלא'}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState=>({customerData:{...prevState.customerData,fullName:text}}))}
            />
            <TextInput
              underlineColorAndroid={'gray'}
              placeholder={'כתובת'}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState=>({customerData:{...prevState.customerData,address:text}}))}
            />
            <TextInput
              underlineColorAndroid={'gray'}
              placeholder={'מספר טלפון'}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState=>({customerData:{...prevState.customerData,phone:text}}))}
            />
          </View>
          <View style={{flexDirection:'row-reverse',alignItems:'center',justifyContent:'center',margin:6,marginBottom:0}}>
            <Text style={{flex:2,fontSize:barHeight/2.5,fontWeight:'bold',textAlign: 'center'}}>תאריך מסירה</Text>
            <Text style={{flex:2,fontSize:barHeight/2.5,fontWeight:'bold',textAlign: 'center'}}>תאריך החזרה</Text>
          </View>
          <View style={{flexDirection:'row-reverse',alignItems:'center',margin:4,marginTop:0}}>
            <DatePicker
              customStyles={{
                dateInput:{borderWidth: 0},
                placeholderText:{fontSize:barHeight/2,color:'#9D9D9D'},
                dateText:{fontSize:barHeight/2.5,color: '#9D9D9D'}
              }}
              style={{margin:2,borderColor:'#9D9D9D',borderWidth:1,borderRadius:25,borderColor:"#008CBA",flex:1}}
              date={this.state.customerData.deliverDate}
              placeholder={this.state.deliverSwitch&&this.state.customerData.deliverDate||'בחר תאריך'}
              mode="datetime"
              format="DD-MM-YYYY HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(datetime) => {this.setState(prevState => ({customerData:{...prevState.customerData,deliverDate:datetime,deliverSwitch:true}}))}}
            />
            <DatePicker
              customStyles={{
                dateInput:{borderWidth:0},
                placeholderText:{fontSize:barHeight/2,color: '#9D9D9D'},
                dateText:{fontSize:barHeight/2.5,color: '#9D9D9D'}
              }}
              style={{margin:2,borderColor:'#9D9D9D',borderWidth:1,borderRadius:25,borderColor:"#008CBA",flex:1}}
              date={this.state.customerData.reciverDate}
              placeholder={this.state.reciverSwitch&&this.state.customerData.reciverDate||'בחר תאריך'}
              mode="datetime"
              format="DD-MM-YYYY HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(datetime) => {this.setState(prevState => ({customerData:{...prevState.customerData,reciverDate:datetime,reciverSwitch:true}}))}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.header,styles.button,{flex:1}]}
              onPress={() => this.approvedDelivering()}
              >
              <Text style={styles.fontStyle}>אישור</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.header,styles.button,{flex:1}]}
              onPress={() => this.disapprovedDelivering()}
              >
              <Text style={styles.fontStyle}>ביטול</Text>
            </TouchableOpacity>
          </View>
      </Modal>












      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"editor"}
        >
        <View style={{padding:10}}>
          <Text style={{fontSize:barHeight/2}}>עריכה</Text>
        </View>
        <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.editPickImageHandler}>
              <Image source={this.state.editor.pickedImage} style={styles.previewImage}/>
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              underlineColorAndroid={'gray'}
              value={this.state.editor.gemachName}
              style={styles.textInput}
              onChangeText={(text) => this.setState(prevState => ({editor:{...prevState.editor, gemachName: text}}))}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.gemachEditor()}
            >
            <Text style={styles.fontStyle}>אישור</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.refs.editor.close()}
            >
            <Text style={styles.fontStyle}>ביטול</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={[styles.modalbox]}
        position={'center'}
        ref={"creator"}
        >
        <View style={{padding:10}}>
          <Text style={{fontSize:barHeight/2}}>צור פריט</Text>
        </View>
        <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.pickImageHandler}>
              {!this.state.displayImage && <Text style={{fontSize:20}}>בחר תמונה</Text>}
              {this.state.displayImage && <Image source={this.state.pickedImage} style={styles.previewImage}/>}
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              underlineColorAndroid={'gray'}
              placeholder={'שם הפריט'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({gemachName: text})}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.createGemach()}
            >
            <Text style={styles.fontStyle}>אישור</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.header,styles.button,{flex:1}]}
            onPress={() => this.refs.creator.close()}
            >
            <Text style={styles.fontStyle}>ביטול</Text>
          </TouchableOpacity>
        </View>
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
      </MenuProvider>
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
  dateButton:{
    borderColor: "#008CBA",
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize:StatusBar.currentHeight,
    borderColor: 'black',
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
