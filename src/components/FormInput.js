import React,{useState} from 'react';
import { View, Text, TextInput,Pressable } from 'react-native';
import {styles,fontSizeMain,colors} from './Style'
import { Feather } from '@expo/vector-icons';

export function FormInput(props) {
  const [secure,setSecure] = useState(props.secure)
  const toggleSecure = () =>{

  }
  return (
    <View style={{position:'relative'}}>
      {props.label != ''
          ? <Text style={props.styleLabel}>{props.label}</Text>
          : null}
      <View style={{position:'relative'}}>
        <TextInput
        style={[...props.styleInput,props.error ? styles.incorrectValueInput : '']}
          {...props.options}
          secureTextEntry = {secure}
        />
        {props.secure ?
        <Pressable onPress={()=> setSecure(!secure)} style={styles.secureEyeWrap}>
          <Feather name={`eye${!secure ? '-off' : ''}`} size={fontSizeMain*1.3} color='#000' style={styles.secureEye}/>
        </Pressable> : null}
      </View>
      {props.error && (
        <Text style={[styles.all,styles.incorrectValue]}>{props.errorText}</Text>
      )}
    </View>
  );
}
