import React,{useState,useEffect} from 'react';
import { Text, View, Pressable,FlatList,Keyboard} from 'react-native';
import {Button} from '../components/Button'
import {FormInput} from '../components/FormInput'
import {sortByDateArr} from '../function/sortFunction'
import {reloadMessage} from '../function/reloadMessage'
import Message from '../components/Message'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain} from '../components/Style'
import {addAllST} from '../redux/action'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app'
import 'firebase/firestore'

 const Support = ({user,messages,route,allMessages,resolveIssueModerator}) => {
   const [input,setInput] = useState('')
   const dispatch = useDispatch()
   const uid = route.params ?  route.params.userUID : user.uid
   const db=firebase.firestore().collection('messages_tree')
   async function sendMessage(){
     Keyboard.dismiss()
     setInput('')
     let text = input.trim()
     if(text !== ''){
       let newMessage = {userUID:uid,status:user.status,text:text,timestamp:firebase.firestore.FieldValue.serverTimestamp(),readUser:!user.status == 'moderator'}
       await firebase.firestore().collection('messages_tree').doc(uid+'').collection('messages').add(newMessage)
        firebase.firestore().collection('messages_tree').doc(uid+'').collection('messages').orderBy('timestamp').get().then(param=>{
         let messages = []
         param.forEach((doc) => {
           messages.push(doc.data())
         });
         if(user.status === 'moderator'){
           let newAllMessages = allMessages
           newAllMessages[uid] = messages
           dispatch(addAllST({who:'allMessages',what:newAllMessages}))
         }
        dispatch(addAllST({who:'messages',what:messages}))
        firebase.firestore().collection('messages_tree').doc(uid+'').set({readUserMessage:!(user.status == 'moderator'),resolveIssue:false})
        dispatch(addAllST({who:'readUserMessage',what:!(user.status == 'moderator')}))
       })
  }}

    return (
      <View style={[styles.container,styles.profileWrapper]} keyboardShouldPersistTaps='never'>
      <Pressable style={[styles.reloadMessage,styles.jc_c,styles.ai_c]} onPress={() => reloadMessage(user,uid,allMessages,dispatch,resolveIssueModerator)}>
        <AntDesign name="reload1" size={fontSizeMain} color="#fff" />
      </Pressable>
      <FlatList
      style={[styles.supportMain,styles.p_fsm,{ marginTop:3.5*fontSizeMain,}]}
        data={messages}
        renderItem={({item,index}) => (
          <Message data={item} count={messages.length} index={index}/>
        )}
        keyExtractor={(item,index) => index.toString()}
        />

        <View style={[styles.p_fsm,styles.supportFooter]}>
          <FormInput
            options={{
                 placeholder:'Сообщение',
                 onChangeText:(text)=>{setInput(text)},
                 value:input
              }}
             styleInput = {[styles.all,styles.input,{marginBottom:0}]}
           />
           <Pressable style={[styles.supportIconBtn,styles.jc_c,]} onPress={sendMessage}>
             <FontAwesome name="send" size={fontSizeMain} color="#fff" style={[styles.supportIcon]} />
           </Pressable>
        </View>
      </View>
    );
};

Support.navigationOptions = {
    title: 'Support'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  messages:store.register.messages,
  resolveIssueModerator:store.register.resolveIssueModerator,
  allMessages:store.register.allMessages
})

export default connect(mapStoreToProps)(Support)
