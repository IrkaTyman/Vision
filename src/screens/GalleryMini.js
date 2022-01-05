import React,{useState,useEffect} from 'react';
import {Text,View,ScrollView,Image,TouchableOpacity,Pressable,Share} from 'react-native';
import {Ionicons,AntDesign} from '@expo/vector-icons'
import {connect,useDispatch} from 'react-redux'
import {styles,fontSizeMain,colors} from '../components/Style'
import {changeIndexImgGallery,changeCountImgInGallery} from '../redux/action'
import BouncyCheckbox from "../components/checkBox/BouncyCheckbox";
import {deleteImgGallery,downloadImg, shareImg} from '../function/imgGalleryFunction'

const GalleryMini = (props) => {
  const dispatch = useDispatch()
  const [state,setState] = useState(0)
  const [boolLongPress,setBoolLongPress] = useState(false)
  const [countCheckPhoto,setCountCheckPhoto] = useState(0)
  const [imgLongPress,setImgLongPress] = useState(()=> {
    let state = createObjImgLongPress()
    return state})
  function createObjImgLongPress(){
    const arrImg = {}
    Object.keys(props.allVisibleImgInGallery).map((item,i)=>{
      arrImg[item] = {img: props.allVisibleImgInGallery[item], bool:false}
    })
    return arrImg
  }
  const setIndexImgGallery = (page) => {
    dispatch(changeIndexImgGallery(page))
    props.navigation.navigate('GalleryBig',{setState,state,deleteAdd:deleteImgExtra})
  }

  const setImgAll = () => {
    const arrImg = imgLongPress
    let count = 0
    Object.keys(props.allVisibleImgInGallery).map((item,i) => {
      count += 1
      arrImg[item] = {img:props.allVisibleImgInGallery[item],bool:true}
    })
    setImgLongPress(arrImg)
    setCountCheckPhoto(count)
  }

  const clearImgAll = () => {
    const arrImg = imgLongPress
    Object.keys(arrImg).map((item,i) => {
      arrImg[item].bool = false
    })
    setImgLongPress(arrImg)
    setCountCheckPhoto(0)
    setBoolLongPress(false)
  }

  const setImgPress = (i) => {
    const arrImg = Object.assign({}, imgLongPress)
    if (arrImg[i].bool) {
      arrImg[i].bool= false
    }
    else {
      arrImg[i].bool = true
    }
    setImgLongPress(arrImg)
    let countCheck = countCheckPhoto
    if(arrImg[i].bool) countCheck+=1
    else countCheck-=1
    if (countCheck == 0) setBoolLongPress(false)
    setCountCheckPhoto(countCheck)
  }

  const shareImgGallery = async () => {
    let arrLink = []
    Object.keys(imgLongPress).map((item,i) => {
      arrLink.push(`${i+1}. ${imgLongPress[item].img}`)
    })
    arrLink.push('Сделано в Photou с любовью\u2764')
    let text = arrLink.join('\n')
    shareImg(text)
    setBoolLongPress(false)
    setImgLongPress({})
  }

  const downloadImgGallery = () => {
    Object.keys(imgLongPress).map((item,i) => {
      downloadImg(imgLongPress[item],item)
    })
    setBoolLongPress(false)
    setImgLongPress({})
  }

  function deleteImgExtra(){
    //props.route.params.setState(!props.route.params.state)
    setBoolLongPress(false)
    setImgLongPress({})
  }
  function renderElement(item,i){

  }

  let [bool,setBool] = useState(false)
  //<Text style={[styles.all,styles.bold,styles.redColor,styles.photoActionsText]}>Выбрать все</Text>
  return(
    <ScrollView style={[styles.container]}>
      {boolLongPress
        ? <View style={[styles.fd_r,styles.ai_c,styles.p_fsm,styles.photoActionsWrap]}>
            <Pressable style = {[styles.ai_c, styles.gallery_icon_panel,styles.jc_c,styles.ai_c]}
                onPress={downloadImgGallery}>
              <Ionicons name="ios-download-outline" size={fontSizeMain*1.2} color={'#fff'} />
            </Pressable>
            <Pressable style = {[styles.ai_c, styles.gallery_icon_panel,styles.jc_c,styles.ai_c]}
                onPress={shareImgGallery}>
              <Ionicons name="cloud-upload-outline" size={fontSizeMain*1.2} color={'#fff'} />
            </Pressable>
            <Pressable style = {[styles.ai_c, styles.gallery_icon_panel,styles.jc_c,styles.ai_c]}
                onPress={()=>deleteImgGallery(dispatch,Object.keys(imgLongPress),props.oldOrders,props.allVisibleImgInGallery,deleteImgExtra,props.user.status)}>

              <AntDesign name="delete" size={fontSizeMain*1.1} color={'#fff'}/>
            </Pressable>
            <Pressable style = {[styles.ai_c, styles.gallery_icon_panel,styles.jc_c,styles.ai_c]}
                onPress={setImgAll}>
              <AntDesign name="check" size={fontSizeMain*1.1} color={'#fff'} />
            </Pressable>
            <Pressable style = {[styles.ai_c, styles.gallery_icon_panel,styles.jc_c,styles.ai_c]}
                onPress={clearImgAll}>
              <AntDesign name="close" size={fontSizeMain*1.1} color={'#fff'} />
            </Pressable>
          </View> : null}
      <View style={styles.gallery_wrap}>
      {Object.keys(props.allVisibleImgInGallery)[0] ?
          Object.keys(props.allVisibleImgInGallery).map((item,i) => {
            return <TouchableOpacity onLongPress={() => {
              setImgPress(item)
              setBoolLongPress(true)
            }} style={{position:'relative',backgroundColor:colors.beige}} key={i} onPress={()=> {
              if(!boolLongPress) {
                setIndexImgGallery(i)
                clearImgAll()
              } else setImgPress(item)}}>
                  {boolLongPress
                    ? <BouncyCheckbox
                    disableText
                    disableBuiltInState
                    isChecked = {imgLongPress[item].bool}
                    size={fontSizeMain*1.5}
                    fillColor={colors.red}
                    style={styles.gallery_img__check}
                    iconStyle={{ borderColor: colors.red }}
                    textStyle={[styles.all,styles.bold]}
                    onPress={() => {setImgPress(item)}}/>
                    : null}
                  <Image  source={{uri:props.allVisibleImgInGallery[item]}} style={styles.gallery_img}/>
                </TouchableOpacity>
        })
      :<View style={[styles.notOrder,styles.flex,styles.ai_c,styles.jc_c]}>
        <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
          Пока здесь ничего нет
        </Text>
      </View>}
        </View>
    </ScrollView>
  )
}

let mapStoreToProps = (store) => ({
  user:store.register.user,
  allVisibleImgInGallery:store.register.allVisibleImgInGallery,
  oldOrders:store.register.oldOrders
})

export default connect(mapStoreToProps)(GalleryMini)
