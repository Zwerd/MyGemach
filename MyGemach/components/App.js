import React, { Component } from 'react'
import { AppRegistry, View, Text } from 'react-native'
import {createStackNavigator} from 'react-navigation';
import Home from './home'
import Items from './items'



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
class ItemsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
        <Items navigation={this.props.navigation} />
    )
  }
}
class ItemScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
        <Item navigation={this.props.navigation} />
    )
  }
}
const App = createStackNavigator({
  Home:{screen:HomeScreen},
  Items:{screen:ItemsScreen},
  Item:{screen:ItemScreen}
});

export default App;
