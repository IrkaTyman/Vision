import React, { Component, useState } from "react";
import { View,Image, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth} from './Style';
import {SliderBA} from '../components/SliderBA'
import Slider from '../components/slider/Slider'
import {currencySpelling} from '../function/currencySpelling'
import {Button} from './Button'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'
import {editPerson} from '../redux/action'

class OrderInfoNow extends Component {
  state = {
    data:this.props.data,
    id:this.props.id,
    height:this.props.data.height,
    dateComplete:new Date(this.props.data.dateComplete),
    amount:currencySpelling(this.props.data.amount)
  }
  render(){
    return (
      <View>
        <View style={[styles.orderRow,{borderBottomLeftRadius: 0,borderBottomRightRadius:0,justifyContent:'center'}]}>
          <Text style={[styles.whiteColor, styles.all]}>Заказ №{this.state.data.id}</Text>
        </View>
        <View style={styles.orderParentHr}/>
        <View style={styles.orderChild}>
          <SliderBA height={this.state.height} photo={[this.state.data.beforeImg,this.state.data.afterImg]} userStatus={this.props.user.status} userId={this.state.id}/>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Создан:</Text> {this.state.dateComplete.toLocaleString()}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {this.state.dateTake ? this.state.dateTake.toLocaleString() : '-'}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Статус:<Text style={{color:'green'}}> {this.state.data.status}</Text></Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {this.state.data.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)}
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>{this.props.user.status == 'client' ? 'Вы заплатили: ' : 'Вы заработаете: '} </Text>{this.props.user.status == 'client'? this.state.amount : '20 виженов'}</Text>
          </View>
        </View>
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user
  })

  export default connect(mapStoreToProps)(OrderInfoNow)
