import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../../components/Style'
import { WebView } from 'react-native-webview';

 const HowToBeginEarn = ({user,navigation,allVisibleImgInGallery}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <View style={styles.sizeVideoYouTube}>
            <WebView
              javaScriptEnabled={true}
              originWhitelist={['*']}
              source={{html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/i1dNQpOtekM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}}
            />
          </View>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>1. </Text>
            Войти и зарегистрироваться как исполнитель
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>2. </Text>
            Заполнить анкету и пройти тест на уровень навыков обработки фото, сразу же после регистрации
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>3. </Text>
            В течение 24 часов дождаться подтверждения анкеты от модератора
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>4. </Text>
            Как только страница активируется, откроется полный доступ к панели
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>5. </Text>
            Если тест не пройден, это не повод расстраиваться, ведь Вы можете пройти обучение на наших онлайн курсах и получить доступ к заказам после его прохождения автоматически. Либо попробовать пройти тест через 7 дней повторно
          </Text>
        </View>
      </ScrollView>
    );
};

HowToBeginEarn.navigationOptions = {
    title: 'HowToBeginEarn'
};

export default HowToBeginEarn
