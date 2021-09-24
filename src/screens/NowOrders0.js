import React,{useEffect,useState} from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../components/Button'
import OrderInfoNow from '../components/OrderInfoNow'
import firebase from 'firebase'

import {connect,useSelector,useDispatch} from 'react-redux'
import {actionCreators as actions,addPerson} from '../redux/action'
import {styles} from '../components/Style'

 const NowOrders = ({user,navigation,nowOrder}) => {
   let [state,setState]=useState()
    let statusOrderRef = firebase.database().ref('orders/' + (nowOrder.id-1));
    statusOrderRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data,'data')
    });
    useEffect(()=>{
      console.log(nowOrder,'now')
    })
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.ordersBlock}>
          {nowOrder.client
            ? <OrderInfoNow navigation={navigation} setOrder={setState} data={nowOrder} id = {nowOrder.id}/>
            : <View style={styles.notOrder}>
              <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
                Пока здесь ничего нет
              </Text>
            </View>}
        </View>
      </ScrollView>
    );
};

NowOrders.navigationOptions = {
    title: 'Orders'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  nowOrder:store.register.nowOrder
})

export default connect(mapStoreToProps)(NowOrders)
