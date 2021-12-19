import React,{useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Button} from '../components/Button'
import {styles,fontSizeMain} from '../components/Style'
import RootDrawerNavigation from '../routes/rootDrawer'
import {Congrat} from '../components/SVG'

 const LogUpPrize = (props) => {

    return (
      props.logUp
      ? <View style={[styles.jc_c,styles.ai_c,styles.container,styles.p_fsm]}>
          <Congrat width={fontSizeMain*5} height={fontSizeMain*5}/>
          <Text style={[styles.redColor,styles.h3,styles.boldest,{marginBottom:fontSizeMain*1.4,marginTop:2*fontSizeMain}]}>Поздравляем с регистрацией!</Text>
          <Text style={[styles.redColor,styles.bold,{marginBottom:fontSizeMain,paddingHorizontal:fontSizeMain*1.5,textAlign:'center'}]}>В честь этого мы дарим вам 60 виженов на ваш первый заказ!</Text>
          <Button title='Получить' onPress={()=>props.setLogUp(false)}/>
        </View>
      : <RootDrawerNavigation/>
    );
};

LogUpPrize.navigationOptions = {
    title: 'LogUpPrize'
};

export default LogUpPrize
