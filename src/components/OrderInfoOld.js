import React, { Component} from "react";
import { View,Image, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth} from './Style';
import {SliderBA} from '../components/SliderBA'
import Slider from '../components/slider/Slider'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'
import {editPerson} from '../redux/action'

class OrderInfoOld extends Component {
  state = {
    expanded:false,
    height:0,
    data:this.props.data,
    id:this.props.id
  }

  componentDidMount(){
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    Image.getSize(this.state.data.imgBefore,(width,height) =>{
      this.setState({...this.state,height:height*sliderBAWidth/width})
    })
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({...this.state,expanded:!this.state.expanded})
  }

  render(){
    return (
      <View>
        <TouchableOpacity style={[styles.orderRow,{borderBottomLeftRadius:!this.state.expanded ? 10 : 0,borderBottomRightRadius:!this.state.expanded ? 10 : 0}]} onPress={()=>this.toggleExpand()}>
          <Text style={[styles.whiteColor, styles.all]}>{this.state.id+1+'.'}</Text>
          <Text style={[styles.whiteColor, styles.all]}>{this.state.data.typeOrder}</Text>
          <Text style={[styles.whiteColor, styles.all]}>{this.state.data.dateNew}</Text>
          <AntDesign name={this.state.expanded ? 'up' :  'down'} size={fontSizeMain} color="#fff" />
        </TouchableOpacity>
        <View style={styles.orderParentHr}/>
      {
        this.state.expanded &&
        <View style={styles.orderChild}>
          <SliderBA photo={[this.state.data.imgBefore,this.state.data.imgAfter]} height={this.state.height}/>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Создан:</Text> {this.state.data.dateNew}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Взят в работу:</Text> {this.state.data.dateV}</Text>
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
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Стандарт: </Text>{this.state.data.typeOrder == 'standart' ? '20в.': '30в.'}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>{this.props.user.status == 'personal' ? 'Вы заплатили: ' : 'Вы заработали: '} </Text>{this.state.data.typeOrder == 'standart'? '20в' : '30в'}</Text>
          </View>
        </View>
      }
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user
  })

  export default connect(mapStoreToProps)(OrderInfoOld)
