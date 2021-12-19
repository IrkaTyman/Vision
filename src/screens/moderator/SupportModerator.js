import React,{useState} from 'react';
import { Text, View, Pressable,FlatList,Keyboard} from 'react-native';
import MessageWithUser from '../../components/MessageWithUser'
import {Button} from '../../components/Button'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain} from '../../components/Style'
import {addAllST} from '../../redux/action'
import firebase from 'firebase/app'
import 'firebase/database'

 const SupportModerator = ({user,allMessages,allUsers,navigation,resolveIssueModerator}) => {
   const dispatch = useDispatch()
    return (
      <View style={[styles.container,styles.profileWrapper]} keyboardShouldPersistTaps='never'>
        <FlatList
        style={[styles.supportMain,styles.p_fsm]}
          data={Object.keys(allMessages)}
          renderItem={({item,index}) => (
            <MessageWithUser resolveIssue={resolveIssueModerator[item]} nav={navigation} user={allUsers[item]}/>
          )}
          keyExtractor={(item,index) => index.toString()}
          />
      </View>
    );
};

SupportModerator.navigationOptions = {
    title: 'SupportModerator'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  allUsers:store.register.allUsers,
  allMessages:store.register.allMessages,
  resolveIssueModerator:store.register.resolveIssueModerator
})

export default connect(mapStoreToProps)(SupportModerator)
