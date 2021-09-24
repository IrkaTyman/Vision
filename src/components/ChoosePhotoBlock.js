import React, { useEffect } from "react";
import { Pressable, Text,View,Platform } from "react-native";
import {styles,colors, fontSizeMain} from './Style'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export const ChoosePhotoBlock = ({handler,style,status}) => {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    handler(result)
  }

  return(
    <Pressable
        onPress={()=>{
          !status || status=='designer' ? pickImage() : null
        }}
        style={[styles.newOrderPicker,...style]}
     >
      <View style={{flexDirection:'row',alignItems:'center'}}>
        {!status || status == 'designer'
          ? <Ionicons name="camera-outline" size={30} color={colors.red} style={{marginRight:fontSizeMain*0.6}}/>
          : null}
        <Text style={[styles.all, styles.redColor,styles.bold]}>{!status || status == 'designer' ? 'Выберете фото' : 'Обрабатывается'}</Text>
      </View>
    </Pressable>
  )
}
