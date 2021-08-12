import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

//Redux
import {connect} from 'react-redux'
import {addPerson,removePerson} from './src/redux/action'

//Components
import {styles} from './src/components/Style'
import {Button} from './src/components/Button'
import SignIn from './src/screens/SignIn'
import Home from './src/screens/Home'
import HomeStack from './src/routes/homeStack'
import {RootDrawerNavigation} from './src/routes/drawer'

class Application extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin:this.props.isLogin,
      }
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount() {
    /*ToDo FIREBASE*/
    /*ToDo Google Auth*/
  }

  signOut(){
      dispatch(removePerson())
      this.setState({ isLogin:false})
    }

  /*FIREBASE function
    setUserData({email,username,password,tel,status,img,id}) {
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

  /*GOOGLE AUTH function
    signInWithGoogle(e){
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

  /*Registration function
  createUserDate(emailStr,userGet,service){
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
    if(this.state.isLogin){
      return <RootDrawerNavigation/>
    }
    return <SignIn/>
  }
}

let mapStoreToProps = (store) => ({
  isLogin:store.register.isLogin
})

export default connect(mapStoreToProps)(Application)
