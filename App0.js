import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

//Redux
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import {rootReducer} from './src/redux/rootReducer'
import {addPerson,removePerson} from './src/redux/action'

const store = createStore(rootReducer)

//Components
import {styles} from './src/components/Style'
import {Button} from './src/components/Button'
import SignIn from './src/screens/SignIn'
import Home from './src/screens/Home'
import Header from './src/screens/Header'
import HomeStack from './src/routes/homeStack'
import {RootDrawerNavigation} from './src/routes/drawer'
import SplashScreen from './src/screens/SplashScreen'

//Fonts
let customFonts = {
  'Montserrat-300': require('./assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-400': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-500': require('./assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-700': require('./assets/fonts/Montserrat-Bold.ttf'),
};
let font = 'serif'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin:this.props.isLogin,
      isOpen:false
      }
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount() {
    this._loadAsync();

    /*ToDo FIREBASE*/

    /*ToDo Google Auth*/
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

   signOut(){
    const dispatch = useDispatch()
    dispatch(removePerson())
    this.setState({...this.state, isLogin:false})
  }




  //FIREBASE function
  /*setUserData({email,username,password,tel,status,img,id}) {
      firebase.database().ref('users/' + email.replace('.','')).set({
        email: email,
        username: username,
        password:password,
        tel:tel,
        status:status,
        img: img || '',
        id:id
      });
  }*/

  /*checkUserDate(emailStr,userGet,service){
    const usersRef = firebase.database().ref(`users/${emailStr}`);
    usersRef.on('value', (userRef) => {
      const user = userRef.val();
      if(user.password === userGet.password || service === 'google') {
        this.setUserRegister(user)
        this.props.dispatch(checkIncor(false))
        this.autoRegestrationHandler(user)
      } else {
        this.props.dispatch(checkIncor(true))
        this.setState({incEmOrPas:true})
      }
    });
  }*/



  //GOOGLE AUTH function
  /*signInWithGoogle(e){
      const _authOk = (userGet) => {
        let user = userGet.getBasicProfile();
        this.submitRegisterHandler(e,{email:user.getEmail(), username:user.getName(), password: '', tel: '', status: 'person', id:Date.now().toString()},'google')
      }
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn({ scope:'profile email' }).then( _authOk, () => console.log('Auth Err'))
  }

  signOutWithGoogle(){
      const GoogleAuth = window.gapi.auth2.getAuthInstance()
      GoogleAuth.signOut()
  }*/



  //Registration function
  /*createUserDate(emailStr,userGet,service){
    const usersRef = firebase.database().ref(`users/${emailStr}`);
    usersRef.on('value', (userRef) => {
      const user = userRef.val();
      if(user) {
        this.props.dispatch(checkRepeatEmail(true));
        this.setState({doubleEmail:true})
      } else {
        this.setUserData(userGet)
        this.props.dispatch(checkRepeatEmail(false))
        this.setUserRegister(userGet)
        this.autoRegestrationHandler(userGet)
      }
    });
  }

  autoRegestrationHandler(userGet){
    const user = userGet
    localStorage.setItem(`user`, JSON.stringify(user))
  }

  setUserRegister(userGet){
    this.props.dispatch(addPerson(userGet))
    this.setState({userLogin:{...userGet},login:true,doubleEmail:false,incEmOrPas:false})
  }

  submitRegisterHandler(e,userGet,service = 'site'){
      e.preventDefault();
      if(this.props.actionLog == 'logUp'){
        this.createUserDate(userGet.email.replace('.',''),userGet,service)
      } else {
        this.checkUserDate(userGet.email.replace('.',''),userGet,service)
      }
  }*/



  render(){
    if(this.state.isOpen){
      return (
        <NavigationContainer>
          <Provider store = {store}>
            {this.state.isLogin
              ? <RootDrawerNavigation/>
              : <SignIn/>}
          </Provider>
        </NavigationContainer>
      );
    }
    return(<SplashScreen/>)
  }
}
