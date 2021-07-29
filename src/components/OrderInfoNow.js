import React, { Component, useState } from "react";
import { View,Image, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth} from './Style';
import {SliderBA} from '../components/SliderBA'
import Slider from '../components/slider/Slider'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'
import {editPerson} from '../redux/action'

class OrderInfoNow extends Component {
  state = {
    data:this.props.data,
    id:this.props.id,
    height:0
  }
  componentDidMount(){
    Image.getSize(this.state.data.imgBefore,(width,height) =>{
      this.setState({...this.state,height:height*sliderBAWidth/width})
    })
  }
  render(){
    return (
      <View>
        <View style={[styles.orderRow,{borderBottomLeftRadius: 0,borderBottomRightRadius:0,justifyContent:'center'}]}>
          <Text style={[styles.whiteColor, styles.all]}>Заказ №{this.state.id}</Text>
        </View>
        <View style={styles.orderParentHr}/>
        <View style={styles.orderChild}>
          <SliderBA height={this.state.height} photo={[this.state.data.imgBefore,this.state.data.imgAfter]} />
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Создан:</Text> {this.state.data.dateNew}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {this.state.data.dateV}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Статус:<Text style={{color:'green'}}> {this.state.data.status}</Text></Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {this.state.data.questOff.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)}
          </View>
          {this.state.data.questUni[0] ?
            <View style={styles.orderDescriptGroup}>
              <Text style={[styles.all,styles.orderDescript,styles.bold]}>Свои параметры:</Text>
              {this.state.data.questUni.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)}
            </View> : null}
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Стандарт: </Text>{this.state.data.typeOrder == 'standart' ? '20в.': '30в.'}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>{this.props.user.status == 'personal' ? 'Вы заплатили: ' : 'Вы заработали: '} </Text>{this.state.data.typeOrder == 'standart'? '20в' : '30в'}</Text>
          </View>
        </View>
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user
  })

  export default connect(mapStoreToProps)(OrderInfoNow)
