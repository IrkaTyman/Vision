import React from 'react';
import {View, Image} from 'react-native';
import {styles,colors} from '../components/Style'


const SplashScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.lightPink}}>
          <Image source={require('../../assets/Logo.png')} style={{width:'100%',height:30}} resizeMode='contain'/>
        </View>
    );
};

export default SplashScreen;
