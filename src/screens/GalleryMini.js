import React,{useState,useEffect} from 'react';
import {Text,View,ScrollView,Image,TouchableOpacity,Pressable,Share} from 'react-native';
import {Ionicons,AntDesign} from '@expo/vector-icons'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain,colors} from '../components/Style'
import {changeIndexImgGallery,changeCountImgInGallery} from '../redux/action'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {deleteImgGallery,downloadImg, shareImg} from '../function/imgGalleryFunction'

const GalleryMini = (props) => {
  const dispatch = useDispatch()
  const [state,setState] = useState(0)
  const [imgLongPress,setImgLongPress] = useState({})
  const [longPress,setLongPress] = useState(false)

  const setIndexImgGallery = (page) => {
    dispatch(changeIndexImgGallery(page))
    props.navigation.navigate('GalleryBig',{setState,state,deleteAdd:deleteImgExtra})
  }
  const setImgPress = (img,i) => {
    const arrImg = imgLongPress
    if (arrImg[i]) {
      arrImg[i]
    }
    else arrImg[i] = img
    setImgLongPress(arrImg)
    if (Object.keys(arrImg).length == 0) setLongPress(false)
  }
  const shareImgGallery = async () => {
    let arrLink = []
    Object.keys(imgLongPress).map((item,i) => {
      arrLink.push(`${i+1}. ${props.oldOrders[item].afterImg}`)
    })
    arrLink.push('Сделано в Photou с любовью\u2764')
    let text = arrLink.join('\n')
    shareImg(text)
  }
  const downloadImgGallery = () => {
    Object.keys(imgLongPress).map((item,i) => {
      downloadImg(imgLongPress[item],props.oldOrders[item].id)
    })
  }
  function deleteImgExtra(){
    props.route.params.setState(!props.route.params.state)
    setLongPress(false)
  }
  return(
    <ScrollView style={[styles.container]}>
      {longPress
        ? <View style={[styles.fd_r,styles.ai_c,styles.p_fsm,styles.photoActionsWrap]}>
            <Pressable style = {[styles.ai_c]}
                onPress={downloadImgGallery}>
              <Ionicons name="ios-download-outline" size={fontSizeMain*1.2} color={colors.red} />
              <Text style={[styles.all,styles.bold,styles.redColor,styles.photoActionsText]}>Скачать</Text>
            </Pressable>
            <Pressable style = {[styles.ai_c]}
                onPress={shareImgGallery}>
              <Ionicons name="cloud-upload-outline" size={fontSizeMain*1.2} color={colors.red} />
              <Text style={[styles.all,styles.bold,styles.redColor,styles.photoActionsText]}>Отправить</Text>
            </Pressable>
            <Pressable style = {[styles.ai_c]}
                onPress={()=>deleteImgGallery(dispatch,Object.keys(imgLongPress),props.oldOrders,props.allVisibleImgInGallery,deleteImgExtra)}>
              <AntDesign name="delete" size={fontSizeMain*1.1} color={colors.red}/>
              <Text style={[styles.all,styles.bold,styles.redColor,styles.photoActionsText]}>Удалить</Text>
            </Pressable>
          </View> : null}
      <View style={styles.gallery_wrap}>
      {Object.keys(props.allVisibleImgInGallery)[0] ?
          Object.keys(props.allVisibleImgInGallery).map((item,i) => {
            return <TouchableOpacity onLongPress={() => {
              setLongPress(true)
            }} style={{position:'relative',backgroundColor:colors.beige}} key={i} onPress={()=> !longPress ? setIndexImgGallery(i) : null}>
                  {longPress
                    ? <BouncyCheckbox
                    disableText
                    size={fontSizeMain*1.5}
                    fillColor={colors.red}
                    style={styles.gallery_img__check}
                    iconStyle={{ borderColor: colors.red }}
                    textStyle={[styles.all,styles.bold]}
                    onPress={() => {setImgPress(props.allVisibleImgInGallery[item],item)}}/>
                    : null}
                  <Image  source={{uri:props.allVisibleImgInGallery[item]}} style={styles.gallery_img}/>
                </TouchableOpacity>
        })
      :<Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
          Пока здесь ничего нет
        </Text>}
        </View>
    </ScrollView>
  )
}

let mapStoreToProps = (store) => ({
  allVisibleImgInGallery:store.register.allVisibleImgInGallery,
  oldOrders:store.register.oldOrders
})

export default connect(mapStoreToProps)(GalleryMini)
