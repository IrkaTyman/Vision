import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Edit from '../screens/Edit';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'
import Reference from '../screens/Reference'
import HowToDoOrder from '../screens/reference/HowToDoOrder'
import HowToPayOrder from '../screens/reference/HowToPayOrder'
import HowToBeginEarn from '../screens/reference/HowToBeginEarn'
import HowToWorkPanel from '../screens/reference/HowToWorkPanel'
import HowToWithdrawMoney from '../screens/reference/HowToWithdrawMoney'
import HowToWorkMistake from '../screens/reference/HowToWorkMistake'
import NewOrders from '../screens/NewOrders';

const Stack = createStackNavigator()

const ReferenceStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="Reference"
        component={Reference}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Справка"/>,
                    headerStyle:{backgroundColor:'#A57474'},
                    animationEnabled:false}}
        }
      />
      <Stack.Screen
        name="HowToDoOrder"
        component={HowToDoOrder}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Как сделать заказ</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="HowToPayOrder"
        component={HowToPayOrder}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Как оплатить заказ</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="HowToBeginEarn"
        component={HowToBeginEarn}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Как начать зарабатывать</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="HowToWorkPanel"
        component={HowToWorkPanel}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Работа с панелью заказов</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="HowToWithdrawMoney"
        component={HowToWithdrawMoney}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Как вывести деньги</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="HowToWorkMistake"
        component={HowToWorkMistake}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Как работать с браком</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="NewOrder"
        component={NewOrders}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Новый заказ"/>,
                    headerStyle:{backgroundColor:'#A57474'},
                    headerBackVisible:false,
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

export default ReferenceStack
