import firebase from 'firebase/app'
import 'firebase/database'
import {addNowOrder,addOldOrders,changeCountImgInGallery} from '../redux/action'

export function reloadOrders(ordersArr,dispatch,user){
  let nowOrder = {}
  let oldOrders = []
  let visibleOldOrderImg = {}
  if(ordersArr){
    ordersArr.map((item) => {
      firebase.database().ref('orders/'+item).get().then((snap)=>{
        if(snap.exists()){
          if (snap.val().status == 'inComplete' || (snap.val().status == 'inRating' && user.status =='designer')){
            if(user.status == 'designer'){
              if(snap.val().visiblePhotodesigner){
                visibleOldOrderImg[oldOrders.length] = snap.val().afterImg
              }
            } else if(snap.val().visiblePhotoclient){
                visibleOldOrderImg[oldOrders.length] = snap.val().afterImg
              }
              oldOrders.push(snap.val())
            } else nowOrder[snap.val().id] = snap.val()
          }
            if(item == ordersArr[ordersArr.length-1]){
            dispatch(addNowOrder(nowOrder))
            dispatch(addOldOrders(oldOrders))
            dispatch(changeCountImgInGallery(visibleOldOrderImg))
          }
        })
    })}
}
