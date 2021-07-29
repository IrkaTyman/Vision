import React from 'react';
import {Image, Text, View, ScrollView,Pressable,Dimensions} from 'react-native';
import {Button} from '../components/Button'
import {styles} from '../components/Style'
import {ENTRIES1} from '../components/static/entries'

const OldPhoto = (props) => {
    const getHeight = (item) => {
      const {width}=Dimensions.get('window')
      return item.height*item.width/width
    }
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={styles.profileBlock}>
          {ENTRIES1.map((item,key) =>
            <Pressable onPress={()=>{}} key={key}>
              <Image
                source={{ uri: item.illustration }}
                style={[styles.oldImageItem,{height:getHeight(item)}]}
              />
            </Pressable>
          )}
        </View>
      </ScrollView>
    );
};

OldPhoto.navigationOptions = {
    title: 'OldPhoto'
};
export default OldPhoto
