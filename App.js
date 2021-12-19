import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View,Image} from 'react-native'
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/app'
import 'firebase/firestore'
import * as logo from './assets/logo.png'
//Redux
import {createStore} from 'redux'
import {colors} from './src/components/Style'
import {Provider} from 'react-redux'
import {rootReducer} from './src/redux/rootReducer'
import {addFaceParameters,addBodyParameters} from './src/redux/action'


const store = createStore(rootReducer)

//Components
import Application from './Application'
// import SplashScreen from './src/screens/SplashScreen'

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
      isOpen:false,
      }
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDVmO4RKAoMawu-rL4dSQxHerH3csFPQNU",
      authDomain: "fotou-bde18.firebaseapp.com",
      databaseURL: "https://fotou-bde18-default-rtdb.firebaseio.com",
      projectId: "fotou-bde18",
      storageBucket: "fotou-bde18.appspot.com",
      messagingSenderId: "699484489454",
      appId: "1:699484489454:web:82d71271ccd3253a1a15ff",
      measurementId: "G-RLDF2ZNVZ6"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
       firebase.app();
    }
    this._loadAsync()
  }

  setParametersForOrder(){
    let db = firebase.firestore()
    db.collection('faceParameters').get().then((param) => {
      param.forEach((doc) => {
        store.dispatch(addFaceParameters(doc.data()))
      });
    })
    db.collection('bodyParameters').get().then((param) => {
      param.forEach((doc) => {
        store.dispatch(addBodyParameters(doc.data()))
      });
    })
  }

  //FONT
  async _loadAsync() {
    try {
      await Font.loadAsync(customFonts);
      this.setParametersForOrder()
    } catch(e) {
      console.warn(e)
    } finally {
      this.setState({ isOpen: true })
    }
  }
  // async loadFetch(){
  //   await fetch('https://panel.netangels.ru/cloud/vm/67859/home/web/p.fotou.expert/www/paykeeper/getLink.php',{method:'POST',mode:"no-cors",body:JSON.stringify({summa:52,clientId:2,orderId:12,})})
  //     .then((res) => console.log(res))
  // }

  render(){
    return (
      this.state.isOpen ?
        <NavigationContainer>
          <Provider store = {store}>
              <Application/>
          </Provider>
        </NavigationContainer>
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.darkBeige}}>
          <Image source={require('./assets/logo.png')} style={{width:'100%',height:30}} resizeMode='contain'/>
        </View>
      )}
    // return }
}
