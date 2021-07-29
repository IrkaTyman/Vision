import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../components/Button'
import {styles} from '../components/Style'

export const Order = (props) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.profileBlock}>
          <Text style={[styles.all,styles.h3]}>Создать</Text>
          <FormOrders/>
        </View>
      </ScrollView>
    );
};

Order.navigationOptions = {
    title: 'Order'
};
