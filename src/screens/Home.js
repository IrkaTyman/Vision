import React from 'react';
import {Image, Text, View, ScrollView, Pressable} from 'react-native';
import {Button} from '../components/Button'
import Slider from '../components/slider/Slider'

import {connect,useSelector,useDispatch} from 'react-redux'
import {addPerson} from '../redux/action'
import {styles} from '../components/Style'
import {currencySpelling} from '../function/currencySpelling'

 const Home = ({user,navigation}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.profileBlock}>
          <View style={styles.profileInfoAbout}>
            <Image source = {{uri:user.img}} style={[styles.avaImg,{width:100,height:100}]}/>
            <View style={styles.profileInfoTextView}>
              <Text style={[styles.all,styles.profileInfoTextName,styles.profileInfoText,styles.darkPinkColor]}>{user.username}</Text>
              <Text style={[styles.all,,styles.profileInfoText,styles.darkPinkColor]}>{user.status}</Text>
              <Text style={[styles.all,,styles.profileInfoText,styles.darkPinkColor]}>Баланс:
                <Text style={styles.bold}> {user.balance} </Text>
                {currencySpelling(user.balance.toString())}
              </Text>
            </View>
          </View>
          <Button title='Редактировать' onPress={() => navigation.navigate('Edit')}/>
        </View>
        <Pressable style={styles.profileBlock} onPress={()=>{navigation.navigate('OldPhoto')}}>
          <Text style={[styles.all,styles.h3]}>Готовые фото <Text style={styles.darkPinkColor}>10</Text></Text>
          <Slider/>
        </Pressable>
      </ScrollView>
    );
};

Home.navigationOptions = {
    title: 'Home'
};

let mapStoreToProps = (store) => ({
  user:store.register.user
})

export default connect(mapStoreToProps)(Home)
