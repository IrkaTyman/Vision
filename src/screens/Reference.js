import React from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from '../components/Button'
import {styles} from '../components/Style'
import { AntDesign } from '@expo/vector-icons';

 const Reference = (props) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.ordersBlock}>
          <TouchableOpacity style={[styles.orderRow,styles.referenceItem]} onPress={()=>{}}>
            <AntDesign name="question" size={16} color="#fff" style={styles.referenceItemIcon} />
            <Text style={[styles.whiteColor, styles.all]}>Как создать заказ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};

Reference.navigationOptions = {
    title: 'Reference'
};

export default Reference
