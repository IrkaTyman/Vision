import React,{useState,useEffect} from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator
} from '@react-navigation/drawer';
import {createAppContainer} from 'react-navigation';
import {Text,View,Image} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {connect, useDispatch} from 'react-redux'
import {addPerson,removePerson,addNowOrder,addOldOrders} from '../redux/action'
import {Svg,Path,Circle} from 'react-native-svg'
import firebase from 'firebase'
import {addOrdersIdToUser} from '../function/addOrdersIdToUser'

import {styles,fontSizeMain} from '../components/Style'
import {Home,Cart,Wallet,Support,Question} from '../components/SVG'


const DrawerContentModerator = (props) => {
  const user = props.user
  const dispatch = useDispatch()
  let [state,setState] = useState(0)
  const db= firebase.database().ref('orders')

  const signOut = () => {
    dispatch(addNowOrder({}))
    dispatch(addOldOrders([]))
    dispatch(removePerson('Log out'))
  }

  return(
    <View style={[styles.flex,styles.drawer,styles.p_fsm]}>
    <DrawerContentScrollView>
        <View style={[styles.drawerInfo,styles.fd_r]}>
        <Image
          source={{uri:user.img}}
          style={[styles.drawerInfo_Ava,styles.avaImg]}/>
          <View>
            <Text style={[styles.all,styles.profileInfoTextName,styles.profileInfoText,styles.darkPinkColor]}>{user.username}</Text>
            <Text style={[styles.all,styles.profileInfoText,styles.darkPinkColor]}>{user.status}</Text>
          </View>
        </View>
      <View>
        <DrawerItem
          label='Заказы'
          icon = { () => <Cart width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('AllOrders')}
          labelStyle = {styles.all}
        />

        <DrawerItem
          label='Заказчики'
          icon = { () => <Wallet width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('AllClients')}
          labelStyle = {styles.all}
        />
        <DrawerItem
          label='Исполнители'
          icon = { () => <Support width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('AllDesigners')}
          labelStyle = {styles.all}
        />
        <DrawerItem
          label='Пoддержка'
          icon = { () => <Support width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => {}}
          labelStyle = {styles.all}
        />
        <DrawerItem
          label='Справка'
          icon = { () => <Question width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('Reference')}
          labelStyle = {styles.all}
        />
        <DrawerItem
          label='Выйти'
          icon = {() => <FontAwesome name='sign-out' size={fontSizeMain} color='#D25C5C'/>}
          onPress={signOut}
          labelStyle = {styles.all}
          style = {styles.logOut}
        />
      </View>
      </DrawerContentScrollView>
    </View>
  )
}

let mapStoreToProps = (store) => ({
  user:store.register.user,
})

export default connect(mapStoreToProps)(DrawerContentModerator)
