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


export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date().toLocaleDateString("en-US"),
      displayitem: false,
      gemachName:'',
      itemName: '',
      itemDescription: '',
      pickedImage: null,
      displayImage: false,
      displayText:true,
      key:0,
      itemsList:[],
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

  createitem(){
    let today  = new Date();
    let card = {date:this.state.date,
                displayitem:this.state.displayitem,
                itemName:this.state.itemName,
                itemDescription:this.state.itemDescription,
                pickedImage:this.state.pickedImage,
                itemsList:this.state.itemsList,
                key:this.state.key}
    this.setState(prevState => ({
      displayitem:true,
      displayImage:false,
      displayText:true,
      date: today.toLocaleDateString("en-US"),
      key: +1,
      itemsList: [...prevState.itemsList,card]
    }));
    console.log("pickedImage: " +this.state.pickedImage)
    console.log("dataList: "+this.state.itemsList.date)
    this.refs.item.close()
  }

renderItem(){
  console.log("date: " + this.state.itemsList.date)
  return this.state.itemsList.map(data =>
    <Card
    navigate={() => this.props.navigation.navigate("Item",
                    {Items:data.itemName})}
      key={data.key}
      date={data.date}
      display={data.displayitem}
      name={data.itemName}
      description={data.itemDescription}
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
        ref={"item"}
        >
        <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.imageBox} onPress={this.pickImageHandler}>
              {this.state.displayText && <Text style={{fontSize:20}}>בחר תמונה</Text>}
              {this.state.displayImage && <Image source={this.state.pickedImage} style={styles.previewImage}/>}
            </TouchableOpacity>
          <View style={{flex:1,flexDirection: 'column'}}>
            <TextInput
              placeholder={'שם הפריט'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({itemName: text})}
            />
            <TextInput
              placeholder={'תיאור'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({itemDescription: text})}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.header,styles.button]}
          onPress={() => this.createitem()}
          >
          <Text style={styles.fontStyle}>אישור</Text>
        </TouchableOpacity>
      </Modal>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.header}>
          <Text style={styles.fontStyle}>{this.props.navigation.state.params.Home}</Text>
        </View>
        {this.state.displayitem && this.renderItem()}
          <TouchableOpacity
            style={[styles.header,styles.button]}
            onPress={() => this.refs.item.open()}
            >
            <Text style={styles.fontStyle}>הוסף פריט</Text>
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
