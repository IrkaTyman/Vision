import React from 'react';
import {Text, View,Image,Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import {connect} from 'react-redux'
import {styles} from './Style'
import firebase from 'firebase/app'
import 'firebase/firestore'

const Message = (props) => {
  //const data = props.data.timestamp.toDate()
  const name = props.data.status == 'moderator' ? 'Модератор' : props.allUsers[props.data.userUID]?.username || props.user.username
  const openMenu = () => {
    props.nav.openDrawer();
  }
  const returnRightDate = (num) => {
    return num.length == 1 ? '0'+num : num
  }
  //<Text style={[styles.all,styles.messageData,whoAutor ? {color:'#fff'} : '',{flexShirink:1}]}>{returnRightDate(data.getHours()+'') + ':' + returnRightDate(data.getMinutes()+'')}</Text>
  const whoAutor = props.data.status === props.user.status
  return(
    <View style = {[styles.messageWrap, !whoAutor ? styles.leftMessage : styles.rightMessage,props.count == props.index+1 ? styles.lastMessage : '']}>
      <View style={[styles.flex, styles.jc_sb,styles.fd_r,styles.ai_c]}>
        <Text style={[styles.all,styles.bold,styles.messageName, whoAutor ? {color:'#fff'} : '']}>{name}</Text>

      </View>
      <Text style={[styles.all,styles.messageText,whoAutor ? {color:'#fff'} : '']}>{props.data.text}</Text>
    </View>
  )
}

let mapStoreToProps = (store) => ({
  user:store.register.user,
  allUsers:store.register.allUsers
})

export default connect(mapStoreToProps)(Message)
