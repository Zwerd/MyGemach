import {createStackNavigator} from 'react-navigation';
import HomeScreen from './home.js'

const App = createStackNavigator({
  Home:{screen:HomeScreen},
});

export default App;
