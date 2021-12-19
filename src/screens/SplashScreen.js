import React from 'react';
import {View, Image} from 'react-native';
import {styles,colors} from '../components/Style'
import * as logo from '../../assets/logo.png'


const SplashScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.darkBeige}}>
          <Image source={{uri:logo}} style={{width:'100%',height:30}} resizeMode='contain'/>
        </View>
    );
};

export default SplashScreen;
