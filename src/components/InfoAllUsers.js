import React, { Component} from "react";
import { View,Image,Text,FlatList} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth} from './Style';
import {SliderBA} from '../components/SliderBA'
import {currencySpelling} from '../function/currencySpelling'
import {getNormalDate} from '../function/getNormalDate'
import {localeStatusOrder} from '../function/localeStatusOrder'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

const InfoAllUsers = ({data}) => {
    return (
        <View style={[styles.fd_r,styles.jc_sb,styles.p_fsm,styles.profileBlock,styles.ai_c]}>
          <Image source={{uri:data.img}} style={[styles.headerAvaImg,styles.avaImg]}/>
          <Text style={[styles.all]}>{data.username+' '+(data.surname || '')}</Text>
        </View>
    )
  }

  let mapStoreToProps = (store) => ({
    user:store.register.user
  })

  export default connect(mapStoreToProps)(InfoAllUsers)
