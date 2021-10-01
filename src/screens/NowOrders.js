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
import {addNowOrder,addOldOrders,withdrawMoney} from '../redux/action'
import {FormInput} from '../components/FormInput'
import {localeStatusOrder} from '../function/localeStatusOrder'
import {getNormalDate} from '../function/getNormalDate'
//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

const NowOrders = (props) => {
  let [rating,setRating] = useState(0)
  let [state,setState]=useState(0)
  let [noCompleteOrder,setNoCompleteOrder] = useState(false)
  let [noCompulsoryCommets,setNoCompulsoryCommets] = useState(false)
  let [comment,setComment] = useState('')
  let [afterImg,setAfterImg] = useState('')
  let [nowOrderId,setNowOrder] = useState(props.nowOrder.id-1)
  let [balanceDesigner,setBalanceDesigner] = useState(props.user.balance)
  let dispatch = useDispatch()
  let statusOrderRef = firebase.database().ref('orders/' + (props.nowOrder.id-1));

   /*function timerOrderNow(date){
     let time=date
     let hour = Math.floor(time/3600)+''
     time -= hour*3600
     let minutes = Math.floor(time/60)+''
     time-=minutes*60
     let seconds = Math.floor(time)+''
     return `${hour.length==2 ? hour : '0'+hour}:${minutes.length==2 ? minutes : '0'+minutes}:${seconds.length==2 ? seconds : '0'+seconds}`
   }
   function timeBeforeEndOrder(){
     console.log(props.nowOrder.dateComplete,'cc')
     let dateStr = props.nowOrder.dateComplete - Date.now()
     if(dateStr > 0){
       setTime(Math.floor(dateStr/1000))
       setTimeout(timeBeforeEndOrder,2000)
     }
   }*/

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
        let balanceNew = order.quickly + 20
        order.rating == 5 ?  balanceNew += 20 : null
        firebase.database().ref('users/' + order.designer.replace('.','')).get().then((snap)=>{
          if(snap.exists()){
            let balance = snap.val().balance+balanceNew
            firebase.database().ref('users/' + order.designer.replace('.','')).update({balance:balance})
          }
        })
        setNoCompulsoryCommets(false)
        setRating(0)
      } else setNoCompulsoryCommets(true)
    } else setNoCompleteOrder(true)
  }
  const addListener = (id,ref,type) => {
    deleteListener(ref)
    let statusRef = ref
    if(type == 'order'){
      statusRef.on('value', (snapshot) => {
        let data = snapshot.val()
        if (data){
          if(data.status != props.nowOrder.status){
            if(data.status == 'inComplete'){
              let oldOrders = props.oldOrders
              if(oldOrders[oldOrders.length-1].id != data.id){
                oldOrders.push(data)
                dispatch(addOldOrders(oldOrders))
              }
              dispatch(addNowOrder({}))
            } else {
              dispatch(addNowOrder(data))
            }}
        }
     })}
    else {
      statusRef.on('value',(snap) => {
        let data = snap.val()
        dispatch(withdrawMoney(data))
      })
    }
  }
  const deleteListener = (ref) => {
    let statusRef = ref
    statusRef.off()
  }
  if(nowOrderId != props.nowOrder.id){
    addListener(props.nowOrder.id-1,firebase.database().ref('orders/' + (props.nowOrder.id-1)),'order')
    setNowOrder(props.nowOrder.id)
    state == 0 ? setState(1) : setState(0)
  }
  if(props.user.status == 'designer' && balanceDesigner != 1000){
    setBalanceDesigner(1000)
    addListener('',firebase.database().ref('users/' + props.user.email.replace('.','') + '/balance'),'user')
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
            <Text style={[styles.all,styles.orderDescript,styles.redColor,styles.bold,{fontSize:fontSizeMain*1.2}]}><Text style={{fontSize:fontSizeMain}}>Выполнить до:</Text> {getNormalDate(props.nowOrder.dateComplete)}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {props.nowOrder.dateTake ? getNormalDate(props.nowOrder.dateTake) : '-'}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>
              Статус:
              <Text style={{color:'green'}}>
                {localeStatusOrder(props.nowOrder.status)}
              </Text>
            </Text>
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
            {props.user.status == 'client'
              ? <Text style={[styles.all,styles.orderDescript]}>
                  <Text style={[styles.all,styles.orderDescript,styles.bold]}>Вы заплатили: </Text>
                  {currencySpelling(props.nowOrder.amount)}
                </Text>
              : <View>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Бонус за 5 звезд: </Text>
                    20 виженов
                  </Text>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Бонус за срочность: </Text>
                    15 виженов
                  </Text>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Вы получите: </Text>
                    {currencySpelling(20 + props.nowOrder.quickly)}
                  </Text>
                </View>
              }
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
