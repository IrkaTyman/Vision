import React, { Component } from "react";
import { Text, TextInput } from "react-native";
import {styles} from './Style'

export const Input = (props) => {
    return(
    <TextInput style={styles.input} placeholder={props.placeholder} onChangeText = {text => props.onChangeText(text)} underlineColorAndroid/>
  );
}
