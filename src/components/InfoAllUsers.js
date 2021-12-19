import React, { Component,useState,useEffect} from "react";
import { View,Image,Text,Pressable,Platform,UIManager} from "react-native";
import {styles} from './Style';
import {addOldOrders,addAllST} from '../redux/action'
import firebase from 'firebase/app'
import 'firebase/database'

//REDUX
import {connect,useDispatch} from 'react-redux'

const InfoAllUsers = ({data,nav,allOrders,allUsers}) => {
  const user = allUsers[data]
  const [expanded,setExpanded] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  })
  function getOrdersByUser(){
    setExpanded(false)
    if(user.orders) return allOrders.filter((item)=> user.orders.indexOf(item.id)!=-1)
    return []
  }
  function getProfileByUser(){
    setExpanded(false)
    let orders = user.orders? allOrders.filter((item)=> user.orders.indexOf(item.id)!=-1) : []
    dispatch(addOldOrders(orders))
    nav.navigate('profileOfUser',{user:user})
  }

  function blockUser(){
    let arrUser = Object.assign({},allUsers)
    firebase.database().ref('/users/'+data).update({blocked:!arrUser[data].blocked})
    arrUser[data].blocked = !arrUser[data].blocked
    dispatch(addAllST({who:'allUsers',what:arrUser}))
  }
  function getMessageByUser(){
    console.log(data)
    dispatch(addAllST({who:'messagesAutor',what:data}))
    nav.navigate('Support',{userUID:data})
  }

    return (
      <View style={[styles.profileBlock]}>
        <View style={[styles.fd_r,styles.jc_sb,styles.p_fsm,styles.ai_c]}>
          <View style={[styles.fd_r,styles.ai_c]}>
            <Image source={{uri:user.img}} style={[styles.headerAvaImg,styles.avaImg,styles.actionWithUserAva]}/>
            <Text style={[styles.all]}>{user.username+' '+(user.surname || '')}</Text>
          </View>
          <Pressable onPress={()=>{setExpanded(!expanded)}} style={styles.actionWithUserBtn}>
            <Text style={[styles.all,styles.redColor,styles.actionWithUserBtnText]}>...</Text>
          </Pressable>
        </View>
      {
        expanded &&
        <View style={styles.p_fsm}>
          <Pressable onPress={()=>{nav.navigate('ordersOfUser',{orders:getOrdersByUser()})}}>
            <Text style={[styles.all,styles.redColor,styles.actionWithUserPopupText]}>Заказы</Text>
          </Pressable>
          <Pressable onPress={getProfileByUser}>
            <Text style={[styles.all,styles.redColor,styles.actionWithUserPopupText]}>Профиль</Text>
          </Pressable>
          <Pressable onPress={blockUser}>
            <Text style={[styles.all,styles.redColor,styles.actionWithUserPopupText]}>{user.blocked ? 'Разблокировать' : 'Заблокировать' }</Text>
          </Pressable>
          <Pressable onPress={getMessageByUser}>
            <Text style={[styles.all,styles.redColor]}>Написать</Text>
          </Pressable>
        </View>
      }
    </View>
    )
  }

  let mapStoreToProps = (store) => ({
    allOrders:store.register.allOrders,
    allUsers:store.register.allUsers
  })

  export default connect(mapStoreToProps)(InfoAllUsers)
