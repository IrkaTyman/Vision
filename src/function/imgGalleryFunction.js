import firebase from 'firebase/app'
import 'firebase/database'
import {addOldOrders,changeCountImgInGallery} from '../redux/action'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import {Share} from 'react-native';

export const deleteImgGallery = (dispatch, arrImg, oldOrders,allVisibleImgInGallery, setLongPress,userStatus) => {
  let allVisibleImg = allVisibleImgInGallery
  arrImg.map((item,i) => {
    oldOrders[item][`visiblePhoto${userStatus}`] = false
    delete allVisibleImg[item]
    firebase.database().ref(`orders/${oldOrders[item].id}/`).update({[`visiblePhoto${userStatus}`]:false})
  })
  dispatch(addOldOrders(oldOrders))
  dispatch(changeCountImgInGallery(allVisibleImg))
  setLongPress(false)
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
  } catch (error) {
    alert(error.message);
  }}
