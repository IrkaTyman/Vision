import React, { Component,useState } from "react";
import { Pressable, Text, Image, View } from "react-native";
import {styles,fontSizeMain,colors,sliderBAWidth} from './Style'
import { Ionicons,AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import {ChoosePhotoBlock} from './ChoosePhotoBlock'

export const SliderBA = ({moderator,orderStatus,handlerDelete,handler,height,photo,userStatus,userId}) => {
  const [index,setIndex] = useState(0);
  const toLeafToTheRight = () => {
    setIndex((index+1)%2)
  }
  const downloadFile = (uri) => {
    const fileUri = FileSystem.documentDirectory + `${userId}-${index}.jpg`;
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })
  }
  const saveFile = async (fileUri: string) => {
    const asset = await MediaLibrary.createAssetAsync(fileUri)
    await MediaLibrary.createAlbumAsync("Fotou", asset, false)
  }
  return(
    <View style={styles.sliderBAContainer}>
      <View style={[styles.sliderBAStage,styles.ai_c,styles.jc_c,index == 1 ? {right:0} : null]}>
        <Text style={[styles.all,styles.whiteColor]}>{index==0 ? 'До' : 'После'}</Text>
      </View>
      <Pressable
        hitSlop={24}
        onPress={toLeafToTheRight}
        style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#C55454'
                : '#D07070',
                left:-0.5*fontSizeMain,
                top:height*sliderBAWidth/2 - fontSizeMain
            },styles.sliderBAArrow,styles.ai_c,styles.jc_c]}
      >
        <AntDesign name={'left'} size={fontSizeMain} color="#fff" />
      </Pressable>
      {photo[index]
        ? <Image source={{uri:photo[index]}} style={[styles.sliderBAPhoto,{height:height*sliderBAWidth}]}/>
        : <ChoosePhotoBlock
                handler={handler}
                moderator={moderator}
                status={userStatus}
                style={[styles.sliderBAPhoto,{height:height*sliderBAWidth}]}/>
        }

      <Pressable
        hitSlop={24}
        onPress={toLeafToTheRight}
        style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#C55454'
                : '#D07070',
              right:-0.5*fontSizeMain,
              top:height*sliderBAWidth/2 - fontSizeMain
            },styles.sliderBAArrow,styles.ai_c,styles.jc_c]}
      >
        <AntDesign name={'right'} size={fontSizeMain} color="#fff" />
      </Pressable>
      {photo[index]
        ? <Pressable
            hitSlop={24}
            onPress={() => downloadFile(photo[index])}
            style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? '#C55454'
                    : '#D07070',
                  right:-0.5*fontSizeMain,
                  bottom:-0.5*fontSizeMain
                },styles.sliderBAArrow,styles.ai_c,styles.jc_c]}
          >
            <Ionicons name="ios-download-outline" size={fontSizeMain*1.16} color="#fff" />
          </Pressable>
        : null}
      {index == 1 && photo[index] && userStatus == 'designer' && orderStatus == 'inWork' && !moderator
        ? <Pressable
            hitSlop={24}
            onPress={handlerDelete}
            style={({ pressed }) => [styles.sliderBAArrow,
                {
                  backgroundColor: pressed
                    ? '#C55454'
                    : '#D07070',
                  left:-0.5*fontSizeMain,
                  bottom:-0.5*fontSizeMain,
                  width:'40%'
                },styles.ai_c,styles.jc_c]}
          >
          <Text style={[styles.whiteColor,styles.all]}>Удалить</Text>
          </Pressable>
        : null}
    </View>
  )
}
