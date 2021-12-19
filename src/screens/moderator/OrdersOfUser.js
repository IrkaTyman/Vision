import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import OrderInfoOld from '../../components/OrderInfoOld'

import {styles} from '../../components/Style'

 const OrdersOfUser = ({user,navigation,oldOrders,route}) => {
   let orders = route.params.orders
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={orders[0] ? styles.p_fsm : ''}>
          {orders[0] ? orders.map((item,id) => {
            return <OrderInfoOld setSee={()=>{}} data={item} id ={id} key={id}/>
          }) :
            <View style={[styles.notOrder,styles.flex,styles.ai_c,styles.jc_c]}>
              <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
                Пока здесь ничего нет
              </Text>
            </View>}
        </View>
      </ScrollView>
    );
};

OrdersOfUser.navigationOptions = {
    title: 'Orders'
};


export default OrdersOfUser
