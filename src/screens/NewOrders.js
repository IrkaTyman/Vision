import React,{useState,useEffect} from 'react';
import {Image, Text, View, ScrollView, Pressable,Platform} from 'react-native';
import {Button} from '../components/Button'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {Parameters} from '../components/Parameters'
import { useForm, Controller } from "react-hook-form";
import {FormInput} from '../components/FormInput'
import firebase from 'firebase'
import {addOrdersIdToUser} from '../function/addOrdersIdToUser'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {ChoosePhotoBlock} from '../components/ChoosePhotoBlock'
import {connect,useDispatch} from 'react-redux'
import {addNowOrder,addPerson} from '../redux/action'
import {styles,colors,fontSizeMain,sliderBAWidth,widthWihtout2Font,SCREEN_WIDTH} from '../components/Style'

 const NewOrders = (props) => {
   const [image,setImage] = useState('')
   const [height,setHeight] = useState(0)
   const [bodyOrFace,setBodyOrFace] = useState(0)
   const [openWindow, setOpenWindow] = useState(false)
   const [parameters,setParameters] = useState({})
   const [amountUniParam, setAmountUniParam] = useState(0)
   const { control, handleSubmit, formState: { errors } } = useForm();
   const [allAmount, setAllAmount] = useState(0)
   const [noCompleteOrder,setNoCompleteOrder] = useState(false)
   const [timeOrder,setTimeOrder] = useState(0)
   const [haveOrder,setHaveOrder] = useState(false)
   const [havingMoney,setHavingMoney] = useState(true)
   const [input,setInput] = useState({})
   const [seeInfo,setSeeInfo] = useState(false)


   const _handleChange = (key,text) => {
     setInput({ ...input, [key]: text });
    };
    const addParam = () => {
      setAmountUniParam(amountUniParam+1)
      setNoCompleteOrder(false)
    }
    const deleteParam = (i) => {
      setInput({...input,[`param${i}`]:''})
      setAmountUniParam(amountUniParam-1)
    }

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
  const completeOrders = async () => {
    if(props.user.balance > allAmount-1){
      let param = []
      let id
      Object.keys(input).map((item) => {
        param.push(input[item])
      })
      param = param.concat(Object.keys(parameters))
      if(image != '' && param!=false){
        let dateCreate = Date.now()
        let dateComplete
        if(timeOrder == 0) dateComplete= dateCreate+900000
        else  dateComplete= dateCreate+28800000
        setNoCompleteOrder(false)
        let order = {
          param,
          designerUID:'',
          seeThisOrder:false,
          dateCreate:dateCreate,
          amount:allAmount,
          clientName: `${props.user.username} ${props.user.surname}`,
          clientUID:props.user.uid,
          status:'inWork',
          dateComplete:dateComplete,
          amountDesigner:0,
          height:height,
          quickly:timeOrder == 0 ? 15 : 0
        }

        let user = props.user
        user.balance -= allAmount
        dispatch(addPerson(user))
        console.log(user)
        firebase.database().ref('users/' + user.uid).set(user);
        firebase.database().ref('orders/').limitToLast(1).get().then(async (snapshot) => {
          if(snapshot.exists()){
            id = +Object.keys(snapshot.val())[0]+1
          } else id = 0
          let uploadImg = await uploadImageAsync(image,id)
          order.id = id+1
          order.visiblePhoto=true
          order.beforeImg = uploadImg
          firebase.database().ref('orders/').child(id).set(order)
          addOrdersIdToUser(props.user, dispatch, order.id-1)
          dispatch(addNowOrder(order))
        }).catch((err) => console.log(err))
        setImage(''),
        setParameters({})
        setAllAmount(0)
        setInput({})
        setAmountUniParam(0)
      } else {
        setNoCompleteOrder(true)
      }
    } else if(props.user.balance < allAmount){
      setHavingMoney(false)
      setTimeout(()=>setHavingMoney(true),1000)
    } else {
      setHaveOrder(true)
      setTimeout(()=>setHaveOrder(false),1000)
    }
  }
  const uploadImageAsync = async (image,id) => {
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
    const snapshot = await ref.put(blob,{contentType:'image/jpeg'});
    return await snapshot.ref.getDownloadURL();
  }
  const setImageHandler = (result) => {
     if (!result.cancelled) {
      setHeight(result.height/result.width)
      setImage(result.uri);
    }
    setNoCompleteOrder(false)
   };
    return (
      haveOrder || !havingMoney
        ? <View style={[styles.alertNewOrderWrapper,styles.ai_c,styles.jc_c]}>
            <View style={[styles.alertNewOrder,styles.ai_c,styles.jc_c]}>
              <Text style={[styles.all,styles.whiteColor,]}>У вас {haveOrder ? 'уже есть текущий заказ' : 'недостаточно средств'}</Text>
            </View>
          </View>
        :
      <ScrollView style={[styles.container,styles.profileWrapper,openWindow ? {height:'100%'} : null]}>
        {openWindow ?
            <Parameters sendParam={paramSend} countAllAmount={countAllAmount} parameters={bodyOrFace == 0 ? props.faceParameters : props.bodyParameters}/>
          :
        <View>
          <View style={[styles.profileBlock,styles.p_fsm,{position:'relative'}]}>
          {noCompleteOrder
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                Для совершения заказа необходимо указать фото и параметры для обработки
              </Text>
            : null}
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>1. Вставьте фото</Text>
        {image ?
            <Image source = {{uri:image}} style={[styles.newOrderPhoto,{height:height*widthWihtout2Font}]}/>
            :
            <ChoosePhotoBlock
                  style={[]}
                  handler={setImageHandler}/>
        }
        {image
          ? <Pressable
              hitSlop={100}
              onPress={()=>{setImage('')}}
              style={({ pressed }) => [styles.sliderBAArrow,
                  {
                    backgroundColor: pressed
                      ? '#C55454'
                      : '#D07070',
                    left:fontSizeMain,
                    bottom:fontSizeMain,
                    width:'40%',
                  },styles.ai_c,styles.jc_c]}
            >
            <Text style={[styles.whiteColor,styles.all]}>Удалить</Text>
            </Pressable>
          : null
        }
        </View>
        <View style={[styles.profileBlock,styles.p_fsm,{position:'relative'}]}>
          {seeInfo ?
            <View style={[styles.infoPopup,styles.ai_c,styles.jc_c]}>
              <Pressable style={{marginLeft:'auto'}} onPress={()=>setSeeInfo(false)}>
                <AntDesign  name="close" size={fontSizeMain*1.2} color={colors.red} />
              </Pressable>
              <Text style={[styles.all,styles.p]}>
                Если Вы не нашли подходящий параметр, Вы можете задать свой собственный, но описывающий только 1 область обработки (не более 30 символов). Например: “Выровнять нос по центру”; “Сделать симметрично брови”; “Убрать логотип” и т.п. Если их несколько, просто создайте еще один, при помощи знака “+”.
              </Text>
            </View>
            : null}
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>2. Выберите параметры</Text>
          <View style={[styles.bodyOrFaceWrap,styles.ai_c,styles.fd_r]}>
            <Pressable
                onPress={() => setBodyOrFace(0)}
                style={({ pressed }) => [
                    {
                      backgroundColor: bodyOrFace == 0 || pressed
                        ? colors.red
                        : colors.lightPink
                    },styles.bodyOrFaceButton,styles.p_fsm,styles.jc_c,styles.fd_r]}
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
                    },styles.bodyOrFaceButton,styles.p_fsm,styles.jc_c,styles.fd_r]}
             >
              <Text style={[styles.all, styles.whiteColor,styles.bold]}>Тело</Text>
            </Pressable>
          </View>
          <Button title='Выбрать параметры' onPress={()=>setOpenWindow(true)} style={styles.p}/>
          {Object.keys(parameters).map((item,i) => {
            return <Text key = {i} style={[styles.all,styles.bold,styles.greyColor,styles.bodyOrFaceParam]}>{item}</Text>
          })}
          <Pressable onPress={addParam} style={[styles.fd_r,styles.ai_c,{flexWrap:'wrap',marginBottom:amountUniParam > 0 ? fontSizeMain:null}]}>
            <Text style={[styles.all,styles.redColor,styles.bold]}>Добавь свой параметр (40 виженов)</Text>
            <Pressable onPress = {()=>{setSeeInfo(true)}} style={{marginHorizontal:0.2*fontSizeMain}}>
              <AntDesign name="infocirlce" size={fontSizeMain*1.1} color={colors.red} />
            </Pressable>
            {(amountUniParam == 0 && SCREEN_WIDTH < 600) || SCREEN_WIDTH > 600
              ? <View style={[styles.paramPlusWrap,styles.jc_c,styles.ai_c]}>
                  <Text style={[styles.all,styles.redColor]}>+</Text>
                </View>
              : null}

          </Pressable>
          {[...Array(amountUniParam)].map((item,i) => {
            return(
              <View key = {i} style={[styles.bodyOrFaceWrap,styles.ai_c,styles.fd_r,styles.jc_c]}>
                  <FormInput
                      options={{
                         placeholder:'Ваш параметр',
                         onChangeText:(text) => _handleChange(`param${i}`,text),
                         value:input[`param${i}`]
                      }}
                     styleInput = {[styles.all,styles.input,{marginBottom:0,width:SCREEN_WIDTH-4.5*fontSizeMain}]}
                   />
                  <Pressable style={[styles.paramMinusWrap,styles.jc_c,styles.ai_c]} onPress={() => deleteParam(amountUniParam-1)}>
                    <View style={styles.paramMinus}></View>
                  </Pressable>
                </View>
            )
          })}
          {amountUniParam > 0
            ? <View style={[styles.ai_c,styles.jc_c,{width:'100%'}]}>
                <Pressable style={[styles.paramPlusWrap,styles.jc_c,styles.ai_c,{marginVertical:0}]} onPress={addParam}>
                  <Text style={[styles.all,styles.redColor]}>+</Text>
                </Pressable>
              </View>
            : null}
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold,{marginTop:fontSizeMain}]}>3. Выберите время</Text>
          <RadioForm
            formHorizontal={true}
            animation={true}
            style={[styles.checksWrap,{width:SCREEN_WIDTH-2*fontSizeMain},styles.fd_r,styles.jc_sb]}
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
  oldOrders:store.register.oldOorders,
  faceParameters:store.register.faceParameters,
  bodyParameters:store.register.bodyParameters
})

export default connect(mapStoreToProps)(NewOrders)
