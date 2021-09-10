import React,{useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";

//REDUX
import {connect,useDispatch} from 'react-redux'
import {withdrawMoney} from '../../redux/action'

//COMPONENTS
import {Text, View,ScrollView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {styles,fontSizeMain} from '../../components/Style'
import {Button} from '../../components/Button'
import {currencySpelling} from '../../function/currencySpelling'
import {FormInput} from '../../components/FormInput';

const BalanceDesigner = ({user}) => {
  let date = new Date()
  let dateStr = date.toLocaleString()

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

   const onSubmitWithdraw = (data) => {
     dispatch(withdrawMoney(user.balance-data.sum))
   }

  return(
    <ScrollView style={[styles.container,styles.profileWrapper]}>
      <View style={styles.profileBlock}>
        <Text style={[styles.all,styles.h3,styles.bold]}>{`Ваш баланс на ${dateStr.slice(0,10)}`}</Text>
        <Text style={styles.all}>
          <Text style={[styles.darkPinkColor,styles.bold]}>{user.balance} </Text>
          {currencySpelling(user.balance.toString())}
        </Text>
      </View>
      <View style={styles.profileBlock}>
        <Text style={[styles.all,styles.h3,styles.bold]}>
          Вывод средств
          <Text style={styles.redColor}> *</Text>
        </Text>
        <Controller
          name="sum"
          defaultValue="100"
          control={control}
          rules={{
            max:user.balance,
            min:1000,
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
                label="Сумма на вывод"
                styleLabel = {[styles.all,styles.labelEdit]}
                styleInput = {[styles.all,styles.input]}
                onChangeText={(text) => onChange(text)}
                value={value}
                error={errors.sum}
                errorText={errors?.sum?.message || 'Не хватает средств или меньше 1000'}
              />
          )}
        />
        <Controller
          name="numCard"
          defaultValue=""
          control={control}
          rules={{
            required:true,
            pattern:{
              value: /^[0-9]{16}$/i,
              message:'Неправильный номер карты'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
                options={{
                  onChangeText:(text) => onChange(text),
                  value:value,
                  keyboardType:'numeric'
                }}
                label="Номер карты"
                styleLabel = {[styles.all,styles.labelEdit]}
                styleInput = {[styles.all,styles.input,styles.editTelInput]}
                onChangeText={(text) => onChange(text)}
                value={value}
                name='numCard'
                error={errors.numCard}
                errorText={errors?.numCard?.message}
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmitWithdraw)} title={user.status == 'designer' ? 'Вывести' : 'Ввести'} />
        <Text style={[styles.all,styles.darkPinkColor,styles.h3,styles.bold,{marginTop:fontSizeMain}]}>* Условия вывода</Text>
        <Text style={[styles.all,styles.darkPinkColor, styles.profileInfoText]}>Минимальная сумма для вывода <Text style={styles.bold}>1000</Text> рублей</Text>
        <Text style={[styles.all,styles.darkPinkColor, styles.profileInfoText]}>Вижены спишутся со счета в момент подачи заявки</Text>
        <Text style={[styles.all,styles.darkPinkColor, styles.profileInfoText]}>Выплаты производятся каждый четверг <Text style={styles.bold}>до 20:00 по МСК</Text></Text>
      </View>
    </ScrollView>
  )
}

BalanceDesigner.navigationOptions = {
    title: 'BalanceDesigner'
};

let mapStoreToProps = (store) => ({
  user:store.register.user
})

export default connect(mapStoreToProps)(BalanceDesigner)
