import React, {Component} from 'react';
import { Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";
import Card from "./card";



let dim = Dimensions.get('window');

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
      console.log("pickedImage: " +this.state.pickedImage)
      }
    });
  }

  createGemach(){
    let today  = new Date();
    let card = {date:this.state.date,
                displayGemach:this.state.displayGemach,
                gemachName:this.state.gemachName,
                gemachDescription:this.state.gemachDescription,
                pickedImage:this.state.pickedImage,
                dataList:this.state.dataList,
                key:this.state.key}
    this.setState(prevState => ({
      displayGemach:true,
      displayImage:false,
      displayText:true,
      date: today.toLocaleDateString("en-US"),
      key: +1,
      dataList: [...prevState.dataList,card]
    }));
    console.log("pickedImage: " +this.state.pickedImage)
    console.log("dataList: "+this.state.dataList.date)
    this.refs.creator.close()
  }

renderList(){
  console.log("date: " + this.state.dataList.date)
  return this.state.dataList.map(data =>
    <Card
      navigate={() => this.props.navigation.navigate("Items",
                      {Home:data.gemachName})}
      key={data.key}
      date={data.date}
      display={data.displayGemach}
      name={data.gemachName}
      description={data.gemachDescription}
      pickedImage={data.pickedImage}
      keyExtractor={(item) => item.toString()}
    />
  )
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
        <View style={styles.header}>
          <Text style={styles.fontStyle}>הגמח שלי</Text>
        </View>
        {this.state.displayGemach && this.renderList()}
          <TouchableOpacity
            style={[styles.header,styles.button]}
            onPress={() => this.refs.creator.open()}
            >
            <Text style={styles.fontStyle}>צור גמח חדש</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fontStyle:{
    fontFamily:'nrkis',
    fontSize:StatusBar.currentHeight
  },
  header:{
    backgroundColor: 'rgba(135,206,235, 0.8)',
    borderColor: "#008CBA",
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
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
