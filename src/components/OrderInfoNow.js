import React, { Component, useState } from "react";
import { View,Image,Text} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors} from './Style';
import {SliderBA} from '../components/SliderBA'
import {currencySpelling} from '../function/currencySpelling'
import {Button} from './Button'
import firebase from 'firebase'
import store from '../redux/store'
import {addNowOrder,addOldOrders} from '../redux/action'
import {FormInput} from './FormInput'
import {localeStatusOrder} from '../function/localeStatusOrder'
//REDUX
import {connect} from 'react-redux'

class OrderInfoNow extends Component {
  state = {
    status:this.props.data.status,
    data:this.props.data,
    id:this.props.id,
    height:this.props.data.height,
    dateTake:this.props.data.dateTake ? new Date(this.props.data.dateTake) : '',
    dateCreate:new Date(this.props.data.dateCreate),
    amount:this.props.data.amount ? currencySpelling(this.props.data.amount): null,
    noCompleteOrders:false,
    comment:'',
    noCompulsoryCommets:false,
  }
  setImageHandler = async (result) => {
    if(!result.cancelled) {
      let data = this.state.data
      data.afterImg= result.uri
      this.setState({...this.state, data:data})
    }
  }
  deleteImageHandler = () => {
    let data = this.state.data
    data.afterImg= ''
    this.setState({...this.state, data:data})
  }

  completeOrders = async () => {
    if(this.state.data.afterImg){
      const databaseOrders = firebase.database().ref('orders')
      let order = this.state.data
      let uploadImg = await this.uploadImageAsync(order.afterImg,order.id-1)
      order.afterImg = uploadImg
      order.status='inRating'
      store.dispatch(addNowOrder(order))
      databaseOrders.child(order.id-1).set(order)
      this.setState({...this.state,noCompleteOrder:false})
    } else this.setState({...this.state,noCompleteOrders:true})
  }

  uploadImageAsync = async (image,id) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref(`/orders/${id}/${id}-1.jpg`);
    const snapshot = await ref.put(blob,{contentType:'image/jpeg'});
    return await snapshot.ref.getDownloadURL();
  }

  setRatingBeforeAgree = (stars) => {
    let data = this.state.data
    data.rating = stars
    this.setState({...this.state, data:data, noCompleteOrders:false,noCompulsoryCommets:false})
  }

  setRatingAgree = () => {
    let order=this.state.data
    if(order.rating){
      if(order.rating < 4 && this.state.comment != '' || order.rating > 3){
        const databaseOrders = firebase.database().ref('orders')
        const oldOrders = this.props.oldOrders || []
        order.comment = this.state.comment
        order.status='inComplete'
        oldOrders.push(order)
        store.dispatch(addOldOrders(oldOrders))
        store.dispatch(addNowOrder({}))
        databaseOrders.child(order.id-1).set(order)
        this.setState({...this.state,
            noCompulsoryCommets:false})
        this.props.setOrder(1)
      } else this.setState({...this.state, noCompulsoryCommets:true})
    } else this.setState({...this.state, noCompleteOrders:true})
  }
  render(){
    return (
      <View>
        <View style={[styles.orderRow,{borderBottomLeftRadius: 0,borderBottomRightRadius:0,justifyContent:'center'}]}>
          <Text style={[styles.whiteColor, styles.all]}>Заказ №{this.state.data.id}</Text>
        </View>
        <View style={styles.orderParentHr}/>
        <View style={styles.orderChild}>
        {this.state.noCompleteOrders && this.props.user.status == 'designer'
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Для завершения работы нужно приложить готовое фото
            </Text>
          : null}
          <SliderBA
            handlerDelete={this.deleteImageHandler}
            handler={this.setImageHandler}
            height={this.state.height}
            photo={[this.state.data.beforeImg,this.state.data.afterImg]}
            userStatus={this.props.user.status}
            userId={this.state.id}
            orderStatus={this.state.data.status}/>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Создан:</Text> {this.state.dateCreate.toLocaleString()}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {this.state.dateTake ? this.state.dateTake.toLocaleString() : '-'}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Статус:<Text style={{color:'green'}}> {localeStatusOrder(this.state.data.status)}</Text></Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {this.state.data.param ?
              this.state.data.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)
              : null}
          </View>
          {this.state.data.status == 'inRating'
            ? <View>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваша оценка:</Text>
                <View style={[styles.flexRow,{marginBottom:fontSizeMain*1.5}]}>
                  {[...Array(5)].map((item,id) => {
                      if(this.props.user.status == 'client'){
                        return(
                          <Pressable key={id} onPress={() => this.setRatingBeforeAgree(id+1)}>
                              <AntDesign name="star" size={fontSizeMain*1.8} color={this.state.data.rating > id ? "#ffc36d" : '#B8B8B8'} />
                          </Pressable>)
                      } else {
                        return(
                          <AntDesign name="star" key={id} size={fontSizeMain*1.8} color={this.state.data.rating > id ? "#ffc36d" : '#B8B8B8'} />
                          )
                      }
                    })}
                </View>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваш комментарий</Text>
                {this.props.user.status=='client'
                  ? <FormInput
                    options={{
                         placeholder:'Комментарий',
                         onChangeText:(text) => this.setState({...this.state,comment:text})
                      }}
                     styleInput = {[styles.all,styles.input]}
                   />
                  : null
                }
              </View>

            : null
          }
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>{this.props.user.status == 'client' ? 'Вы заплатили: ' : 'Вы заработаете: '} </Text>{this.props.user.status == 'client'? this.state.amount : '20 виженов'}</Text>
          </View>
          {this.state.noCompleteOrders && this.props.user.status == 'client'
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                Необходимо поставить оценку от одного до пяти
              </Text>
            : null}
          {this.state.noCompulsoryCommets
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                При оценке ниже 4 нужно написать, что не так, чтобы мы могли подобрать вам другого мастера
              </Text>
            : null}
          {this.props.user.status == 'designer'
            ? this.state.data.status == 'inWork'
              ? <Button title='Отправить' onPress={this.completeOrders}/>
              : <View style={styles.statusRatingBlock}>
                  <Text style={[styles.whiteColor,styles.all]}>На оценке</Text>
                </View>
            : this.state.data.status == 'inRating'
              ? <Button title='Оценить' onPress={()=>this.setRatingAgree()}/>
              : null}
        </View>
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user,
    oldOrders:store.register.oldOrders
  })

  export default connect(mapStoreToProps)(OrderInfoNow)
