import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import NowOrders from '../screens/NowOrders';
import Header from '../components/Header'
import {Order} from '../screens/Order'
import React from 'react'
import Edit from '../screens/Edit';
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'

const Stack = createStackNavigator()

const NowOrdersStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="nowOrders"
        component={NowOrders}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Текущий заказ"/>,
                    headerStyle:{backgroundColor:'#A57474'},
                    animationEnabled:false}}
        }
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

export default NowOrdersStack
