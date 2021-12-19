import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import * as Google from 'expo-google-app-auth';
import LogupStack from './src/routes/logupStack'
import {reloadMessage} from './src/function/reloadMessage'
import {reloadOrders} from './src/function/reloadOrders'
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
import RootDrawerNavigation from './src/routes/rootDrawer'
import BlockUser from './src/screens/BlockUser'
import {sortByDateArr} from './src/function/sortFunction'


const Application = (props) => {
  const isLogin = props.isLogin
  const [block,setBlock] = useState(false)
  const dispatch = useDispatch()
  const [logUp,setLogUp] = useState(false)
  const db = firebase.database()
  const dbMessages = firebase.firestore().collection('messages_tree')

  useEffect(()=>{
    let timer
    if(props.user.status != 'moderator') {
        timer = setInterval(()=>{
          reloadMessage(props.user,props.user.uid,props.allMessages,dispatch)
        },3600000)
    } else {
      timer = setInterval(()=>{
        Object.keys(props.allUsers).map(item=>{
          reloadMessage(props.user,item,props.allMessages,dispatch,props.resolveIssueModerator,props.messagesAutor)
        })}
      ,3600000)
    }
    return ()=> {clearTimeout(timer)}
  })
  useEffect(()=>{
    let timer
    if(props.user.status != 'moderator') {
        timer = setInterval(()=>{
          reloadOrders(props.user.orders,dispatch,props.user)
        },18000000)
    }
    return ()=> {clearTimeout(timer)}
  })

  const submitLogupBtn = async (user,designer) => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(async (userCredential) => {
        const userData = JSON.stringify({email:user.email,password:user.password})
        await AsyncStorage.setItem('@storage_user', userData)
        let id = await db.ref('countUsers').get().then((snap) => {return snap.val()})
        let userUID = userCredential.user.uid;
        user.balance=60
        user.id=id+1
        user.blocked = false
        user.orders={}
        user.uid=userUID
        user.img='https://www.blexar.com/avatar.png'
        user.status = designer ? 'designer' : 'client'
        user.subscription = {phoho:false,day:false,name:false}
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

  function submitModerator(){
    db.ref('orders/').orderByChild('dateComplete').get().then((snap)=>{
      if(snap.exists()){
        dispatch(addAllST({who:'allOrders',what:snap.val()}))
      }
    })
    db.ref('users/').get().then((snap)=>{
      if(snap.exists()){
        let users = {}
        let messages = {}
        let resolveIssueModerator= {}
        Object.keys(snap.val()).map((item) => {
          messages[item] = []
          dbMessages.doc(item).get().then((snap)=>{
             if (snap.exists) resolveIssueModerator[item]= snap.data().resolveIssue
          })
          dbMessages.doc(item).collection('messages').orderBy('timestamp').get().then((param) => {
            param.forEach((doc) => {
              messages[item].push(doc.data())
            });
            if (!messages[item][0]) delete messages[item]
          })

          if(snap.val()[item].status !== 'moderator') users[item] = snap.val()[item]
        })
        dispatch(addAllST({who:'allMessages',what:messages}))
        dispatch(addAllST({who:'resolveIssueModerator',what:resolveIssueModerator}))
        dispatch(addAllST({who:'allUsers',what:users}))
      }
    })
  }

  function submitUser(user,snapshot){
    dbMessages.doc(user.uid+'').collection('messages').orderBy('timestamp').get().then((param) => {
      let messages = []
      param.forEach((doc) => {
        messages.push(doc.data())
      });
      if(messages[0]){
        dispatch(addAllST({who:'messages',what:messages}))
      } else dispatch(addAllST({who:'messages',what:[]}))
    })
    dbMessages.doc(user.uid+'').get().then((snap)=>{
       if (snap.exists) dispatch(addAllST({who:'readUserMessage',what:snap.data().readUserMessage}))
    })
    let date = new Date
    user.canSubsc = user.subscription.photo > 0 && user.subscription.day > date.setHours(date.getHours()+24)
    if(!user.canSubsc && user.subscription.day){
      db.ref('users/'+userUID).update({subscription:{phoho:false,day:false,name:false},canSubsc:false})
    }
    let orders = snapshot.val().orders
    reloadOrders(orders,dispatch,user)
  }
  const submitLoginBtn = (user) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(async (userCredential) => {
      const userData = JSON.stringify({email:user.email,password:user.password})
      let userUID = userCredential.user.uid;
        db.ref('users/'+userUID).get().then(async(snapshot) => {
          if (snapshot.exists()) {
            if(!snapshot.val().blocked){
              await AsyncStorage.setItem('@storage_user', userData)
              let user = snapshot.val()
              let date = new Date
              user.uid = userUID
              if(snapshot.val().status=='moderator'){ submitModerator()}
              else { submitUser(user,snapshot) }
              dispatch(incorEmailOrPass(false))
              dispatch(addPerson(user))
          } else {
            dispatch(incorEmailOrPass(false))
            setBlock(true)
          }
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
    });

  }

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

  const autoRegestrationHandler = async () => {
    const userJSON = await AsyncStorage.getItem('@storage_user')
    let user = JSON.parse(userJSON)
    if (user) {
      submitLoginBtn(user)
    }
  }

  if(!isLogin) autoRegestrationHandler()
  return(
    isLogin
      ? !logUp
        ?<RootDrawerNavigation moderator={props.user.status=='moderator'}/>
        : <LogUpPrize logUp={logUp} setLogUp={setLogUp}/>
      :   block
        ? <BlockUser goBack={setBlock}/>
        : <LogupStack  login = {submitLoginBtn} logup={submitLogupBtn}/>
  )
}

let mapStoreToProps = (store) => ({
  isLogin:store.register.isLogin,
  user:store.register.user,
  allUsers:store.register.allUsers,
  allMessages:store.register.allMessages,
  messagesAutor:store.register.messagesAutor,
  resolveIssueModerator:store.register.resolveIssueModerator
})

export default connect(mapStoreToProps)(Application)
