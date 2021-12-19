import React, { useState } from "react";
import {View} from "react-native";
import {styles,colors,fontSizeMain} from './Style'
import BouncyCheckbox from "./checkBox/BouncyCheckbox";
import {Button} from './Button'
import {connect} from 'react-redux'

export const Parameters = (props) => {
  const [parameters,setParameters] = useState(props.state)
  const [countParam,setCountParam] = useState(0)
  const postParameters = () => {
    props.sendParam(parameters,props.type)
  }
  const selectParameter = (item) => {
    let paramObj = Object.assign(parameters)
    if(paramObj[item]) {
      delete paramObj[item]
      setParameters(paramObj)
      setCountParam(countParam-1)
    }
    else {
      paramObj[item] = props.parameters[item]
      setParameters(paramObj)
      setCountParam(countParam+1)
    }
    console.log(paramObj)
  }
  return(
    <View style={[styles.bodyOrFaceWindow,styles.p_fsm]}>
      {Object.keys(props.parameters).map((item,i) => {
        return (<BouncyCheckbox
          disableBuiltInState
          isChecked = {parameters[item]}
          size={fontSizeMain*1.5}
          fillColor={colors.red}
          unfillColor={colors.darkBeige}
          text={item}
          key={i}
          style={{marginBottom:fontSizeMain}}
          iconStyle={{ borderColor: colors.red }}
          textStyle={[styles.all,styles.bold]}
          onPress={(isChecked) => selectParameter(item)}/>)
      })}
      <Button title='Продолжить' onPress={()=>{postParameters()}}/>
    </View>
  )
}
