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

const Drawer = createDrawerNavigator()
export const RootDrawerNavigation = (props) => {
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
    </Drawer.Navigator>
    :
    <Drawer.Navigator drawerContent={ props =><DrawerContentModerator {...props}/>}>
      <Drawer.Screen name='AllOrders' component={AllOrdersStack}/>
      <Drawer.Screen name='AllDesigners' component={AllDesignersStack}/>
      <Drawer.Screen name='AllClients' component={AllClientsStack}/>
      <Drawer.Screen name='Reference' component={ReferenceStack}/>
    </Drawer.Navigator>
  )
}
