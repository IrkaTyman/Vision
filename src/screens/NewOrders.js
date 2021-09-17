import React,{useState,useEffect} from 'react';
import {Image, Text, View, ScrollView, Pressable,Platform} from 'react-native';
import {Button} from '../components/Button'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {Parameters} from '../components/newOrder/Parameters'
import { useForm, Controller } from "react-hook-form";
import {FormInput} from '../components/FormInput'
import firebase from 'firebase'
import {addOrdersIdToUser} from '../function/addOrdersIdToUser'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {connect,useDispatch} from 'react-redux'
import {addNowOrder} from '../redux/action'
import {styles,colors,fontSizeMain,sliderBAWidth,SCREEN_WIDTH} from '../components/Style'

 const NewOrders = (props) => {
   const [image,setImage] = useState('')
   const [height,setHeight] = useState(0)
   const [bodyOrFace,setBodyOrFace] = useState(0)
   const [openWindow, setOpenWindow] = useState(false)
   let [parameters,setParameters] = useState({})
   const [amountUniParam, setAmountUniParam] = useState(0)
   const { control, handleSubmit, formState: { errors } } = useForm();
   const [allAmount, setAllAmount] = useState(0)
   const [noCompleteOrder,setNoCompleteOrder] = useState(false)
   const [timeOrder,setTimeOrder] = useState(0)
   const [haveOrder,setHaveOrder] = useState(false)

   const dispatch = useDispatch()
   const databaseOrders = firebase.database().ref('orders')
   const radio_props = [
     {label: 'Срочно(15мин)', value: 0},
     {label: 'Не срочно(8ч)', value: 1}
   ];

   useEffect(()=>{
     (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })()
     countAllAmount()
   })
   const paramSend = (param) => {
    setParameters(Object.assign(parameters,param))
    setOpenWindow(false)
    setNoCompleteOrder(false)
  }
  const countAllAmount = (bool) => {
    let amount = 20
    if(timeOrder == 0) amount = 50
    if(bool) amount += 40
    Object.keys(parameters).map((item) => {
      amount+=parameters[item]
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
  const completeOrders = async (data) => {
    if(!props.nowOrder.client){
      let param = []
      let id
      Object.keys(data).map((item) => {
        param.push(data[item])
      })
      param = param.concat(Object.keys(parameters))
      if(image != '' && param!=false){
        let date = Date.now()
        if(timeOrder == 0) date+=900000
        else date += 28800000
        setNoCompleteOrder(false)
        let order = {
          param,
          dataCreate:new Date(),
          amount:allAmount,
          client: props.user.email,
          status:'inWork',
          dateComplete:date,
          amountDesigner:0,
          designer:'',
          height
        }
        databaseOrders.limitToLast(1).get().then(async (snapshot) => {
          if(snapshot.exists()){
            id = +Object.keys(snapshot.val())[0]+1
          } else id = 0
          let uploadImg = await uploadImageAsync(image,id)
          order.id = id+1
          order.beforeImg = uploadImg
          databaseOrders.child(id).set(order)
          addOrdersIdToUser(props.user, dispatch, order.id-1)
          dispatch(addNowOrder(order))
        }).catch((err) => console.log(err))
        setImage(''),
        setParameters({})
        setAllAmount(0)
        setAmountUniParam(0)
      } else {
        setNoCompleteOrder(true)
      }
    } else {
      setHaveOrder(true)
      setTimeout(()=>setHaveOrder(false),1000)
    }
  }

  async function uploadImageAsync(image,id) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref(`/orders/${id}/${id}-0.jpg`);
    const snapshot = await ref.put(blob);
    return await snapshot.ref.getDownloadURL();
  }

   const pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
       allowsEditing: true,
       aspect: [4, 3],
     });
     if (!result.cancelled) {
      setHeight(result.height*sliderBAWidth/result.width)
      setImage(result.uri);
    }
    setNoCompleteOrder(false)

   };
    return (
      <ScrollView style={[styles.container,styles.profileWrapper,openWindow ? {height:'100%'} : null]}>
        {haveOrder
          ? <View style={styles.alertNewOrderWrapper}>
              <View style={styles.alertNewOrder}>
                <Text style={[styles.all,styles.whiteColor,]}>У вас уже есть текущий заказ</Text>
              </View>
            </View>
          : null}
        {openWindow ?
            <Parameters sendParam={paramSend} countAllAmount={countAllAmount} parameters={bodyOrFace == 0 ? props.faceParameters : props.bodyParameters}/>
          :
        <View>
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
          {Object.keys(parameters).map((item,i) => {
            return <Text key = {i} style={[styles.all,styles.bold,styles.greyColor,styles.bodyOrFaceParam]}>{item}</Text>
          })}
          <Pressable onPress={() => {setAmountUniParam(amountUniParam+1);setNoCompleteOrder(false)}}>
            <Text style={[styles.all,styles.p,styles.redColor,styles.bold]}>Добавь свой параметр + (40 виженов)</Text>
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
                           styleInput = {[styles.all,styles.input,{marginBottom:0,width:SCREEN_WIDTH-4.5*fontSizeMain}]}
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
      </View>}

      </ScrollView>
    );
};

NewOrders.navigationOptions = {
    title: 'Orders'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  noCompleteOrder:store.register.noCompleteOrder,
  nowOrder:store.register.nowOrder,
  faceParameters:store.register.faceParameters,
  bodyParameters:store.register.bodyParameters
})

export default connect(mapStoreToProps)(NewOrders)
