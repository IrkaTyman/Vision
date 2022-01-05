import React,{useState,useEffect} from 'react';
import {Image, Text, View, ScrollView, Pressable, Dimensions,Platform} from 'react-native';
import {Button} from '../components/Button'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain,SCREEN_WIDTH,colors} from '../components/Style'
import {changeIndexImgGallery,changeCountImgInGallery,addNowOrder,addOldOrders,withdrawMoney} from '../redux/action'
import {currencySpelling} from '../function/currencySpelling'
import { AntDesign,Feather } from '@expo/vector-icons';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import {sendPushNotifications} from '../../server-operations'

 const Home = ({user,navigation,allVisibleImgInGallery,nowOrder,oldOrders,allMessages}) => {
   const dispatch=useDispatch()
   const [state,setState] =useState(0)
   let [nowOrderId,setNowOrder] = useState([])

   useEffect(()=>{
     if(user.status == 'designer'){
       addListener('',firebase.database().ref('users/' + user.uid + '/balance'),'user')
     }},[])


  useEffect(()=>{
     // if(nowOrderId.join(' ') != Object.keys(nowOrder).join(' ')){
     //   let newIdArr = []
     //   let origNowOrder = Object.keys(nowOrder)
     //   for(let i of origNowOrder){
     //     newIdArr.push(i)
     //     if(nowOrderId.indexOf(i) == -1){
     //       addListener(i,firebase.database().ref('orders/' + (i)),'order')
     //     }
     //   }
     //   setNowOrder(newIdArr)
     // }
   },[nowOrderId])

   const setIndexImgGallery = (page) => {
     dispatch(changeIndexImgGallery(page))
     navigation.navigate('GalleryBig',{setState,state})
   }
   function addListener(id,ref,type){
     deleteListener(ref)
     let statusRef = ref
     let nowOrders = nowOrder
     if(type == 'order'){
       let typeToken = ''
       statusRef.on('value', (snapshot) => {
         let data = snapshot.val()
         if (data){
           if(data.status == 'inComplete'){
             deleteListener(ref)
             typeToken='inComplete'
               //Complete
           } else if(data.status != nowOrders[id].status && data.status == 'inRating'){
               typeToken= 'inRating'
          } else if (data.designerUID != nowOrders[id].designerUID){
              typeToken= 'inWork'
          }
          if (Platform.OS == 'android'){
            sendPushNotifications(user.expoPushToken,typeToken)}
         }})
      }
     else {
       statusRef.on('value',(snap) => {
         let data = snap.val()
         dispatch(withdrawMoney(data))
       })
     }
   }
   function deleteListener(ref){
     let statusRef = ref
     statusRef.off()
   }

   if(nowOrderId.join(' ') != Object.keys(nowOrder).join(' ')){
     let newIdArr = []
     let origNowOrder = Object.keys(nowOrder)
     for(let i of origNowOrder){
       newIdArr.push(i)
       if(nowOrderId.indexOf(i) == -1){
         addListener(i,firebase.database().ref('orders/' + (i)),'order')
       }
     }
     setNowOrder(newIdArr)
   }
   // if(user.status == 'designer'){
   //   addListener('',firebase.database().ref('users/' + user.uid + '/balance'),'user')
   // }
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm,{position:'relative'}]}>
          <Pressable onPress={() => navigation.navigate('Edit')} style={styles.editIcon}>
            <Feather name="settings" size={fontSizeMain*1.3} color={colors.red} />
          </Pressable>
          <View style={[styles.profileInfoAbout,styles.fd_r]}>
            <Image source = {{uri:user.img}} style={[styles.avaImg,{width:100,height:100}]}/>
            <View style={[styles.profileInfoTextView,styles.p_fsm,styles.jc_c]}>
              <Text style={[styles.all,styles.profileInfoTextName,styles.profileInfoText,styles.darkPinkColor]}>{user.username}</Text>
              <Text style={[styles.all,,styles.profileInfoText,styles.darkPinkColor]}>{user.status}</Text>
              <Text style={[styles.all,,styles.profileInfoText,styles.darkPinkColor]}>Баланс:
                <Text style={styles.bold}> {currencySpelling(user.balance.toString())} </Text>
              </Text>
            </View>
          </View>
          <Button title='Новый заказ' onPress={() => navigation.reset({index: 0,routes: [{ name: 'newOrders' }]})}/>
        </View>
        <View style={[styles.profileBlock,styles.p_fsm]} >
          <Pressable style={[styles.fd_r,styles.jc_sb]}
            onPress={()=>navigation.navigate('GalleryMini',{setState,state})} >
            <Text style={[styles.all,styles.h3]}>Готовые фото <Text style={styles.darkPinkColor}>{Object.keys(allVisibleImgInGallery).length}</Text></Text>
            <AntDesign style={{marginBottom:fontSizeMain,marginLeft:fontSizeMain*0.7}} name={'right'} size={fontSizeMain} color="#000" />
          </Pressable>
          <View style={styles.gallery_wrap}>
          {Object.keys(allVisibleImgInGallery)[0]
            ? Object.keys(allVisibleImgInGallery).map((item, i) => {
              if (i < 3 || (i < 4 && SCREEN_WIDTH > 600)){
                return <Pressable key={i} onPress={()=>setIndexImgGallery(i)}>
                      <Image  source={{uri:allVisibleImgInGallery[item]}} style={styles.galleryHome_img}/>
                    </Pressable>}
                  })
            : <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
                Пока здесь ничего нет
              </Text>}
            </View>
        </View>
      </ScrollView>
    );
};

Home.navigationOptions = {
    title: 'Home'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  oldOrders:store.register.oldOrders,
  nowOrder:store.register.nowOrder,
  allMessages:store.register.allMessages,
  allVisibleImgInGallery:store.register.allVisibleImgInGallery
})

export default connect(mapStoreToProps)(Home)
