import React from 'react';
import {Text, View,Image} from 'react-native';
import {Button} from '../components/Button'
import {styles} from '../components/Style'
import AsyncStorage from '@react-native-async-storage/async-storage';

 const BlockUser = (props) => {
   async function goBack(){
       await AsyncStorage.removeItem('@storage_user')
       props.goBack(false)
   }
   //
    return (
      <View style={[styles.container,styles.profileWrapper,styles.flex,styles.fd_c,styles.jc_c,styles.ai_c]}>
        <Image source={require('../../assets/oops.png')} style={styles.blockImg} resizeMode={'contain'}  />
        <Text style={[styles.all,styles.bold,styles.h2,styles.p_fsm,styles.blockText]}>Данный пользователь заблокирован</Text>
        <Button title="Назад" onPress={goBack}/>
      </View>

    );
};

BlockUser.navigationOptions = {
    title: 'BlockUser'
};

export default BlockUser
