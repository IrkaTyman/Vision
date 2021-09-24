import React, { Component, useState,useEffect } from "react";
import { View,Image,ScrollView, TouchableOpacity, Pressable,Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors} from '../components/Style';
import {SliderBA} from '../components/SliderBA'
import Slider from '../components/slider/Slider'
import {currencySpelling} from '../function/currencySpelling'
import {Button} from '../components/Button'
import firebase from 'firebase'
import store from '../redux/store'
import {addNowOrder,addOldOrders} from '../redux/action'
import {FormInput} from '../components/FormInput'
import {localeStatusOrder} from '../function/localeStatusOrder'
//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

const NowOrders = (props) => {
  let [rating,setRating] = useState(0)
  let [noCompleteOrder,setNoCompleteOrder] = useState(false)
  let [noCompulsoryCommets,setNoCompulsoryCommets] = useState(false)
  let [comment,setComment] = useState('')
  let [afterImg,setAfterImg] = useState('')
  let dispatch = useDispatch()

  useEffect(() => {
    let statusOrderRef = firebase.database().ref('orders/' + (props.nowOrder.id-1));
    statusOrderRef.on('value', (snapshot) => {
      let data = snapshot.val()
      let status = props.nowOrder.status || ''
      if (data){
        if(data.status != props.nowOrder.status){
          console.log(data.status,'status')
          if(data.status == 'inComplete'){
            dispatch(addNowOrder({}))
            let oldOrders = props.oldOrders
            oldOrders.push(data)
            dispatch(addOldOrders(oldOrders))
          } else dispatch(addNowOrder(data))

      }}
   })},[]
 )

  const setImageHandler = async (result) => {
    if(!result.cancelled) {
      setAfterImg(result.uri)
    }
  }
  const deleteImageHandler = () => {
    setAfterImg('')
  }
  const completeOrders = async () => {
    if(afterImg){
      const databaseOrders = firebase.database().ref('orders')
      let order = props.nowOrder
      let uploadImg = await uploadImageAsync(afterImg,order.id-1)
      order.afterImg = uploadImg
      order.status='inRating'
      dispatch(addNowOrder(order))
      databaseOrders.child(order.id-1).set(order)
      setNoCompleteOrder(false)
      setAfterImg('')
    } else setNoCompleteOrder(true)
  }

  const uploadImageAsync = async (image,id) => {
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

  const setRatingBeforeAgree = (stars) => {
    setRating(stars)
    setNoCompleteOrder(false)
    setNoCompulsoryCommets(false)
  }

  const setRatingAgree = () => {
    let order = props.nowOrder
    if(rating){
      if(rating < 4 && comment != '' || rating > 3){
        const databaseOrders = firebase.database().ref('orders')
        const oldOrders = props.oldOrders || []
        order.comment = comment
        order.rating=rating
        order.status='inComplete'
        oldOrders.push(order)
        dispatch(addNowOrder({}))
        dispatch(addOldOrders(oldOrders))
        databaseOrders.child(order.id-1).set(order)
        setNoCompulsoryCommets(false)
        setRating(0)
      } else setNoCompulsoryCommets(true)
    } else setNoCompleteOrder(true)
  }
  return (
      <ScrollView style={styles.container}>
      {!props.nowOrder.client ?
        <View style={styles.notOrder}>
          <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
            Пока здесь ничего нет
          </Text>
        </View>
      :
      <View style={styles.ordersBlock}>
        <View style={[styles.orderRow,{borderBottomLeftRadius: 0,borderBottomRightRadius:0,justifyContent:'center'}]}>
          <Text style={[styles.whiteColor, styles.all]}>Заказ №{props.nowOrder.id}</Text>
        </View>
        <View style={styles.orderParentHr}/>
        <View style={styles.orderChild}>
        {noCompleteOrder && props.user.status == 'designer'
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Для завершения работы нужно приложить готовое фото
            </Text>
          : null}
          <SliderBA
            handlerDelete={deleteImageHandler}
            handler={setImageHandler}
            height={props.nowOrder.height}
            photo={[props.nowOrder.beforeImg,props.nowOrder.afterImg||afterImg]}
            userStatus={props.user.status}
            userId={props.nowOrder.id}
            orderStatus={props.nowOrder.status}/>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Создан:</Text> {(new Date(props.nowOrder.dateCreate)).toLocaleString()}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {props.nowOrder.dateTake ? (new Date(props.nowOrder.dateTake)).toLocaleString() : '-'}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Статус:<Text style={{color:'green'}}> {localeStatusOrder(props.nowOrder.status)}</Text></Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {props.nowOrder.param ?
              props.nowOrder.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)
              : null}
          </View>
          {props.nowOrder.status == 'inRating'
            ? <View>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваша оценка:</Text>
                <View style={[styles.flexRow,{marginBottom:fontSizeMain*1.5}]}>
                  {[...Array(5)].map((item,id) => {
                      if(props.user.status == 'client'){
                        return(
                          <Pressable key={id} onPress={() => setRatingBeforeAgree(id+1)}>
                              <AntDesign name="star" size={fontSizeMain*1.8} color={props.nowOrder.rating > id || rating > id ? "#ffc36d" : '#B8B8B8'} />
                          </Pressable>)
                      } else {
                        return(
                          <AntDesign name="star" key={id} size={fontSizeMain*1.8} color={props.nowOrder.rating > id || rating > id ? "#ffc36d" : '#B8B8B8'} />
                          )
                      }
                    })}
                </View>

                {props.user.status=='client'
                  ? <View>
                      <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваш комментарий</Text>
                      <FormInput
                        options={{
                             placeholder:'Комментарий',
                             onChangeText:(text)=>{setComment(text)}
                          }}
                         styleInput = {[styles.all,styles.input]}
                       />
                    </View>
                  : null}
              </View>
            : null
          }
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>{props.user.status == 'client' ? 'Вы заплатили: ' : 'Вы заработаете: '} </Text>{props.user.status == 'client'? currencySpelling(props.nowOrder.amount) : '20 виженов'}</Text>
          </View>
          {noCompleteOrder && props.user.status == 'client'
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                Необходимо поставить оценку от одного до пяти
              </Text>
            : null}
          {noCompulsoryCommets
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                При оценке ниже 4 нужно написать, что не так, чтобы мы могли подобрать вам другого мастера
              </Text>
            : null}
          {props.user.status == 'designer'
            ? props.nowOrder.status == 'inWork'
              ? <Button title='Отправить' onPress={completeOrders}/>
              : <View style={styles.statusRatingBlock}>
                  <Text style={[styles.whiteColor,styles.all]}>На оценке</Text>
                </View>
            : props.nowOrder.status == 'inRating'
              ? <Button title='Оценить' onPress={()=>setRatingAgree()}/>
              : null}
        </View>
      </View>}
      </ScrollView>
    )
  }

  let mapStoreToProps = (store) => ({
    user:store.register.user,
    nowOrder:store.register.nowOrder,
    oldOrders:store.register.oldOrders
  })

  export default connect(mapStoreToProps)(NowOrders)
