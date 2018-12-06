import React, {Component} from 'react';
import { Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";
import Card from "./card";

let today  = new Date();
let dim = Dimensions.get('window');
let height = StatusBar.currentHeight * 1.5

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
      remove:false,
      gemachDescription: '',
      pickedImage: null,
      displayImage: false,
      displayText:true,
      key:0,
      dataList:[],
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

  removeItem = (itemNumber) => {
    console.log('this is data from card: ' + itemNumber)
    let newList = this.state.dataList
    for(i=0;i<newList.length;i++){
      console.log('in loop i is: '+i)
      if(newList[i].key == itemNumber){
        console.log('in if')
        newList.splice(i, 1)
        this.setState({dataList:newList})
      }
      if(this.state.dataList.length == 0){
        this.setState({remove:false})
      }
    }
  }

renderList(){
  return this.state.dataList.map(data =>
    <Card
      callbackFromHome={this.removeItem}
      navigate={() => this.props.navigation.navigate("Items",
                      {Home:data.gemachName})}
      remove={this.state.remove}
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

checkLength(){
  if(this.state.dataList.length != 0){
    this.setState({remove:!this.state.remove})
  }
}


  render() {
    console.log('dataList:',this.state.dataList)

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
              placeholder={'שם הגמח'}
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
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'center',backgroundColor: 'rgb(0,176,240)', height: height}}>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
            <TouchableOpacity
              onPress={console.log('search was press')}>
              <Image source={require('../images/setting.png')} style={{width: height, height: height}}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={console.log('settings was press')}>
              <Image source={require('../images/search.png')} style={{width: height, height: height}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center', justifyContent:'space-around'}}>
            <Text style={styles.fontStyle}>הגמח שלי</Text>
          </View>
        </View>
        {this.state.displayGemach && this.renderList()}
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-around',margin:height/2}}>
            <TouchableOpacity
              style={{height:height, width:height}}
              onPress={() => this.refs.creator.open()}
              >
                <Image source={require('../images/adding.png')} style={{width: '100%', height: '100%'}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height:height, width:height}}
              onPress={() => this.checkLength()}
              >
                {this.state.remove &&
                  <Image source={require('../images/approve.png')} style={{width: '100%', height: '100%'}} /> ||
                  <Image source={require('../images/remove.png')} style={{width: '100%', height: '100%'}} />}
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
    height: height,
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
