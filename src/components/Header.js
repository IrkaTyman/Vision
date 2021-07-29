import React from 'react';
import {Text, View,Image,Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import {connect} from 'react-redux'

import {styles} from './Style'

const Header = (props) => {
  const openMenu = () => {
    props.nav.openDrawer();
  }


  return(
    <View style = {styles.header}>
      <Pressable
        onPress={openMenu}
        hitSlop={100}>
        <MaterialIcons name="menu" size={28}  style={styles.whiteColor}/>
      </Pressable>
      <View>
        <Text style={[styles.all,styles.headerText,styles.whiteColor]}>{props.title}</Text>
      </View>
      <Pressable onPress={() => props.nav.navigate('Edit')}>
      <View style={styles.header_avatarDiv}>
        <Image
          source={{uri:props.user.img}}
          style={[styles.headerAvaImg,styles.avaImg]}/>
      </View>
      </Pressable>
    </View>
  )
}

let mapStoreToProps = (store) => ({
  user:store.register.user
})

export default connect(mapStoreToProps)(Header)
