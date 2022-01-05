import firebase from 'firebase/app';
import { Expo } from 'expo-server-sdk';

export const sendPushNotifications = (pushToken,tokenType) => {
  const expoPushMessages = []
  switch (tokenType){
    case 'inComplete':
      expoPushMessages.push({
        body:'Перейдите в приложение, чтобы увидеть оценку',
        title:'Вашу работу оценили!',
        to: pushToken
      });
      break;
    case 'inRating':
      expoPushMessages.push({
        body:'Перейдите в приложение, чтобы оценить результат',
        title:'Ваш заказ был выполнен!',
        to: pushToken
      });
      break;
    case 'inWork':
      expoPushMessages.push({
        body:'Он будет выполнен в течении указанного вами времени',
        title:'Ваш заказ взят в работу',
        to: pushToken
      });
      break;
    default:
      expoPushMessages.push({
        body:'Ага',
        title:'Тест',
        to: pushToken
      });
      break;
  }

  const expo = new Expo();
  return expo.sendPushNotificationsAsync(expoPushMessages);
}
