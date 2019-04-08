import React, { Component } from 'react'
import { AppRegistry, View, Text, StatusBar } from 'react-native'
import {createStackNavigator} from 'react-navigation';
import Home from './home'
import Items from './items'
import ItemDetails from './itemDetails'
import Histories from './histories'
import Settings from './settings'




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

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
        <Settings navigation={this.props.navigation} />
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

class ItemDetailsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
        <ItemDetails navigation={this.props.navigation} />
    )
  }
}

class HistoriesScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
        <Histories navigation={this.props.navigation} />
    )
  }
}



const AppContent = createStackNavigator({
  Home:{screen:HomeScreen},
  Settings:{screen:SettingsScreen},
  Items:{screen:ItemsScreen},
  ItemDetails:{screen:ItemDetailsScreen},
  Histories:{screen:HistoriesScreen},
});

const App = () => (
  <View style={{flex: 1}}>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#0078a4" translucent = {false}/>
   <AppContent />
 </View>
)

export default App;
