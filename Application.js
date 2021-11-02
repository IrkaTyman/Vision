import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app'
import "firebase/auth";
import * as Google from 'expo-google-app-auth';
import LogupStack from './src/routes/logupStack'
//import {Google} from 'expo';
//Redux
import {connect,useDispatch} from 'react-redux'
import {changeCountImgInGallery,addAllST,addPerson,removePerson,repeatEmail,incorEmailOrPass, addNowOrder,addOldOrders} from './src/redux/action'

//Components
import {styles} from './src/components/Style'
import {Button} from './src/components/Button'
import LogUpPrize from './src/screens/LogUpPrize'
import RegistrationWrapper from './src/screens/RegistrationWrapper'
import Home from './src/screens/Home'
import {RootDrawerNavigation} from './src/routes/rootDrawer'


const Application = (props) => {
  const isLogin = props.isLogin
  const dispatch = useDispatch()
  const [logUp,setLogUp] = useState(false)
  const db = firebase.database()

  const submitLogupBtn = async (user,designer) => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(async (userCredential) => {
        let id = await db.ref('countUsers').get().then((snap) => {return snap.val()})
        let userUID = userCredential.user.uid;
        user.balance=60
        user.id=id+1
        user.orders={}
        user.uid=userUID
        user.img='https://www.blexar.com/avatar.png'
        user.status = designer ? 'designer' : 'client'
        user.subscription = false
        db.ref('users/' + userUID).set(user);
        db.ref('countUsers').set(firebase.database.ServerValue.increment(1))
        dispatch(addPerson(user))
        setLogUp(true)
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          dispatch(repeatEmail(true))
        }
        console.error(error);
      })

  }
  const submitLoginBtn = (user) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      let userUID = userCredential.user.uid;
        db.ref('users/'+userUID).get().then((snapshot) => {
          if (snapshot.exists()) {
            let user = snapshot.val()
            user.uid = userUID
            let oldOrders = []
            let visibleOldOrderImg = {}
            let nowOrder = []
            if(snapshot.val().status=='moderator'){
              db.ref('orders/').orderByChild('dateComplete').get().then((snap)=>{
                if(snap.exists()){
                  dispatch(addAllST({who:'allOrders',what:snap.val()}))
                }
              })
              db.ref('users/').get().then((snap)=>{
                if(snap.exists()){
                  let clients = []
                  let designers = []
                  Object.keys(snap.val()).map((item) => {
                    if(snap.val()[item].status == 'designer') designers.push(snap.val()[item])
                    else clients.push(snap.val()[item])
                  })
                  dispatch(addAllST({who:'allClients',what:clients}))
                  dispatch(addAllST({who:'allDesigners',what:designers}))
                }
              })
            } else {
              let orders = snapshot.val().orders
              if(orders){
                orders.map((item) => {
                  db.ref('orders/'+item).get().then((snap)=>{
                    if(snap.exists()){
                      if(snap.val().status != 'inComplete'){
                        dispatch(addNowOrder(snap.val()))
                         /*user.status == 'designer'
                          ? dispatch(addNowOrder(snap.val()))
                          : nowOrder.push(snap.val())*/
                      } else {
                        if(snap.val().visiblePhoto){
                          visibleOldOrderImg[oldOrders.length] = snap.val().afterImg
                        }
                        oldOrders.push(snap.val())

                      }
                        if(item == orders[orders.length-1]){
                          console.log(oldOrders,visibleOldOrderImg)
                        dispatch(addOldOrders(oldOrders))
                        dispatch(changeCountImgInGallery(visibleOldOrderImg))
                         /*user.status == 'client'
                          ? dispatch(addNowOrder(nowOrder))
                          : null*/
                      }
                    }
                  })
                })}
              }
              dispatch(incorEmailOrPass(false))
              dispatch(addPerson(user))
          }
        })
    })
    .catch((error) => {
      if(error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password'){
        dispatch(incorEmailOrPass(true))
      }
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage,errorCode)
    });}

/*const googleSignIn = async () => {
  try {
      const result = await Google.logInAsync({
        behavior:'web',
        androidClientId: "555127756939-735lfnkshr92a5nlut2qo785fk5aeuek.apps.googleusercontent.com",
      });
      console.log(2)
      if (result.type === 'success') {
        console.log(result);
        setIsLoading(true);
        const credential = firebase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        firebase.auth()
          .signInWithCredential(credential) //Login to Firebase
          .catch((error) => {
            console.log(error);
          });
      } else {
        //CANCEL
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
}*/

    /*let emailStr = user.email.replace('.','')
    firebase.database().ref('users/'+emailStr).get().then((snapshot) => {
      if (snapshot.exists()) {
        if(snapshot.val().password == user.password){
          let oldOrders = []
          let nowOrder = {}
          if(snapshot.val().status=='moderator'){
            firebase.database().ref('orders/').orderByChild('dateComplete').get().then((snap)=>{
              if(snap.exists()){
                dispatch(addAllST({who:'allOrders',what:snap.val()}))
              }
            })
            firebase.database().ref('users/').get().then((snap)=>{
              if(snap.exists()){
                let clients = []
                let designers = []
                Object.keys(snap.val()).map((item) => {
                  if(snap.val()[item].status == 'designer') designers.push(snap.val()[item])
                  else clients.push(snap.val()[item])
                })
                dispatch(addAllST({who:'allClients',what:clients}))
                dispatch(addAllST({who:'allDesigners',what:designers}))
              }
            })
          } else {
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
          }

          dispatch(incorEmailOrPass(false))
          dispatch(addPerson(snapshot.val()))
        } else dispatch(incorEmailOrPass(true))
      } else {
        dispatch(incorEmailOrPass(true))
      }
    }).catch((error) => {
      console.error(error);
    })
  }*/

  /*autoRegestrationHandler(userGet){
    const user = userGet
    localStorage.setItem(`user`, JSON.stringify(user))
  }*/


  return(
    isLogin
      ? !logUp
        ?<RootDrawerNavigation moderator={props.user.status=='moderator'}/>
        : <LogUpPrize logUp={logUp} setLogUp={setLogUp}/>
      :   <LogupStack  login = {submitLoginBtn} logup={submitLogupBtn}/>
  )
}

let mapStoreToProps = (store) => ({
  isLogin:store.register.isLogin,
  user:store.register.user
})

export default connect(mapStoreToProps)(Application)
