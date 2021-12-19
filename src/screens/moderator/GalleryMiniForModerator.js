import React from 'react';
import {Text,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import {styles,colors} from '../../components/Style'
import {changeIndexImgGallery} from '../../redux/action'
import {useDispatch} from 'react-redux'

const GalleryMiniForModerator = (props) => {
  const dispatch = useDispatch()
  const setIndexImgGallery = (page) => {
    dispatch(changeIndexImgGallery(page))
    props.navigation.navigate('galleryBig')
  }
  const orders = props.route.params.userOrders
  return(
    <ScrollView style={[styles.container]}>
      <View style={styles.gallery_wrap}>
      {orders[0] ?
          orders.map((item,i) => {
            return <TouchableOpacity style={{position:'relative',backgroundColor:colors.beige}} key={i} onPress={()=> {setIndexImgGallery(i)}}>
                  <Image  source={{uri:item.afterImg}} style={styles.gallery_img}/>
                </TouchableOpacity>
        })
      :<Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
          Пока здесь ничего нет
        </Text>}
        </View>
    </ScrollView>
  )
}

export default GalleryMiniForModerator
