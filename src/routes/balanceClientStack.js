import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Edit from '../screens/Edit';
import BalanceDesigner from '../screens/balance/BalanceDesigner';
import BalanceClient from '../screens/balance/BalanceClient';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'

const Stack = createStackNavigator()

const BalanceClientStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="BalanceClient"
        component={BalanceClient}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Баланс"/>,
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

export default BalanceClientStack
