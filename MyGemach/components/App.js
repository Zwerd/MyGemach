import React, { Component } from 'react'
import { AppRegistry, View, Text, StatusBar } from 'react-native'
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


const AppContent = createStackNavigator({
  Home:{screen:HomeScreen},
  Items:{screen:ItemsScreen},
});

const App = () => (
  <View style={{flex: 1}}>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#0078a4" translucent = {false}/>
   <AppContent />
 </View>
)

export default App;
