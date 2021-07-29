import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {styles} from './Style'

export function FormInput(props) {
  return (
    <View >
      {props.label != ''
          ? <Text style={props.styleLabel}>{props.label}</Text>
          : null}
      <View style={{position:'relative'}}>
        <TextInput
        style={[...props.styleInput,props.error ? styles.incorrectValueInput : null]}
          {...props.options}
        />
      </View>
      {props.error && (
        <Text style={[styles.all,styles.incorrectValue]}>{props.errorText}</Text>
      )}
    </View>
  );
}
