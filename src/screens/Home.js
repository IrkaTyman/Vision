import React,{useState,useEffect} from 'react';
import {Image, Text, View, ScrollView, Pressable, Dimensions} from 'react-native';
import {Button} from '../components/Button'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../components/Style'
import {changeIndexImgGallery,changeCountImgInGallery} from '../redux/action'
import {currencySpelling} from '../function/currencySpelling'
import { AntDesign } from '@expo/vector-icons';

 const Home = ({user,navigation,allVisibleImgInGallery}) => {
   const dispatch=useDispatch()
   const [state,setState] =useState(0)

   const setIndexImgGallery = (page) => {
     console.log(page)
     dispatch(changeIndexImgGallery(page))
     navigation.navigate('GalleryBig',{setState,state})
   }
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
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
          <Button title='Редактировать' onPress={() => navigation.navigate('Edit')}/>
        </View>
        <View style={[styles.profileBlock,styles.p_fsm]} >
          <Pressable style={[styles.fd_r,styles.jc_sb]}
            onPress={()=>{navigation.navigate('GalleryMini',{setState,state})}} >
            <Text style={[styles.all,styles.h3]}>Готовые фото <Text style={styles.darkPinkColor}>{Object.keys(allVisibleImgInGallery).length}</Text></Text>
            <AntDesign style={{marginBottom:fontSizeMain,marginLeft:fontSizeMain*0.7}} name={'right'} size={fontSizeMain} color="#000" />
          </Pressable>
          <View style={styles.gallery_wrap}>
          {Object.keys(allVisibleImgInGallery)[0]
            ? Object.keys(allVisibleImgInGallery).map((item, i) => {
                return <Pressable key={i} onPress={()=>setIndexImgGallery(i)}>
                      <Image  source={{uri:allVisibleImgInGallery[item]}} style={styles.galleryHome_img}/>
                    </Pressable>})
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
  allVisibleImgInGallery:store.register.allVisibleImgInGallery
})

export default connect(mapStoreToProps)(Home)
