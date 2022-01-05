import React, { Component} from "react";
import { View,Image, TouchableOpacity, Text, Platform,LayoutAnimation,UIManager} from "react-native";
import {Button} from './Button'
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth} from './Style';
import {SliderBA} from '../components/SliderBA'
import {currencySpelling} from '../function/currencySpelling'
import {getNormalDate} from '../function/getNormalDate'
import {localeStatusOrder} from '../function/localeStatusOrder'
import firebase from 'firebase/app'
import 'firebase/database'
import {reloadAllOrders} from '../function/reloadOrders'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'
import {addAllST} from '../redux/action'

class OrderInfoAll extends Component {
  state = {
    expanded:false,
    height:this.props.data.height,
    data:this.props.data,
    id:this.props.id,
    comebackOrders:false
  }

  componentDidMount(){
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({...this.state,expanded:!this.state.expanded})
  }
  toComebackOrders = () => {
    let order = this.state.data
    let users = this.props.allUsers
    if (order.designerUID != ''){
      let ordersDesigner = users[order.designerUID].orders
      let i = ordersDesigner.indexOf(order.id)
      if (ordersDesigner.length == 1) ordersDesigner = []
      else ordersDesigner = ordersDesigner.splice(i,1)
      console.log(ordersDesigner,i)
      users[order.designerUID].orders = ordersDesigner
      this.props.dispatch(addAllST({who:'allUsers',what:users}))
      firebase.database().ref('users/'+order.designerUID+'/orders').set(ordersDesigner)
    }
    order.designerUID = ''
    order.status = 'inWork'
    order.dateComplete = Date.now() + (order.quickly == 5 ? 900000 : 28800000)
    order.amountDesigner = 0
    delete order.dateTake
    delete order.dateCompleteDesigner
    delete order.rating
    delete order.afterImg
    delete order.comment
    this.setState({...this.state,data:order,comebackOrders:false})
    firebase.database().ref('orders/').child(order.id).set(order)
    reloadAllOrders(this.props.dispatch)
  }
  render(){
    return (
      <View>
        <TouchableOpacity
          style={[styles.orderRow,styles.p_fsm,styles.fd_r,
                  styles.ai_c,styles.jc_sb,
                  this.props.typeOrder,
                  {borderBottomLeftRadius:!this.state.expanded ? 10 : 0,borderBottomRightRadius:!this.state.expanded ? 10 : 0}]}
          onPress={()=>this.toggleExpand()}>
          <Text style={[styles.whiteColor, styles.all]}>{this.state.id+'.'}</Text>
          <Text style={[styles.whiteColor, styles.all]}>{localeStatusOrder(this.state.data.status)}</Text>
          <Text style={[styles.whiteColor, styles.all]}>{getNormalDate(this.state.data.dateComplete,true,true)}</Text>
          <AntDesign name={this.state.expanded ? 'up' :  'down'} size={fontSizeMain} color="#fff" />
        </TouchableOpacity>
        <View style={styles.orderParentHr}/>
      {
        this.state.expanded &&
        <View style={styles.orderChild}>
          <SliderBA photo={[this.state.data.beforeImg,this.state.data.afterImg]} height={this.state.height} moderator={true}/>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Создан:</Text> {getNormalDate(this.state.data.dateCreate)}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Взят в работу:</Text> {getNormalDate(this.state.data.dateTake)}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Завершить к:</Text> {getNormalDate(this.state.data.dateComplete)}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Статус:<Text style={{color:'green'}}> {localeStatusOrder(this.state.data.status)}</Text></Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Заказчик:</Text> {this.props.allUsers[this.state.data.clientUID].username}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.bold]}>Дизайнер:</Text> {this.state.data.designerUID ? this.props.allUsers[this.state.data.designerUID].username : '-'}</Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {this.state.data.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)}
          </View>
          <Text style={[styles.all,styles.orderDescript,styles.bold]}>Оценка:</Text>
          <View style={[styles.starsRow,styles.fd_r,styles.ai_c,styles.jc_sb,{marginBottom:fontSizeMain*1.5}]}>
                {[...Array(5)].map((item,id) => {
                  return(
                    <AntDesign key={id} name="star" size={fontSizeMain*1.8} color={this.state.data.rating > id ? "#ffc36d" : '#B8B8B8'} />
                  )}
                )}
          </View>
          {this.state.data.comment
            ? <View>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Комментарий к заказу</Text>
                <Text style={[styles.all,{marginBottom:fontSizeMain*1.5}]}>{this.state.data.comment}</Text>
              </View>
            : null
          }
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Стоимость: </Text>{currencySpelling(this.state.data.amount)}</Text>
          </View>
          {this.state.comebackOrders ?
          <View style={styles.ai_c}>
            <Text style={[styles.all,styles.redColor]}>Отправить заказ в очередь?</Text>
            <View style={[styles.fd_r]}>
              <Button title='Да' style={{margin:fontSizeMain}} onPress={this.toComebackOrders}/>
              <Button title='Нет' style={{margin:fontSizeMain}} onPress={()=>this.setState({...this.state,comebackOrders:false})}/>
            </View>

          </View>
            : <Button title='В очередь' onPress={()=>this.setState({...this.state,comebackOrders:true})}/>}
        </View>
      }
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user,
    allUsers:store.register.allUsers,
    allOrders:store.register.allOrders
  })

  export default connect(mapStoreToProps)(OrderInfoAll)
