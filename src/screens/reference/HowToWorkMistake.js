import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../../components/Style'
import { WebView } from 'react-native-webview';

 const HowToWorkMistake = ({user,navigation,allVisibleImgInGallery}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <View style={styles.sizeVideoYouTube}>
            <WebView
              javaScriptEnabled={true}
              originWhitelist={['*']}
              source={{html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/hJ_i6RLMAbA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}}
            />
          </View>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>1. </Text>
            Если заказчику не понравилась выполненная работа, она <Text style={[styles.boldest,styles.redColor]}>отправляется на проверку</Text> к модератору и в случае выявления брака возвращается <Text style={[styles.boldest,styles.redColor]}>на доработку</Text>. Вы получите <Text style={[styles.boldest,styles.redColor]}>уведомление</Text> об этом.
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>2. </Text>
            Откройте заказы <Text style={[styles.boldest,styles.redColor]}>«Возврат»</Text> и прочтите комментарий пользователя, который появится в окне заказа. Переделайте работу в соответствии с просьбой заказчика, загрузите новое фото и нажмите кнопку <Text style={[styles.boldest,styles.redColor]}>«Готово»</Text>.
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>3. </Text>
            Затем можете приступать к следующим заказам.
          </Text>
        </View>
      </ScrollView>
    );
};

HowToWorkMistake.navigationOptions = {
    title: 'HowToWorkMistake'
};

export default HowToWorkMistake
