import React, {Component} from 'react';
import {Button, ScrollView, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Card from "./Card";

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
          <Card>
            <Text>this is checking</Text>
          </Card>
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
});
