import React,{useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase'
//Redux
import {connect,useDispatch} from 'react-redux'
import {addPerson,removePerson,repeatEmail,incorEmailOrPass,addFaceParameters,addBodyParameters, addNowOrder,addOldOrders} from './src/redux/action'

//Components
import {styles} from './src/components/Style'
import {Button} from './src/components/Button'
import RegistrationWrapper from './src/screens/RegistrationWrapper'
import Home from './src/screens/Home'
import HomeStack from './src/routes/homeStack'
import {RootDrawerNavigation} from './src/routes/rootDrawer'


const Application = (props) => {
  const isLogin = props.isLogin
  const dispatch = useDispatch()
  let db = firebase.firestore()
  let data

  useEffect(()=>{
    db.collection('faceParameters').get().then((param) => {
      param.forEach((doc) => {
        let data = doc.data()
        dispatch(addFaceParameters(data))
      });
    })
    db.collection('bodyParameters').get().then((param) => {
      param.forEach((doc) => {
        let data = doc.data()
        dispatch(addBodyParameters(data))
      });
    })
    async () => data = await AsyncStorage.getItem('userData');
  },[])

  const submitLogupBtn = (user,designer) => {
      user.balance=0
      user.orders={}
      user.img=''
      user.status = designer ? 'designer' : 'client'
      let emailStr = user.email.replace('.','')
      firebase.database().ref('users/'+emailStr).get().then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(repeatEmail(true))
          console.log('repeat email')
        } else {
          dispatch(repeatEmail(false))
          firebase.database().ref('users/' + emailStr).set(user);
          dispatch(addPerson(user))
        }
      }).catch((error) => {
        console.error(error);
      })
  }
  const submitLoginBtn = (user) => {
    let oldOrders = []
    let nowOrder = {}
    let emailStr = user.email.replace('.','')
    firebase.database().ref('users/'+emailStr).get().then((snapshot) => {
      if (snapshot.exists()) {
        if(snapshot.val().password == user.password){
          let orders = snapshot.val().orders
          if(orders){
            orders.map((item) => {
              firebase.database().ref('orders/'+item).get().then((snap)=>{
                if(snap.exists()){
                  if(snap.val().status == 'inWork'||snap.val().status == 'inRating'){
                     dispatch(addNowOrder(snap.val()))
                  } else oldOrders.push(snap.val())
                  if(item = orders[orders.length-1]){
                    dispatch(addOldOrders(oldOrders))
                  }
                }
              })
            })}
          dispatch(incorEmailOrPass(false))
          dispatch(addPerson(snapshot.val()))
        } else dispatch(incorEmailOrPass(true))
      } else {
        dispatch(incorEmailOrPass(true))
      }
    }).catch((error) => {
      console.error(error);
    })
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

  return(
    isLogin ? <RootDrawerNavigation/> : <RegistrationWrapper login = {submitLoginBtn} logup={submitLogupBtn}/>
  )
}

let mapStoreToProps = (store) => ({
  isLogin:store.register.isLogin,
  user:store.register.user,
  faceParameters:store.register.faceParameters
})

export default connect(mapStoreToProps)(Application)
