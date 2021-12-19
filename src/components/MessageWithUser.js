import React from "react";
import { View,Image,Text,Pressable} from "react-native";
import {styles,fontSizeMain,colors} from './Style';
import { AntDesign } from '@expo/vector-icons';
import {useDispatch,connect} from 'react-redux'
import {addAllST} from '../redux/action'

const MessageWithUser = ({allMessages,user,nav,resolveIssue,allUsers}) => {
  const dispatch = useDispatch()
    function seeMessagesWithUser(){
      dispatch(addAllST({who:'messages',what:allMessages[user.uid]}))
      dispatch(addAllST({who:'messagesAutor',what:user.uid}))
      nav.navigate('Support',{userUID:user.uid})
    }
    return (
      <Pressable style={[styles.profileBlock,styles.fd_r,styles.jc_sb,styles.p_fsm,styles.ai_c]} onPress={seeMessagesWithUser}>
          <View style={[styles.fd_r,styles.ai_c,{position:'relative'}]}>
            <View style={resolveIssue ? {} : [styles.activeMessageDot,styles.activeMessageDotWithUser]}></View>
            <Image source={{uri:user.img}} style={[styles.headerAvaImg,styles.avaImg,styles.actionWithUserAva]}/>
            <Text style={[styles.all]}>{user.username+' '+(user.surname || '')}</Text>
          </View>
          <AntDesign name="right" size={fontSizeMain} color={colors.red} />
      </Pressable>
    )
  }

  let mapStoreToProps = (store) => ({
    allMessages:store.register.allMessages,
    allUsers:store.register.allUsers
  })

  export default connect(mapStoreToProps)(MessageWithUser)
