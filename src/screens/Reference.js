import React from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from '../components/Button'
import {styles} from '../components/Style'
import {connect,useDispatch} from 'react-redux'
import { AntDesign } from '@expo/vector-icons';

 const Reference = ({status,navigation}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.p_fsm}>
        {status == 'client' || status == 'moderator' ?
        <>
        <TouchableOpacity style={[styles.orderRow,styles.fd_r,styles.ai_c,styles.jc_c,styles.p_fsm,styles.referenceItem]} onPress={()=>{navigation.navigate('HowToDoOrder')}}>
          <Image style={styles.referenceItemIcon} source={require('../../assets/whiteLogo.png')}/>
          <Text style={[styles.whiteColor, styles.all]}>Как создать заказ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.orderRow,styles.fd_r,styles.ai_c,styles.jc_c,styles.p_fsm,styles.referenceItem]} onPress={()=>{navigation.navigate('HowToPayOrder')}}>
          <Image style={styles.referenceItemIcon} source={require('../../assets/whiteLogo.png')}/>
          <Text style={[styles.whiteColor, styles.all]}>Как оплатить заказ</Text>
        </TouchableOpacity>
        </>
        : null}
        { status == 'designer' || status == 'moderator' ?
        <>
        <TouchableOpacity style={[styles.orderRow,styles.fd_r,styles.ai_c,styles.jc_c,styles.p_fsm,styles.referenceItem]} onPress={()=>{navigation.navigate('HowToBeginEarn')}}>
          <Image style={styles.referenceItemIcon} source={require('../../assets/whiteLogo.png')}/>
          <Text style={[styles.whiteColor, styles.all]}>Как начать зарабатывать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.orderRow,styles.fd_r,styles.ai_c,styles.jc_c,styles.p_fsm,styles.referenceItem]} onPress={()=>{navigation.navigate('HowToWorkPanel')}}>
          <Image style={styles.referenceItemIcon} source={require('../../assets/whiteLogo.png')}/>
          <Text style={[styles.whiteColor, styles.all]}>Как работать с панелью заказов</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.orderRow,styles.fd_r,styles.ai_c,styles.jc_c,styles.p_fsm,styles.referenceItem]} onPress={()=>{navigation.navigate('HowToWithdrawMoney')}}>
          <Image style={styles.referenceItemIcon} source={require('../../assets/whiteLogo.png')}/>
          <Text style={[styles.whiteColor, styles.all]}>Как вывести заработанные деньги</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.orderRow,styles.fd_r,styles.ai_c,styles.jc_c,styles.p_fsm,styles.referenceItem]} onPress={()=>{navigation.navigate('HowToWorkMistake')}}>
          <Image style={styles.referenceItemIcon} source={require('../../assets/whiteLogo.png')}/>
          <Text style={[styles.whiteColor, styles.all]}>Как работать с браком</Text>
        </TouchableOpacity>
        </>
      : null}


        </View>
      </ScrollView>
    );
};

Reference.navigationOptions = {
    title: 'Reference'
};

let mapStoreToProps = (store) => ({
  status:store.register.user.status
})

export default connect(mapStoreToProps)(Reference)
