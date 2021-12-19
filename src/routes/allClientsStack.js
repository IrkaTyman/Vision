import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import AllClientsOrDesigner from '../screens/moderator/AllClientOrDesigner';
import ProfileOfUser from '../screens/moderator/ProfileOfUser';
import GalleryMiniForModerator from '../screens/moderator/GalleryMiniForModerator'
import GalleryBig from '../screens/GalleryBig';
import Support from '../screens/Support'
import Edit from '../screens/Edit';
import Header from '../components/Header'
import React from 'react'
import {Text} from 'react-native'
import {fontSizeMain,styles} from '../components/Style'
import {connect} from 'react-redux'
import OrdersOfUser from '../screens/moderator/OrdersOfUser'

const Stack = createStackNavigator()

const allClientsStack = ({indexImgGallery,allUsers,messagesAutor}) => {
  const indexImg = indexImgGallery +1
  return(
    <Stack.Navigator >
      <Stack.Screen
        name="client"
        component={AllClientsOrDesigner}
        options={(props) =>
          {return {headerTitle: <Header nav={props.navigation} title="Заказчики"/>,
                    headerStyle:{backgroundColor:'#A57474'},
                    animationEnabled:false}}
        }
      />
      <Stack.Screen
        name="ordersOfUser"
        component={OrdersOfUser}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Заказы</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="profileOfUser"
        component={ProfileOfUser}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Профиль</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="galleryMini"
        component={GalleryMiniForModerator}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor]}>Галерея</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="galleryBig"
        component={GalleryBig}
        options={{headerTitle:props => <Text style={[styles.all,styles.whiteColor,{fontSize:fontSizeMain*1.1}]}>{indexImg}</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{headerTitle:props =><Text style={[styles.all,styles.whiteColor]}>{allUsers[messagesAutor].username}</Text>,
                  headerTintColor:'#fff',
                  headerStyle:{backgroundColor:'#A57474',},
                  animationEnabled:false}}
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
let mapStoreToProps = (store) => ({
  indexImgGallery:store.register.indexImgGallery,
  allUsers:store.register.allUsers,
  messagesAutor:store.register.messagesAutor
})

export default connect(mapStoreToProps)(allClientsStack)
