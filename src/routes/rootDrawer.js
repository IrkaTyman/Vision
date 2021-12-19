import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator
} from '@react-navigation/drawer';
import DrawerContent from './drawer'
import DrawerContentModerator from './drawerModerator'

//Stack
import HomeStack from './homeStack'
import NewOrdersStack from './newOrdersStack'
import NowOrdersStack from './nowOrdersStack'
import OldOrdersStack from './oldOrdersStack'
import AllOrdersStack from './allOrdersStack'
import AllDesignersStack from './allDesignersStack'
import AllClientsStack from './allClientsStack'
import BalanceStack from './balanceStack'
import BalanceClientStack from './balanceClientStack'
import ReferenceStack from './referenceStack'
import SupportStack from './supportStack'
import SupportModeratorStack from './supportModeratorStack'

const Drawer = createDrawerNavigator()
const RootDrawerNavigation = (props) => {
  return(
    !props.moderator ?
    <Drawer.Navigator drawerContent={ props =><DrawerContent {...props}/>}>
      <Drawer.Screen name='Home' component={HomeStack}/>
      <Drawer.Screen name='NewOrders' component={NewOrdersStack}/>
      <Drawer.Screen name='NowOrders' component={NowOrdersStack}/>
      <Drawer.Screen name='OldOrders' component={OldOrdersStack}/>
      <Drawer.Screen name='BalanceClient' component={BalanceClientStack}/>
      <Drawer.Screen name='BalanceDesigner' component={BalanceStack}/>
      <Drawer.Screen name='Reference' component={ReferenceStack}/>
      <Drawer.Screen name='Support' component={SupportStack}/>
    </Drawer.Navigator>
    :
    <Drawer.Navigator drawerContent={ props =><DrawerContentModerator {...props}/>}>
      <Drawer.Screen name='AllOrders' component={AllOrdersStack}/>
      <Drawer.Screen name='designer' component={AllDesignersStack}/>
      <Drawer.Screen name='client' component={AllClientsStack}/>
      <Drawer.Screen name='Reference' component={ReferenceStack}/>
      <Drawer.Screen name='SupportModerator' component={SupportModeratorStack}/>
    </Drawer.Navigator>
  )
}

export default RootDrawerNavigation
