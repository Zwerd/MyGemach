import React, { Component } from 'react'
import { AppRegistry, View, Text } from 'react-native'
import {createStackNavigator} from 'react-navigation';
import Home from './home'


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

const App = createStackNavigator({
  Home:{screen:HomeScreen},
});

export default App;
