import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../../components/Style'
import { WebView } from 'react-native-webview';

 const HowToWorkPanel = ({user,navigation,allVisibleImgInGallery}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <View style={styles.sizeVideoYouTube}>
            <WebView
              javaScriptEnabled={true}
              originWhitelist={['*']}
              source={{html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/DGzqMt4JKOg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}}
            />
          </View>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>1. </Text>
            Как только Вы получаете полный доступ к панели, Вы можете начать выполнять заказы. Для этого нужно нажать кнопку «+Новый заказ»
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>2. </Text>
            После этого Вы автоматически переходите в окно заказа, где подробно описаны параметры обработки для данного фото и время, отведенное на выполнение данного заказа
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>3. </Text>
            Скачиваете фото, обрабатываете в соответствии с заданием, загружаете и нажимаете «Готово»!
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>4. </Text>
            Пока у Вас есть текущий заказ, Вы не сможете взять следующий
          </Text>
          <Text style={[styles.all,styles.p]}>
            <Text style={[styles.redColor,styles.h3,styles.bold]}>5. </Text>
            В случае, если заказ был срочный, но Вы не успеваете его выполнить, ничего страшного, просто продолжайте работу, но постарайтесь выполнить её в ближайшее время насколько это возможно
          </Text>
        </View>
      </ScrollView>
    );
};

HowToWorkPanel.navigationOptions = {
    title: 'HowToWorkPanel'
};

export default HowToWorkPanel
