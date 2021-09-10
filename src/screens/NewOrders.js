import React,{useState,useEffect} from 'react';
import {Image, Text, View, ScrollView, Pressable} from 'react-native';
import {Button} from '../components/Button'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import FaceParameters from '../components/newOrder/FaceParameters'
import BodyParameters from '../components/newOrder/BodyParameters'
import { useForm, Controller } from "react-hook-form";
import {FormInput} from '../components/FormInput'
import firebase from 'firebase'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {connect} from 'react-redux'
import {styles,colors,newOrderPhotoWidth,fontSizeMain,SCREEN_WIDTH} from '../components/Style'

 const NewOrders = (props) => {
   const [image,setImage] = useState('')
   const [height,setHeight] = useState(0)
   const [bodyOrFace,setBodyOrFace] = useState(0)
   const [openWindow, setOpenWindow] = useState(false)
   let [faceParameters,setParamFace] = useState([])
   let [bodyParameters,setParamBody] = useState([])
   const [amountUniParam, setAmountUniParam] = useState(0)
   const { control, handleSubmit, formState: { errors } } = useForm();
   const [allAmount, setAllAmount] = useState(0)
   const [noCompleteOrder,setNoCompleteOrder] = useState(false)
   const [timeOrder,setTimeOrder] = useState(0)

   const databaseOrders = firebase.database().ref('orders')
   const radio_props = [
     {label: 'Срочно(15мин)', value: 0},
     {label: 'Не срочно(8ч)', value: 1}
   ];

   useEffect(()=>{
     countAllAmount()
   })
   const faceParamSend = (param) => {
    setParamFace(param)
    setOpenWindow(false)
    setNoCompleteOrder(false)
  }
  const bodyParamSend = (param) => {
    setParamBody(param)
    setOpenWindow(false)
    setNoCompleteOrder(false)
  }
  const countAllAmount = (bool) => {
    let amount = 20
    if(timeOrder == 0) amount = 50
    if(bool) amount += 40
    Object.keys(faceParameters).map((item) => {
      amount+=faceParameters[item]
    })
    Object.keys(bodyParameters).map((item) => {
      amount+=bodyParameters[item]
    })
    amount+=amountUniParam*40
    setAllAmount(amount)
    return amount
  }
  const addUniParamFields = (amountUniParam) => {
    amountUniParam.push(<Controller
            name={'param' + i}
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInput
                  options={{
                     placeholder:'Ваш параметр',
                     onChangeText:(text) => onChange(text),
                     value:value
                  }}
                 styleInput = {[styles.all,styles.input,styles.regInput]}
                 onChangeText={(text) => onChange(text)}
                 value={value}
               />
            )}
          />)
  }
  const completeOrders = (data) => {
    let param = []
    Object.keys(data).map((item) => {
      param.push(data[item])
    })
    param = param.concat(Object.keys(faceParameters))
    param = param.concat(Object.keys(bodyParameters))
    if(image != '' && param!=false){
      let date = Date.now()
      if(timeOrder == 0) date+900000
      else date + 28800000
      setNoCompleteOrder(false)
      let order = {
        param,
        image,
        amount:allAmount,
        client: props.user.email,
        designer:'',
        status:'inWork',
        date:date
      }
      databaseOrders.limitToLast(1).get().then((snapshot) => {
        if(snapshot.exists()){
          databaseOrders.child(+Object.keys(snapshot.val())[0]+1).set(order)
        } else databaseOrders.child(0).set(order)
      }).catch((err) => console.log(err))
      setImage(''),
      setParamBody([])
      setParamFace([]),
      setAllAmount(0)
      setAmountUniParam(0)
    } else {
      setNoCompleteOrder(true)
    }
  }

   const pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });
     if (!result.cancelled) {
       Image.getSize(result.uri,(width,height) =>{
         setHeight(height*newOrderPhotoWidth/width)
       })
       setImage(result.uri);}
    setNoCompleteOrder(false)
   };
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,{position:'relative'}]}>
          {noCompleteOrder
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                Для совершения заказа необходимо указать фото и параметры для обработки
              </Text>
            : null}
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>1. Вставьте фото</Text>
        {image ?
            <Image source = {{uri:image}} style={[styles.newOrderPhoto,{height:height}]}/>
            :
            <Pressable
                onPress={pickImage}
                style={[styles.newOrderPicker]}
             >
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Ionicons name="camera-outline" size={30} color={colors.red} style={{marginRight:fontSizeMain*0.6}}/>
                <Text style={[styles.all, styles.redColor,styles.bold]}>Выберете фото</Text>
              </View>
            </Pressable>
        }
        </View>
        <View style={[styles.profileBlock,{position:'relative'}]}>
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>2. Выберете параметры</Text>
          <View style={[styles.bodyOrFaceWrap]}>
            <Pressable
                onPress={() => setBodyOrFace(0)}
                style={({ pressed }) => [
                    {
                      backgroundColor: bodyOrFace == 0 || pressed
                        ? colors.red
                        : colors.lightPink
                    },styles.bodyOrFaceButton]}
             >
              <Text style={[styles.all, styles.whiteColor,styles.bold]}>Лицо</Text>
            </Pressable>
            <Pressable
                onPress={() => setBodyOrFace(1)}
                style={({ pressed }) => [
                    {
                      backgroundColor: bodyOrFace == 1 || pressed
                        ? colors.red
                        : colors.lightPink
                    },styles.bodyOrFaceButton]}
             >
              <Text style={[styles.all, styles.whiteColor,styles.bold]}>Тело</Text>
            </Pressable>
          </View>
          <Button title='Выбрать параметры' onPress={()=>setOpenWindow(true)} style={styles.p}/>
          {Object.keys(faceParameters).map((item,i) => {
            return <Text key = {i} style={[styles.all,styles.bold,styles.greyColor,styles.bodyOrFaceParam]}>{item}</Text>
          })}
          {Object.keys(bodyParameters).map((item,i) => {
            return <Text key = {i} style={[styles.all,styles.bold,styles.greyColor,styles.bodyOrFaceParam]}>{item}</Text>
          })}
          <Pressable onPress={() => {setAmountUniParam(amountUniParam+1);setNoCompleteOrder(false)}}>
            <Text style={[styles.all,styles.p,styles.redColor,styles.bold]}>Добавь свой параметр + (50 виженов)</Text>
          </Pressable>
          {[...Array(amountUniParam)].map((item,i) => {
            return(
              <View key = {i} style={[styles.bodyOrFaceWrap]}>
                <Controller
                      name={'param' + i}
                      defaultValue=""
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <FormInput
                            options={{
                               placeholder:'Ваш параметр',
                               onChangeText:(text) => onChange(text),
                               value:value
                            }}
                           styleInput = {[styles.all,styles.input,{marginBottom:0}]}
                           onChangeText={(text) => onChange(text)}
                           value={value}
                         />
                      )}
                    />
                  <Pressable onPress={() => setAmountUniParam(amountUniParam-1)}>
                    <View style={[styles.paramMinus,{marginLeft:fontSizeMain}]}></View>
                  </Pressable>
                </View>
            )
          })}
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold,{marginTop:fontSizeMain}]}>3. Выберете время</Text>
          <RadioForm
            formHorizontal={true}
            animation={true}
            style={[styles.checksWrap,{width:SCREEN_WIDTH-2*fontSizeMain}]}
            >
              {radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} style={styles.checkWrap}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={timeOrder == i}
                    onPress={() => {setTimeOrder(i)}}
                    borderWidth={1}
                    buttonInnerColor={'#D25C5C'}
                    buttonOuterColor={'#D25C5C'}
                    buttonSize={fontSizeMain*0.75}
                    buttonOuterSize={fontSizeMain*1.5}
                    buttonStyle={{}}
                  />
                  <Text style={[styles.all,styles.checkText,styles.redColor]}>{obj.label}</Text>
                </RadioButton>
              ))
            }
          </RadioForm>
          <Text style={[styles.all, styles.h3,styles.bold,styles.redColor,{marginTop:fontSizeMain}]}>Итого: {allAmount} виженов</Text>
          <Button title='Начать обработку' onPress={handleSubmit(completeOrders)}/>
        </View>
        {openWindow ? bodyOrFace == 0
          ? <FaceParameters sendParam={faceParamSend} countAllAmount={countAllAmount}/>
          : <BodyParameters sendParam={bodyParamSend} countAllAmount={countAllAmount}/> : null}
      </ScrollView>
    );
};

NewOrders.navigationOptions = {
    title: 'Orders'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  noCompleteOrder:store.register.noCompleteOrder
})

export default connect(mapStoreToProps)(NewOrders)
