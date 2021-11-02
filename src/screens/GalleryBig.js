import React,{useState} from 'react';
import {Text, View,Image,Pressable,Dimensions} from 'react-native';
import {Ionicons,AntDesign} from '@expo/vector-icons'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain,colors} from '../components/Style'
import Gallery from 'react-native-image-gallery';
import {changeIndexImgGallery} from '../redux/action'
import {deleteImgGallery,downloadImg, shareImg} from '../function/imgGalleryFunction'

const GalleryBig = (props) => {
  const dispatch = useDispatch()
  const setIndexImgGallery = (state,page) => {
    if(state == 'settling'){
      dispatch(changeIndexImgGallery(page))
    }
  }
  const createImages = () => {
    const images = []
    props.allVisibleImgInGallery ? Object.keys(props.allVisibleImgInGallery).map((item,i) => {
      images.push({source:{uri:props.allVisibleImgInGallery[item]}})
    }) : null
    return images
  }
  const deleteImgExtra = () => {
    console.log(props.route.params)
    props.route.params.setState(!props.route.params.state)
    props.navigation.goBack()
  }
  return(
    <View style = {[styles.flex]}>
      <Gallery
        initialPage={props.indexImgGallery}
        onPageScrollStateChanged={(index,page) => setIndexImgGallery(index,page)}
        style={{backgroundColor: 'black' }}
        images={createImages()}
      />
      <View style={[{backgroundColor:'#000',width:'100%',height:80,justifyContent:'space-around'},styles.ai_c,styles.fd_r]}>
      <Pressable style = {[styles.ai_c]}
          onPress={()=>downloadImg(props.oldOrders[Object.keys(props.allVisibleImgInGallery)[props.indexImgGallery]].afterImg,Object.keys(props.allVisibleImgInGallery)[props.indexImgGallery])}>
        <Ionicons name="ios-download-outline" size={fontSizeMain*1.5} color='#99a2ad' />
        <Text style={[styles.all,styles.bold,{color:'#99a2ad'}]}>Скачать</Text>
      </Pressable>
        <Pressable style = {[styles.ai_c]}
            onPress={()=>shareImg(props.oldOrders[props.indexImgGallery].afterImg)}>
          <Ionicons name="cloud-upload-outline" size={fontSizeMain*1.5} color='#99a2ad' />
          <Text style={[styles.all,styles.bold,{color:'#99a2ad'}]}>Отправить</Text>
        </Pressable>
        <Pressable style = {[styles.ai_c]}
            onPress={()=>deleteImgGallery(dispatch,[Object.keys(props.allVisibleImgInGallery)[props.indexImgGallery]],props.oldOrders,props.allVisibleImgInGallery,deleteImgExtra)}>
          <AntDesign name="delete" size={fontSizeMain*1.5} color='#99a2ad'/>
          <Text style={[styles.all,styles.bold,{color:'#99a2ad'}]}>Удалить</Text>
        </Pressable>
      </View>
   </View>
  )
}

let mapStoreToProps = (store) => ({
  indexImgGallery:store.register.indexImgGallery,
  oldOrders:store.register.oldOrders,
  allVisibleImgInGallery:store.register.allVisibleImgInGallery
})

export default connect(mapStoreToProps)(GalleryBig)
