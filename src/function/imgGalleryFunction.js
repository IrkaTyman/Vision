import firebase from 'firebase'
import {addOldOrders,changeCountImgInGallery} from '../redux/action'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import {Share} from 'react-native';

export const deleteImgGallery = (dispatch, arrImg, oldOrders,allVisibleImgInGallery, setLongPress) => {
  let allVisibleImg = allVisibleImgInGallery
  arrImg.map((item,i) => {
    oldOrders[item].visiblePhoto = false
    delete allVisibleImg[item]
    firebase.database().ref(`orders/${oldOrders[item].id-1}/`).update({visiblePhoto:false})
  })
  console.log(arrImg,allVisibleImg)
  dispatch(addOldOrders(oldOrders))
  dispatch(changeCountImgInGallery(allVisibleImg))
  setLongPress()
}

const saveFile = async (fileUri: string) => {
  const asset = await MediaLibrary.createAssetAsync(fileUri)
  await MediaLibrary.createAlbumAsync("Fotou", asset, false)
}

export const downloadImg = (uri,indexImgGallery) => {
  const fileUri = FileSystem.documentDirectory + `${indexImgGallery}-1.jpg`;
  FileSystem.downloadAsync(uri, fileUri)
  .then(({ uri }) => {

      saveFile(uri);
    })
    .catch(error => {
      console.error(error);
    })
}

export const shareImg = async (text) => {
  try {
    const result = await Share.share({
      message:text
    });
    if (result.action === Share.sharedAction) {
      console.log('cool')
    } else if (result.action === Share.dismissedAction) {
      console.log('not cool')
    }
  } catch (error) {
    alert(error.message);
  }
}
