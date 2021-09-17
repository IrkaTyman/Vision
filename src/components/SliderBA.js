import React, { Component,useState } from "react";
import { Pressable, Text, Image, View } from "react-native";
import {styles,fontSizeMain,colors} from './Style'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

export const SliderBA = ({height,photo,userStatus,userId}) => {
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
      <View style={[styles.sliderBAStage,index == 1 ? {right:0} : null]}>
        <Text style={[styles.all,styles.whiteColor]}>{index==0 ? 'До' : 'После'}</Text>
      </View>
      <Pressable
        hitSlop={100}
        onPress={toLeafToTheRight}
        style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#C55454'
                : '#D07070',
                left:-0.5*fontSizeMain,
                top:height/2 - fontSizeMain
            },styles.sliderBAArrow]}
      >
        <AntDesign name={'left'} size={fontSizeMain} color="#fff" />
      </Pressable>
      {photo[index]
        ? <Image source={{uri:photo[index]}} style={[styles.sliderBAPhoto,{height:height}]}/>
        : <Pressable
            onPress={()=>{}}
            style={[styles.newOrderPicker,styles.sliderBAPhoto,{height:height}]}
         >
          <View style={{flexDirection:'row',alignItems:'center'}}>
            {userStatus == 'designer'
              ? <Ionicons name="camera-outline" size={30} color={colors.red} style={{marginRight:fontSizeMain*0.6}}/>
              : null}
            <Text style={[styles.all, styles.redColor,styles.bold]}>{userStatus == 'designer' ? 'Выберете фото' : 'Обрабатывается'}</Text>
          </View>
        </Pressable>
        }

      <Pressable
        hitSlop={100}
        onPress={toLeafToTheRight}
        style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#C55454'
                : '#D07070',
              right:-0.5*fontSizeMain,
              top:height/2 - fontSizeMain
            },styles.sliderBAArrow]}
      >
        <AntDesign name={'right'} size={fontSizeMain} color="#fff" />
      </Pressable>
      {photo[index]
        ? <Pressable
            hitSlop={100}
            onPress={() => downloadFile(photo[index])}
            style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? '#C55454'
                    : '#D07070',
                  right:-0.5*fontSizeMain,
                  bottom:-0.5*fontSizeMain
                },styles.sliderBAArrow]}
          >
            <Ionicons name="ios-download-outline" size={fontSizeMain*1.16} color="#fff" />
          </Pressable>
        : null}
    </View>
  )
}
