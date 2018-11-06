import React, { Component } from 'react'
import { AppRegistry, View, Text } from 'react-native'
import {StackNavigator} from 'react-navigation';
import Home from './home.js'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
        <Home navigation={this.props.navigation} />
    )
  }
}


const App = StackNavigator({
  Home:{screen:HomeScreen},
});

export default App;
