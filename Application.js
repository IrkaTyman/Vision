import React,{useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase'
//Redux
import {connect,useDispatch} from 'react-redux'
import {addPerson,removePerson,repeatEmail,incorEmailOrPass, addNowOrder,addOldOrders} from './src/redux/action'

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

  const submitLogupBtn = (user,designer) => {
      user.balance=0
      user.orders={}
      user.img=''
      user.status = designer ? 'designer' : 'client'
      let emailStr = user.email.replace('.','')
      firebase.database().ref('users/'+emailStr).get().then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(repeatEmail(true))
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
                  if(snap.val().status != 'inComplete'){
                     dispatch(addNowOrder(snap.val()))
                  } else {
                    oldOrders.push(snap.val())
                  }
                  if(item == orders[orders.length-1]){
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

  /*autoRegestrationHandler(userGet){
    const user = userGet
    localStorage.setItem(`user`, JSON.stringify(user))
  }*/


  return(
    isLogin ? <RootDrawerNavigation/> : <RegistrationWrapper login = {submitLoginBtn} logup={submitLogupBtn}/>
  )
}

let mapStoreToProps = (store) => ({
  isLogin:store.register.isLogin,
  user:store.register.user
})

export default connect(mapStoreToProps)(Application)
