import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Edit from '../screens/Edit';
import Support from '../screens/Support';
import SupportModerator from '../screens/moderator/SupportModerator';
import Header from '../components/Header'
import React from 'react'
import {Text,View,Pressable} from 'react-native'
import {AntDesign } from '@expo/vector-icons';
import {connect,useDispatch} from 'react-redux'
import {addAllST} from '../redux/action'
import {fontSizeMain,styles} from '../components/Style'
import firebase from 'firebase/app'
import 'firebase/firestore'

const Stack = createStackNavigator()

const SupportStack = ({messagesAutor,allUsers,resolveIssueModerator}) => {
  const dispatch = useDispatch()
  async function closeIssue(){
      firebase.firestore().collection('messages_tree').doc(messagesAutor+'').update({resolveIssue:true})
      let newResolve = Object.assign({},resolveIssueModerator)
      newResolve[messagesAutor] = true
      dispatch(addAllST({who:'resolveIssueModerator',what:newResolve}))
    }

  return(
    <Stack.Navigator >
      <Stack.Screen
        name="SupportModerator"
        component={SupportModerator}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Поддержка"/>,
                    headerStyle:{backgroundColor:'#A57474'},
                    animationEnabled:false}}
        }
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{headerTitle:props => <View style={[styles.flex,styles.fd_r,styles.jc_sb,styles.ai_c]}>
            <Text style={[styles.all,styles.whiteColor]}>{allUsers[messagesAutor].username}</Text>
            <Pressable style={[styles.jc_c,styles.ai_c,styles.resolveIssue]} onPress={closeIssue}>
              <AntDesign name="check" size={fontSizeMain} color="#fff" />
            </Pressable>
            </View>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Редактировать</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
    </Stack.Navigator>
  )
}

let mapStoreToProps = (store) => ({
  messagesAutor:store.register.messagesAutor,
  allUsers:store.register.allUsers,
  resolveIssueModerator:store.register.resolveIssueModerator
})

export default connect(mapStoreToProps)(SupportStack)
