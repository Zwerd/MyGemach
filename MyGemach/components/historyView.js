import React, {Component} from 'react';
import {Alert, Dimensions, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, BackHandler} from 'react-native';


export default class HistoryView extends Component {
constructor(props) {
  super(props);
  this.state = {
    backgroundColor:this.props.backgroundColor,
    };
}


render(){
  return(
    {this.props.historiesData.map(data =>
        <View style={styles.View}>
          <Text>שם: {data.fullName}</Text>
          <Text>כתובת: {data.address}</Text>
          <Text>מספר: {data.phone}</Text>
        </View>
        <View style={styles.View}>
          <Text>תאריך מסירה: {data.deliverDate}</Text>
          <Text>תאריך החזרה: {data.reciverDate}</Text>
        </View>
    }
    )
  }
}
const styles = StyleSheet.create({
  display:{
    justifyContent: 'center',
    textAlign: 'right',
    margin: 5,
    marginRight:null,
    marginBottom:0,
    borderWidth:1,
    borderColor:'#00B0F0',
  },
  View:{
    height: dim.height/8,
    width: ((dim.width-11)/4) * 3,
    borderBottomWidth:1,
    padding:2,
  },
  ViewImage:{
    width: (dim.width-16)/4,
    overflow: 'hidden',
  },
  previewImage: {
    width: "100%",
    height: "100%",
  }
});

export default Card
