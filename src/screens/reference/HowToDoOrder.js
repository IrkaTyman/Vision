import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {Button} from '../../components/Button'
import {styles,fontSizeMain,SCREEN_WIDTH} from '../../components/Style'
import { WebView } from 'react-native-webview';

 const HowToDoOrder = ({user,navigation,allVisibleImgInGallery}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper]}>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>1. Войти или зарегистрироваться</Text>
          <Text style={[styles.all,styles.p]}>
            Оформить заказ можно только в личном кабинете на сайте «FotoU».
            Войдите или зарегистрируйтесь любым удобным для Вас способом.
            При регистрации необходимо подтвердить адрес электронной почты.
            Для новых пользователей сервиса <Text style={[styles.boldest,styles.redColor]}>60 виженов в подарок!</Text>
          </Text>
        </View>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>2. Попадаем на страницу "Мой Профиль"</Text>
          <Text style={[styles.all,styles.p]}>
            Авторизовавшись на сайте Вы попадаете на страничку своего профиля.
            Отсюда необходимо нажать кнопку <Text style={[styles.boldest,styles.redColor]}>«Создать новый заказ»</Text> и выбрать нужные параметры.
          </Text>
        </View>
        <View style={[styles.profileBlock,styles.p_fsm]}>
          <Text style={[styles.all,styles.h3,styles.redColor,styles.bold]}>3. Выбираем необходимые параметры обработки</Text>
          <Text style={[styles.all,styles.p]}>
            В зависимости от того, что Вы хотите получить в конечном результате, выберите необходимые параметры обработки Вашего фото, либо напишите задание для исполнителя на свое усмотрение.
          </Text>
          <Text style={[styles.all,styles.p]}>
            Более подробно ознакомиться с возможными направлениями ретуширования на сервисе «PhotoU» можно тут.
          </Text>
          <Text style={[styles.all,styles.p]}>
            Если Вы ещё не являетесь пользователем нашего сервиса, Мы дарим Вам возможность обработать одну фотографию профессиональным ретушёром совершено <Text style={[styles.boldest,styles.redColor]}>БЕСПЛАТНО!</Text>
          </Text>
          <Button title='Попробовать бесплатно' onPress={() => navigation.reset({index: 0,routes: [{ name: 'NewOrder' }]})}/>
        </View>
      </ScrollView>
    );
};

HowToDoOrder.navigationOptions = {
    title: 'HowToDoOrder'
};

export default HowToDoOrder
