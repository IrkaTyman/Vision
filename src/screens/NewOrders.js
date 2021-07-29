import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../components/Button'
import {FormOrders} from '../components/FormOrders'

import {connect,useSelector,useDispatch} from 'react-redux'
import {actionCreators as actions,addPerson} from '../redux/action'
import {styles} from '../components/Style'

 const NewOrders = ({user,navigation}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.profileBlock}>
          <Text style={[styles.all,styles.h3]}>Создать</Text>
        </View>
      </ScrollView>
    );
};

NewOrders.navigationOptions = {
    title: 'Orders'
};

let mapStoreToProps = (store) => ({
  user:store.register.user
})

export default connect(mapStoreToProps)(NewOrders)
