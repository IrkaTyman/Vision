import React,{useState,useEffect} from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../../components/Style'
import { WebView } from 'react-native-webview';

 const HowToPayOrder = ({user,navigation,allVisibleImgInGallery}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <View style={styles.sizeVideoYouTube}>
            <WebView
              javaScriptEnabled={true}
              originWhitelist={['*']}
              source={{html: `<iframe width='100%' height='100%' src="https://www.youtube.com/embed/3Wq1SqcAlyc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}}
            />
          </View>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.boldest,styles.redColor]}>Баланс</Text>
             → в поле
            <Text style={[styles.boldest,styles.redColor]}> пополнить баланс </Text>
            заполняем нужную сумму → нажимаем
            <Text style={[styles.boldest,styles.redColor]}>купить</Text>
             → переходим в крупнейшую по России систему платежей
             <Text style={[styles.boldest,styles.redColor]}>PayKeeper </Text>
              → <Text style={[styles.boldest,styles.redColor]}>оплачиваем </Text>
               выбранным способом.
          </Text>
          <Text style={[styles.all,styles.p]}>Гарантия безопасность от надежного партнера - PayKeeper</Text>
          <View style={[styles.fd_r, styles.ai_c,styles.jc_c]}>
            <Image style={styles.logoOfBanks} source={require('../../../assets/mastercard.png')}/>
            <Image style={styles.logoOfBanks} source={require('../../../assets/visa.png')}/>
            <Image style={styles.logoOfBanks} source={require('../../../assets/paykeeper.png')}/>
          </View>
        </View>
      </ScrollView>
    );
};

HowToPayOrder.navigationOptions = {
    title: 'HowToPayOrder'
};

export default HowToPayOrder
