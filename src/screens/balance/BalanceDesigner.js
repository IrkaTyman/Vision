import React,{useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import {getNormalDate} from '../../function/getNormalDate'

//REDUX
import {connect,useDispatch} from 'react-redux'
import {withdrawMoney} from '../../redux/action'

//COMPONENTS
import {Text, View,ScrollView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {styles,fontSizeMain} from '../../components/Style'
import {Button} from '../../components/Button'
import {currencySpelling} from '../../function/currencySpelling'
import {FormInput} from '../../components/FormInput';

const BalanceClient = ({user}) => {
  let date = new Date()

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

   const onSubmitWithdraw = (data) => {
     dispatch(withdrawMoney(user.balance + +data.sum))
   }

  return(
    <ScrollView style={[styles.container,styles.profileWrapper]}>
      <View style={[styles.profileBlock,styles.p_fsm]}>
        <Text style={[styles.all,styles.h3,styles.bold, styles.redColor]}>Ваш счет</Text>
        <Text style={[styles.all,{marginBottom:0.4*fontSizeMain}]}>{`Счет №${user.id}`}</Text>
        <Text style={[styles.all,{marginBottom:0.4*fontSizeMain},styles.greyColor]}>{`Баланс на ${getNormalDate(date,false)}`}</Text>
        <Text style={[styles.all,styles.darkPinkColor,styles.bold]}>{currencySpelling(user.balance.toString())}</Text>
      </View>
      <View style={[styles.profileBlock,styles.p_fsm]}>
        <Text style={[styles.all,styles.h3,styles.bold,styles.redColor]}>
          Снять вижены
          <Text style={styles.redColor}> *</Text>
        </Text>
        <Controller
          name="sum"
          defaultValue="100"
          control={control}
          rules={{
            max:user.balance,
            min:100,
            required:true,
            pattern:{
              value:/^[0-9]*$/,
              message:'Вводите только цифры'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
                options={{
                  onChangeText:(text) => onChange(text),
                  value:value,
                  keyboardType:'numeric'
                }}
                label='Сумма на ввод'
                styleLabel = {[styles.all,styles.labelEdit]}
                styleInput = {[styles.all,styles.input]}
                onChangeText={(text) => onChange(text)}
                value={value}
                error={errors.sum}
                errorText={errors?.sum?.message || 'Меньше 100'}
              />
          )}
        />
        <Button onPress={handleSubmit(onSubmitWithdraw)} title='Купить' />
        <Text style={[styles.all,styles.darkPinkColor,styles.h3,styles.bold,{marginTop:fontSizeMain}]}>* Условия вывода</Text>
        <View>
          <Text style={[styles.all,styles.darkPinkColor, styles.profileInfoText]}>Минимальная сумма для вывода <Text style={styles.bold}>1000</Text> рублей</Text>
          <Text style={[styles.all,styles.darkPinkColor, styles.profileInfoText]}>Снятие производится каждый четверг <Text style={styles.bold}>до 20:00 по МСК</Text></Text>
        </View>
      </View>
    </ScrollView>
  )
}

BalanceClient.navigationOptions = {
    title: 'BalanceClient'
};

let mapStoreToProps = (store) => ({
  user:store.register.user
})

export default connect(mapStoreToProps)(BalanceClient)
