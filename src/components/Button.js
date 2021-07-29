import React, { Component } from "react";
import { Pressable, Text } from "react-native";
import {styles} from './Style'

export const Button = (props) => {
  return(
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#C55454'
              : '#D07070'
          },styles.button]}
    >
        <Text style={[styles.whiteColor,styles.all]}>{props.title}</Text>
    </Pressable>
  )
}
