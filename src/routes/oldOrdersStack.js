import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import OldOrders from '../screens/OldOrders';
import Edit from '../screens/Edit';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'
import {Order} from '../screens/Order'

const Stack = createStackNavigator()

const OldOrdersStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="oldOrders"
        component={OldOrders}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Готовые заказы"/>,
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

export default OldOrdersStack
