import React,{useState,useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import {getNormalDate} from '../../function/getNormalDate'
import firebase from 'firebase/app'
import 'firebase/database'

//REDUX
import {connect,useDispatch} from 'react-redux'
import {withdrawMoney,addPerson} from '../../redux/action'

//COMPONENTS
import {Text, View,ScrollView,TouchableWithoutFeedback,Keyboard,Pressable,UIManager} from 'react-native';
import {styles,fontSizeMain} from '../../components/Style'
import {Button} from '../../components/Button'
import {currencySpelling} from '../../function/currencySpelling'
import {FormInput} from '../../components/FormInput';
import UncoverBlock from '../../components/UncoverBlock'

const BalanceClient = ({user}) => {
  let date = new Date()
  let [haventMoney,setHaventMoney] = useState(false)
  let [haveSubsc,setHaveSubsc] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

   const onSubmitWithdraw = (data) => {
     dispatch(withdrawMoney(user.balance + +data.sum))
   }
   const buySubscription = (balance,price,name,day,photo) => {
     if (balance >= price && !user.subscription.name){
       let date = new Date
       let dateEnd = date.setHours(date.getHours()+720)
       let subsc = {name,day:dateEnd,photo}
       let userDub = user
       userDub.canSubsc = true
       userDub.subscription = subsc
       dispatch(addPerson(userDub))
       firebase.database().ref('users/'+ user.uid).update({subscription:subsc,balance:balance-price})
     } else if (user.subscription.name){
       setHaveSubsc(true)
     } else setHaventMoney(true)
   }

   const toggleExtra = () => {
     setHaveSubsc(false)
     setHaventMoney(false)
   }

  return(
    <ScrollView style={[styles.container,styles.profileWrapper]}>
      <View style={[styles.profileBlock,styles.p_fsm, styles.fd_r,styles.jc_sb]}>
        <View>
          <Text style={[styles.all,styles.h3,styles.bold, styles.redColor]}>Ваш счет</Text>
          <Text style={[styles.all,{fontSize:user.subscription.day ? fontSizeMain*0.9 : fontSizeMain,marginBottom:0.4*fontSizeMain}]}>{`Счет №${user.id}`}</Text>
          <Text style={[styles.all,{fontSize:user.subscription.day ? fontSizeMain*0.9 : fontSizeMain,marginBottom:0.4*fontSizeMain},styles.greyColor]}>{`Баланс на ${getNormalDate(date,false)}`}</Text>
          <Text style={[styles.all,{fontSize:user.subscription.day ? fontSizeMain*0.9 : fontSizeMain},styles.darkPinkColor,styles.bold]}>{currencySpelling(user.balance.toString())}</Text>
        </View>
        {user.subscription.day ?
          <View>
            <Text style={[styles.all,styles.h3,styles.bold, styles.redColor]}>Ваш тариф</Text>
            <Text style={[styles.all,{fontSize:user.subscription.day ? fontSizeMain*0.9 : fontSizeMain,marginBottom:0.4*fontSizeMain}]}>{user.subscription.name}</Text>
            <Text style={[styles.all,{fontSize:user.subscription.day ? fontSizeMain*0.9 : fontSizeMain,marginBottom:0.4*fontSizeMain},styles.greyColor]}>{`До ${getNormalDate(user.subscription.day,false)}`}</Text>
            <Text style={[styles.all,{fontSize:user.subscription.day ? fontSizeMain*0.9 : fontSizeMain},styles.darkPinkColor,styles.bold]}>{`Осталось ${currencySpelling(user.subscription.photo+'','order')}`}</Text>
          </View>
          : null
        }

      </View>
      <View style={[styles.profileBlock,styles.p_fsm]}>
        <Text style={[styles.all,styles.h3,styles.bold,styles.redColor]}>
          Пополнить баланс
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
      </View>
      <View style={[styles.profileBlock,styles.p_fsm]} >
      <Text style={[styles.all,styles.h3,styles.bold, styles.redColor]}>Безлимитные тарифы</Text>
      <UncoverBlock toggleExtra = {toggleExtra} header='Light Vision' price= '1680 руб' style={[{backgroundColor:'#ffc000'}]}>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Время действия пакета: </Text> 1 месяц</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Время исполнения: </Text> до 8 часов</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Количество фото: </Text> 30</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Выгода: </Text> Цена за любое фото <Text style={{textDecoration:'line-through'}}>100</Text> = 63 рубля</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Суммарная выгода: </Text> 720 рублей</Text>
        {haventMoney
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Недостаточно средств
            </Text>
          : <View></View>}
          {haveSubsc
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                {`У вас уже есть подписка ${user.subscription.name}`}
              </Text>
            : <View></View>}
        <Button title="Купить" style={{marginBottom:fontSizeMain}} onPress={() => buySubscription(user.balance,1680,'Light Vision',30,30)}/>
        <Text style={[styles.all,styles.bold,{textAlign:'center',fontSize:1.15 *fontSizeMain,}]}>Стоимость пакета:</Text>
        <Text style={[styles.all,{textAlign:'center'}]}>2400 = <Text style={[styles.bold,styles.redColor,styles.boldest]}>1680 </Text>руб.</Text>
      </UncoverBlock>
      <UncoverBlock toggleExtra = {toggleExtra} header='Stars Vision' price= '2520 руб' style={[{backgroundColor:'#92d050'}]}>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Время действия пакета: </Text> 1 месяц</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Время исполнения: </Text> до 15 минут</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Количество фото: </Text> 45</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Выгода: </Text> Цена за любое фото <Text style={{textDecoration:'line-through'}}>100</Text> = 56 рубля</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Суммарная выгода: </Text> 1080 рублей</Text>
        {haventMoney
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Недостаточно средств
            </Text>
          : <View></View>}
          {haveSubsc
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                {`У вас уже есть подписка ${user.subscription.name}`}
              </Text>
            : <View></View>}
        <Button title="Купить" style={{marginBottom:fontSizeMain}} onPress={() => buySubscription(user.balance,2520,'Stars Vision',30,45)}/>
        <Text style={[styles.all,styles.bold,{textAlign:'center',fontSize:1.15 *fontSizeMain,}]}>Стоимость пакета:</Text>
        <Text style={[styles.all,{textAlign:'center'}]}>3600 = <Text style={[styles.bold,styles.redColor,styles.boldest]}>2520 </Text>руб.</Text>
      </UncoverBlock>
      <UncoverBlock toggleExtra = {toggleExtra} header='VIP Vision ' price= '3120 руб' style={[{backgroundColor:'#963634'}]}>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Время действия пакета: </Text> 2 месяц</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Время исполнения: </Text> до 15 минут</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Количество фото: </Text> 60</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Выгода: </Text> Цена за любое фото <Text style={{textDecoration:'line-through'}}>100</Text> = 52 рубля</Text>
        <Text style={[styles.all,styles.orderDescript,{marginBottom:0.6*fontSizeMain}]}><Text style={[styles.all,styles.bold]}>Суммарная выгода: </Text> 1680 рублей</Text>
        {haventMoney
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Недостаточно средств
            </Text>
          : <View></View>}
          {haveSubsc
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                {`У вас уже есть подписка ${user.subscription.name}`}
              </Text>
            : <View></View>}
        <Button title="Купить" style={{marginBottom:fontSizeMain}} onPress={() => buySubscription(user.balance,3120,'VIP Vision',30,60)}/>
        <Text style={[styles.all,styles.bold,{textAlign:'center',fontSize:1.15 *fontSizeMain,}]}>Стоимость пакета:</Text>
        <Text style={[styles.all,{textAlign:'center'}]}>4800 = <Text style={[styles.bold,styles.redColor,styles.boldest]}>3120 </Text>руб.</Text>
      </UncoverBlock>
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
