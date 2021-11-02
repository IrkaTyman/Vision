import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import RegistrationWrapper from '../screens/RegistrationWrapper';
import Agreement from '../screens/Agreement';
import React from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import {fontSizeMain,styles} from '../components/Style'

const Stack = createStackNavigator()

const LogupStack = (props) => {
  const propsGlobal = props
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Registration">
        {props => <RegistrationWrapper {...props} extraData={{login:propsGlobal.login,logup:propsGlobal.logup}}/>}
      </Stack.Screen>
      <Stack.Screen
        name="Agreement"
        component={Agreement}
      />
    </Stack.Navigator>
  )
}

export default LogupStack
