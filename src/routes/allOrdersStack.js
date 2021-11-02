import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import AllOrders from '../screens/moderator/AllOrders';
import Edit from '../screens/Edit';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'

const Stack = createStackNavigator()

const AllOrdersStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="allOrders"
        component={AllOrders}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Заказы"/>,
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

export default AllOrdersStack
