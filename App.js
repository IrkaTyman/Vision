import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

//Redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {rootReducer} from './src/redux/rootReducer'

const store = createStore(rootReducer)

//Components
import Application from './Application'
import SplashScreen from './src/screens/SplashScreen'

//Fonts
let customFonts = {
  'Montserrat-300': require('./assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-400': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-500': require('./assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-700': require('./assets/fonts/Montserrat-Bold.ttf'),
};
let font = 'serif'


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen:false
      }
  }

  componentDidMount() {
    this._loadAsync();
  }

  //FONT
  async _loadAsync() {
    try {
      await Font.loadAsync(customFonts);
    } catch(e) {
      console.warn(e)
    } finally {
      this.setState({ isOpen: true })
    }
  }

  render(){
    if(this.state.isOpen){
      return (
        <NavigationContainer>
          <Provider store = {store}>
            <Application/>
          </Provider>
        </NavigationContainer>
      );
    }
    return(<SplashScreen/>)
  }
}
