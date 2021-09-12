import React, { Component } from "react";
import { Pressable, Text, View} from "react-native";
import {styles,colors,fontSizeMain} from '../Style'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Button} from '../Button'
import {connect} from 'react-redux'

export const Parameters = (props) => {
  const paramObj = {}
  const postParameters = () => {
    const paramKeys = Object.keys(paramObj)
    const paramGot = {}
      for (let i = 0; i < paramKeys.length; i++){
        if(paramObj[paramKeys[i]] == true){
          paramGot[`${paramKeys[i]}`] = props.parameters[`${paramKeys[i]}`]
        }
      }
      props.sendParam(paramGot)
  }
  return(
    <View style={styles.bodyOrFaceWindow}>
      {Object.keys(props.parameters).map((item,id) => {
        return (<BouncyCheckbox
          size={fontSizeMain*1.5}
          fillColor={colors.red}
          unfillColor={colors.darkBeige}
          text={item}
          key={id}
          style={{marginBottom:fontSizeMain}}
          iconStyle={{ borderColor: colors.red }}
          textStyle={[styles.all,styles.bold]}
          onPress={(isChecked) => {paramObj[`${item}`]=isChecked}}/>)
      })}
      <Button title='Продолжить' onPress={()=>{postParameters()}}/>
    </View>
  )
}
