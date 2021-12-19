import React from 'react';
import {Text, View, ScrollView, FlatList,Pressable} from 'react-native';
import {Button} from '../../components/Button'
import OrderInfoAll from '../../components/OrderInfoAll'

import {connect,useSelector,useDispatch} from 'react-redux'
import {actionCreators as actions,addPerson} from '../../redux/action'
import {styles,colors,fontSizeMain} from '../../components/Style'

 const AllOrders = ({user,navigation,allOrders}) => {
   let date = Date.now()
   const getOrderType = (dateComplete) => {
     let dateOddsMinute = Math.floor((dateComplete - date)/60000)
     if(dateOddsMinute > 240) return styles.orderColorMore2Hour
     else if(dateOddsMinute > 15) return styles.orderColorMore15Minute
     else return styles.orderColorMin5Minute
   }
    return (
      <ScrollView style={[styles.container,styles.profileWrapper,styles.p_fsm]}>
        <View style={[styles.orderColorsModeratorWrapper,styles.p_fsm,styles.fd_r,styles.jc_sb]}>
          <View style={styles.ai_c}>
            <View style={[styles.orderColorModerator,styles.orderColorMore2Hour]}></View>
            <Text style={[styles.whiteColor, styles.all]}>{'> 2 ч'}</Text>
          </View>
          <View style={styles.ai_c}>
            <View style={[styles.orderColorModerator,styles.orderColorMore15Minute]}></View>
            <Text style={[styles.whiteColor, styles.all]}>{'2 ч - 15 мин'}</Text>
          </View>
          <View style={styles.ai_c}>
            <View style={[styles.orderColorModerator,styles.orderColorMin5Minute]}></View>
            <Text style={[styles.whiteColor, styles.all]}>{'< 15 мин'}</Text>
          </View>
        </View>
        <View style={[styles.fd_r,styles.jc_sb,styles.ai_c,{marginBottom:fontSizeMain}]}>
          <Pressable >
            <Text style={[styles.all,styles.redColor,styles.bold]}>По дате</Text>
          </Pressable>
          <Pressable>
            <Text style={[styles.all,styles.redColor,styles.bold]}>Не готовые</Text>
          </Pressable>
          <Pressable>
            <Text style={[styles.all,styles.redColor,styles.bold]}>Готовые</Text>
          </Pressable>
        </View>
        {allOrders[0] ?
          <FlatList
            data={allOrders}
            renderItem={({item}) => (
              <OrderInfoAll data={item} id={item.id} typeOrder={getOrderType(item.dateComplete)}/>
            )}
            keyExtractor={item => item.id.toString()}
          /> :
            <View style={[styles.notOrder,styles.flex,styles.ai_c,styles.jc_c]}>
              <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
                Пока здесь ничего нет
              </Text>
            </View>}
      </ScrollView>
    );
};

AllOrders.navigationOptions = {
    title: 'Orders'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  allOrders:store.register.allOrders,
})

export default connect(mapStoreToProps)(AllOrders)
