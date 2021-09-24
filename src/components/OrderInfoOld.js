import React, { Component} from "react";
import { View,Image, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth} from './Style';
import {SliderBA} from '../components/SliderBA'
import {currencySpelling} from '../function/currencySpelling'
import {localeStatusOrder} from '../function/localeStatusOrder'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'
import {editPerson} from '../redux/action'

class OrderInfoOld extends Component {
  state = {
    expanded:false,
    height:this.props.data.height,
    data:this.props.data,
    id:this.props.id,
  }

  componentDidMount(){
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    ///Image.getSize(this.state.data.beforeImg,(width,height) =>{
    //  this.setState({...this.state,height:height*sliderBAWidth/width})
    //})
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
          <Text style={[styles.whiteColor, styles.all]}>{(new Date(this.state.data.dateCreate)).toLocaleString()}</Text>
          <AntDesign name={this.state.expanded ? 'up' :  'down'} size={fontSizeMain} color="#fff" />
        </TouchableOpacity>
        <View style={styles.orderParentHr}/>
      {
        this.state.expanded &&
        <View style={styles.orderChild}>
          <SliderBA photo={[this.state.data.beforeImg,this.state.data.afterImg]} height={this.state.height}/>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Взят в работу:</Text> {(new Date(this.state.data.dateTake)).toLocaleString()}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Завершен:</Text> {(new Date(this.state.data.dateComplete)).toLocaleString()}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Статус:<Text style={{color:'green'}}> {localeStatusOrder(this.state.data.status)}</Text></Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {this.state.data.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)}
          </View>
          <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваша оценка:</Text>
          <View style={[styles.flexRow,{marginBottom:fontSizeMain*1.5}]}>
                {[...Array(5)].map((item,id) => {
                  return(
                    <AntDesign key={id} name="star" size={fontSizeMain*1.8} color={this.state.data.rating > id ? "#ffc36d" : '#B8B8B8'} />
                  )}
                )}
          </View>
          {this.state.data.comment != ''
            ? <View>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Комментарий к заказу</Text>
                <Text style={[styles.all,{marginBottom:fontSizeMain*1.5}]}>{this.state.data.comment}</Text>
              </View>
            : null
          }
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>{this.props.user.status == 'client' ? 'Вы заплатили: ' : 'Вы заработали: '} </Text>{currencySpelling(this.state.data.amount)}</Text>
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
