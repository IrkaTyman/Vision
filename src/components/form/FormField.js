import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {styles} from '../Style'

const FormField = (props) => {
  return (
    <View>
      {props.label != ''
          ? <Text style={props.styleLabel}>{props.label}</Text>
          : null}
      <TextInput
        style={props.styleInput}
        placeholder={props.placeholder}
        onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
        {...props.textInputProps}
      />
    </View>
  )
}

export default FormField;
