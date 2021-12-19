import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Edit from '../screens/Edit';
import Support from '../screens/Support';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'
import {reloadMessage} from '../function/reloadMessage'

const Stack = createStackNavigator()

const SupportStack = (props) => {

  return(
    <Stack.Navigator >
      <Stack.Screen
        name="Support"
        component={Support}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Поддержка"/>,
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

export default SupportStack
