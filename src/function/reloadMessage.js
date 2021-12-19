import firebase from 'firebase/app'
import 'firebase/firestore'
import {useDispatch} from 'react-redux'
import {addAllST} from '../redux/action'

export async function reloadMessage(user,uid,allMessages,dispatch,resolveIssueModerator,messagesAutor=false){
    firebase.firestore().collection('messages_tree').doc(uid+'').collection('messages').orderBy('timestamp').get().then(param=>{
     let messagesUser = []
     param.forEach((doc) => {
       messagesUser.push(doc.data())
     });
     if(user.status == 'moderator'){
       if(!allMessages[uid] || messagesUser.length != allMessages[uid].length){
         let newArrMessages = Object.assign({},allMessages)
         newArrMessages[uid] = messagesUser
         let newResolve = resolveIssueModerator
         newResolve[uid] = false
         dispatch(addAllST({who:'allMessages',what:newArrMessages}))
         dispatch(addAllST({who:'resolveIssueModerator',what:newResolve}))
       }
       if( messagesAutor == uid || !messagesAutor) {
         dispatch(addAllST({who:'messages',what:messagesUser}))
       }
     } else {
       firebase.firestore().collection('messages_tree').doc(uid+'').get().then(doc=>[
         dispatch(addAllST({who:'readUserMessage',what:doc.data().readUserMessage}))
       ])
       dispatch(addAllST({who:'messages',what:messagesUser}))
     }

  })}
