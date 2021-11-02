import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/Home';
import Edit from '../screens/Edit';
import OldPhoto from '../screens/OldPhoto';
import GalleryBig from '../screens/GalleryBig';
import GalleryMini from '../screens/GalleryMini';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import {fontSizeMain,styles} from '../components/Style'

const Stack = createStackNavigator()

const HomeStack = (props) => {
  let indexImg = props.indexImgGallery + 1
  let allImg = Object.keys(props.allVisibleImgInGallery).length
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
        name="GalleryMini"
        component={GalleryMini}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Готовые фото</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="GalleryBig"
        component={GalleryBig}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor,{fontSize:fontSizeMain*1.1}]}>{`${indexImg} из ${allImg}`}</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#000',},
                  animationEnabled:false}}
      />
    </Stack.Navigator>
  )
}

let mapStoreToProps = (store) => ({
  indexImgGallery:store.register.indexImgGallery,
  allVisibleImgInGallery:store.register.allVisibleImgInGallery,
})

export default connect(mapStoreToProps)(HomeStack)
