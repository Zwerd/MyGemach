import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text, View, StatusBar} from 'react-native';
import Card from "./Card";
import {createStackNavigator} from 'react-navigation'

export default class Home extends React.Component {
  render() {
    console.log(StatusBar.currentHeight)
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.head}>
          <Text style={{fontSize:StatusBar.currentHeight}}>הגמח שלי</Text>
        </View>
          <TouchableOpacity
            style={styles.button}>
            <Text style={{fontSize:StatusBar.currentHeight}}>צור גמח חדש</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  head:{
    backgroundColor: 'rgba(192,192,192, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    flex:9,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255,255,255, 0.8)',

  }
});
