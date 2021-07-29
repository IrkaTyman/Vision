import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import NewOrders from '../screens/NewOrders';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'
import Edit from '../screens/Edit';

const Stack = createStackNavigator()

const NewOrdersStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="newOrders"
        component={NewOrders}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Новый заказ"/>,
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

export default NewOrdersStack
