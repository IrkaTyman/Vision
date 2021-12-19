import React from 'react';
import {Image, Text, View, ScrollView, Pressable, Dimensions} from 'react-native';
import {Button} from '../../components/Button'
import {connect,useDispatch} from 'react-redux'
import {changeIndexImgGallery} from '../../redux/action'
import {styles,fontSizeMain,SCREEN_WIDTH,colors} from '../../components/Style'
import {currencySpelling} from '../../function/currencySpelling'
import { AntDesign,Feather } from '@expo/vector-icons';

 const ProfileOfUser = ({route,navigation,allOrders}) => {
    const user = route.params.user
    const orders = user.orders ? allOrders.filter(item=>user.orders.indexOf(item.id)!=-1) : []
    const dispatch = useDispatch()

    const setIndexImgGallery = (page) => {
      dispatch(changeIndexImgGallery(page))
      navigation.navigate('galleryBig')
    }

    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm,{position:'relative'}]}>
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
        </View>
        <View style={[styles.profileBlock,styles.p_fsm]} >
          <Pressable style={[styles.fd_r,styles.jc_sb]}
            onPress={()=>navigation.navigate('galleryMini',{userOrders:orders})} >
            <Text style={[styles.all,styles.h3]}>Готовые фото <Text style={styles.darkPinkColor}>{orders.length}</Text></Text>
            <AntDesign style={{marginBottom:fontSizeMain,marginLeft:fontSizeMain*0.7}} name={'right'} size={fontSizeMain} color="#000" />
          </Pressable>
          <View style={styles.gallery_wrap}>
          {orders[0]
            ? orders.map((item, i) => {
              if (i < 3 || (i < 4 && SCREEN_WIDTH > 600)){
                return <Pressable key={i} onPress={() => setIndexImgGallery(i)}>
                      <Image  source={{uri:item.afterImg}} style={styles.galleryHome_img}/>
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

ProfileOfUser.navigationOptions = {
    title: 'ProfileOfUser'
};
let mapStoreToProps = (store) => ({
  allOrders:store.register.allOrders,
})

export default connect(mapStoreToProps)(ProfileOfUser)
