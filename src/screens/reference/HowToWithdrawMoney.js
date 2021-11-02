import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../../components/Style'
import { WebView } from 'react-native-webview';

 const HowToWithdrawMoney = ({user,navigation,allVisibleImgInGallery}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <View style={styles.sizeVideoYouTube}>
            <WebView
              javaScriptEnabled={true}
              originWhitelist={['*']}
              source={{html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/xUEy5ubxcjY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}}
            />
          </View>
          <Text style={[styles.all,styles.p]}>
            Внутри сервиса мы пользуемся внутренней валютой – вижен, 1 вижен = 1 рублю. Выполняя заказы, Вы получаете вижены, которые сможете вывести через наш сервис на свою карту.
          </Text>
          <Text style={[styles.all,styles.p]}>
            Для этого перейдите в «Мой баланс» и заполните форму вывода средств. Минимальная сумма для вывода 1000 рублей. Вижены спишутся в момент подачи заявки.
          </Text>
          <Text style={[styles.all,styles.p]}>
            Выплаты производятся на указанную Вами карту каждый четверг до 20:00 по МСК.
          </Text>
        </View>
      </ScrollView>
    );
};

HowToWithdrawMoney.navigationOptions = {
    title: 'HowToWorkPanel'
};

export default HowToWithdrawMoney
