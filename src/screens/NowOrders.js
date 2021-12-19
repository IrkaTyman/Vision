import React, { Component, useState } from "react";
import { View,Image,ScrollView, TouchableOpacity, Pressable,Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors} from '../components/Style';
import {currencySpelling} from '../function/currencySpelling'
import {Button} from '../components/Button'
import firebase from 'firebase/app'
import 'firebase/database'
import store from '../redux/store'
import {addNowOrder,addOldOrders,withdrawMoney,changeCountImgInGallery} from '../redux/action'
import {FormInput} from '../components/FormInput'
import {localeStatusOrder} from '../function/localeStatusOrder'
import {getNormalDate} from '../function/getNormalDate'
import {reloadOrders} from '../function/reloadOrders'
import OrderInfoNow from '../components/OrderInfoNow'
//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

const NowOrders = (props) => {
  let [state,setState]=useState(false)
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

  const completeOrders = async (afterImg,id) => {
      let order = props.nowOrder
      order[id].status='inRating'

      await uploadImageAsync(afterImg,id,order)
  }

  const uploadImageAsync = async (image,id,order) => {
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
    const databaseOrders = firebase.database().ref('orders')
    order[id].afterImg = await snapshot.ref.getDownloadURL();
    order[id].dateCompleteDesigner = Date.now()
    const oldOrders = props.oldOrders || []
    oldOrders.push(order[id])
    let allVisibleImg = props.allVisibleImgInGallery
    allVisibleImg[id] = order[id].afterImg
    dispatch(addNowOrder({}))
    dispatch(changeCountImgInGallery(allVisibleImg))
    dispatch(addOldOrders(oldOrders))
    databaseOrders.child(id).set(order[id])
  }
  const setRatingAgree = (rating,comment,id) => {
    if (props.nowOrder[id]){
      let order = props.nowOrder[id]
      if(rating){
          const databaseOrders = firebase.database().ref('orders')
          const oldOrders = props.oldOrders || []
          rating == 5 ?  order.amountDesigner += 10 : null
          order.comment = comment
          order.rating=rating
          order.status='inComplete'
          oldOrders.push(order)
          let nowOrder = props.nowOrder
          delete nowOrder[id]
          let allVisibleImg = props.allVisibleImgInGallery
          allVisibleImg[order.id] = order.afterImg
          dispatch(addNowOrder(nowOrder))
          dispatch(changeCountImgInGallery(allVisibleImg))
          dispatch(addOldOrders(oldOrders))
          databaseOrders.child(id).set(order)
          firebase.database().ref('users/' + order.designerUID).get().then((snap)=>{
            if(snap.exists()){
              let balance = snap.val().balance+order.amountDesigner
              firebase.database().ref('users/' + order.designerUID).update({balance:balance})
            }
          })
    }} else reloadOrders(props.user.orders,dispatch,props.user)}
    return (
        <ScrollView style={styles.container}>
        {!props.nowOrder[Object.keys(props.nowOrder)[0]] ?
          <View style={[styles.notOrder,styles.flex,styles.ai_c,styles.jc_c]}>
            <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
              Пока здесь ничего нет
            </Text>
          </View>
        :
        <View style={styles.p_fsm}>
          <Button title='Обновить' onPress={()=>reloadOrders(props.user.orders,dispatch,props.user)} style={{marginBottom:fontSizeMain}}/>
          {Object.keys(props.nowOrder).map((item,i)=>{
            return <OrderInfoNow
                      i = {i}
                      state = {state}
                      setState= {setState}
                      key = {i}
                      nowOrder={props.nowOrder[item]}
                      completeOrders={completeOrders}
                      setRatingAgree = {setRatingAgree}/>
          })}
        </View>}
        </ScrollView>
      )
  }

  let mapStoreToProps = (store) => ({
    user:store.register.user,
    nowOrder:store.register.nowOrder,
    oldOrders:store.register.oldOrders,
    allVisibleImgInGallery: store.register.allVisibleImgInGallery
  })

  export default connect(mapStoreToProps)(NowOrders)
