import React, { Component,useState } from "react";
import { Pressable, Text, Image, View } from "react-native";
import {styles,fontSizeMain} from './Style'
import { AntDesign } from '@expo/vector-icons';

export const SliderBA = ({height,photo}) => {
  const [index,setIndex] = useState(0);

  const toLeafToTheRight = () => {
    setIndex((index+1)%2)
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
      <Image source={{uri:photo[index]}} style={[styles.sliderBAPhoto,{height:height}]}/>
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
    </View>
  )
}
