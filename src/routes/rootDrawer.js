import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator
} from '@react-navigation/drawer';
import DrawerContent from './drawer'

//Stack
import HomeStack from './homeStack'
import NewOrdersStack from './newOrdersStack'
import NowOrdersStack from './nowOrdersStack'
import OldOrdersStack from './oldOrdersStack'
import BalanceStack from './balanceStack'
import ReferenceStack from './referenceStack'

const Drawer = createDrawerNavigator()
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
