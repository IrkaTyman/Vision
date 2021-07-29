import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/Home';
import Edit from '../screens/Edit';
import OldPhoto from '../screens/OldPhoto';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'

const Stack = createStackNavigator()

const HomeStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={Home}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Профиль"/>,
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
      <Stack.Screen
        name="OldPhoto"
        component={OldPhoto}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Готовые фото</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
