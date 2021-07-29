import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator
} from '@react-navigation/drawer';
import {createAppContainer} from 'react-navigation';
import {Text,View,Image} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {connect,useSelector} from 'react-redux'
import {Svg,Path,Circle} from 'react-native-svg'

//Stack
import HomeStack from './homeStack'
import NewOrdersStack from './newOrdersStack'
import NowOrdersStack from './nowOrdersStack'
import OldOrdersStack from './oldOrdersStack'
import BalanceStack from './balanceStack'
import ReferenceStack from './referenceStack'

import {styles,fontSizeMain} from '../components/Style'
import {Home,Cart,Wallet,Support,Question} from '../components/SVG'

const Drawer = createDrawerNavigator()

const DrawerContent = (props) => {
  const user = useSelector(store => store.register.user)
  return(
    <View style={styles.drawer}>
    <DrawerContentScrollView>
        <View style={styles.drawerInfo}>
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
          label='Профиль'
          icon = { () => <Home width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('Home')}
          labelStyle = {styles.all}
        />
        <View style={styles.drawerOrdersWrapper}>
          <View style={{flexDirection:'row'}}>
            <Cart width={fontSizeMain} height={fontSizeMain}/>
            <Text style={[styles.all,{marginLeft:fontSizeMain*2}]}>Заказы</Text>
          </View>
          {user.status == 'designer' ?
              <DrawerItem
                label='+ Новый заказ'
                onPress={() => props.navigation.navigate('NewOrders')}
                labelStyle = {[styles.all,styles.drawerOrdersItem]}
              /> : null}

          <DrawerItem
            label='Текущие'
            onPress={() => props.navigation.navigate('NowOrders')}
            labelStyle = {[styles.all,styles.drawerOrdersItem]}
          />
          <DrawerItem
            label='Готовые'
            onPress={() => props.navigation.navigate('OldOrders')}
            labelStyle = {[styles.all,styles.drawerOrdersItem]}
          />
        </View>

        <DrawerItem
          label='Баланс'
          icon = { () => <Wallet width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('BalanceDesigner')}
          labelStyle = {styles.all}
        />
        <DrawerItem
          label='Поддержка'
          icon = { () => <Support width={fontSizeMain} height={fontSizeMain}/>}
          onPress={() => props.navigation.navigate('Home')}
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
          onPress={() => props.navigation.navigate('Edit0')}
          labelStyle = {styles.all}
          style = {styles.logOut}
        />

      </View>
      </DrawerContentScrollView>
    </View>
  )
}

export const RootDrawerNavigation = (props) => {
  return(
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen name='Home' component={HomeStack}/>
      <Drawer.Screen name='NewOrders' component={NewOrdersStack}/>
      <Drawer.Screen name='NowOrders' component={NowOrdersStack}/>
      <Drawer.Screen name='OldOrders' component={OldOrdersStack}/>
      <Drawer.Screen name='BalanceDesigner' component={BalanceStack}/>
      <Drawer.Screen name='Reference' component={ReferenceStack}/>
    </Drawer.Navigator>
  )
}
