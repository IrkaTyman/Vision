import React, { Component} from "react";
import { View,Image, TouchableOpacity, Text, Platform,LayoutAnimation,UIManager} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors,SCREEN_WIDTH} from './Style';
import {SliderBA} from '../components/SliderBA'
import {currencySpelling} from '../function/currencySpelling'
import {getNormalDate} from '../function/getNormalDate'
import {localeStatusOrder} from '../function/localeStatusOrder'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

const OrderInfoOld = (props) => {
  let [expanded,setExpanded] = useState(false)

  useEffect(){
    () => {
      if(Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }}
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded)
  }
  render(){
    return (
      <View>
        <TouchableOpacity
          style={[styles.orderRow,styles.p_fsm,styles.fd_r,
                  styles.ai_c,styles.jc_sb,
                  {borderBottomLeftRadius:!this.state.expanded ? 10 : 0,
                    borderBottomRightRadius:!expanded ? 10 : 0,
                    backgroundColor:}]}
          onPress={()=>toggleExpand()}>
          <Image
            source={{uri:props.nowOrder.beforeImg}}
            style={[styles.headerAvaImg,styles.avaImg]}/>
          <Text style={[styles.all,styles.whiteColor]}>{getNormalDate(props.nowOrder.dateCreate,false,true)}</Text>
          {SCREEN_WIDTH > 600
            ? <View style={[styles.starsRow,styles.fd_r,styles.ai_c,styles.jc_sb]}>
                  {[...Array(5)].map((item,id) => {
                    return(
                      <AntDesign key={id} name="star" size={fontSizeMain*1.8} color={props.nowOrder.rating > id ? "#ffc36d" : '#B8B8B8'} />
                    )}
                  )}
              </View>
            : <View style={[styles.fd_r,styles.ai_c]}>
                <Text style={[styles.all,styles.whiteColor,{marginRight:fontSizeMain*0.3}]}>{this.state.data.rating}</Text>
                <AntDesign name="star" size={fontSizeMain*1.1} color="#ffc36d" />
              </View>
          }
          <AntDesign name={this.state.expanded ? 'up' :  'down'} size={fontSizeMain} color="#fff"/>
        </TouchableOpacity>
        <View style={styles.orderParentHr}/>
      {
        this.state.expanded &&
        <View style={styles.orderParentHr}/>
        <View style={styles.orderChild}>
        {this.props.noCompleteOrder && props.user.status == 'designer'
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Для завершения работы нужно приложить готовое фото
            </Text>
          : null}
          <SliderBA
            handlerDelete={deleteImageHandler}
            handler={setImageHandler}
            height={props.nowOrder.height}
            photo={[props.nowOrder.beforeImg,props.nowOrder.afterImg||afterImg]}
            userStatus={props.user.status}
            userId={props.nowOrder.id}
            orderStatus={props.nowOrder.status}/>

          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.redColor,styles.bold,{fontSize:fontSizeMain*1.2}]}><Text style={{fontSize:fontSizeMain}}>Выполнить до:</Text> {getNormalDate(props.nowOrder.dateComplete)}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {props.nowOrder.dateTake ? getNormalDate(props.nowOrder.dateTake) : '-'}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>
              Статус:
              <Text style={{color:'green'}}>
                {localeStatusOrder(props.nowOrder.status)}
              </Text>
            </Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {props.nowOrder.param ?
              props.nowOrder.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)
              : null}
          </View>
          {props.nowOrder.status == 'inRating'
            ? <View>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваша оценка:</Text>
                <View style={[styles.starsRow,styles.fd_r,styles.ai_c,styles.jc_sb,{marginBottom:fontSizeMain*1.5}]}>
                  {[...Array(5)].map((item,id) => {
                      if(props.user.status == 'client'){
                        return(
                          <Pressable key={id} onPress={() => setRatingBeforeAgree(id+1)}>
                              <AntDesign name="star" size={fontSizeMain*1.8} color={props.nowOrder.rating > id || rating > id ? "#ffc36d" : '#B8B8B8'} />
                          </Pressable>)
                      } else {
                        return(
                          <AntDesign name="star" key={id} size={fontSizeMain*1.8} color={props.nowOrder.rating > id || rating > id ? "#ffc36d" : '#B8B8B8'} />
                          )
                      }
                    })}
                </View>

                {props.user.status=='client'
                  ? <View>
                      <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваш комментарий</Text>
                      <FormInput
                        options={{
                             placeholder:'Комментарий',
                             onChangeText:(text)=>{setComment(text)}
                          }}
                         styleInput = {[styles.all,styles.input]}
                       />
                    </View>
                  : null}
              </View>
            : null
          }
          <View style={styles.orderDescriptGroup}>
            {props.user.status == 'client'
              ? <Text style={[styles.all,styles.orderDescript]}>
                  <Text style={[styles.all,styles.orderDescript,styles.bold]}>Вы заплатили: </Text>
                  {currencySpelling(props.nowOrder.amount)}
                </Text>
              : <View>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Бонус за 5 звезд: </Text>
                    20 виженов
                  </Text>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Бонус за срочность: </Text>
                    15 виженов
                  </Text>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Вы получите: </Text>
                    {currencySpelling(20 + props.nowOrder.quickly)}
                  </Text>
                </View>
              }
          </View>
          {noCompleteOrder && props.user.status == 'client'
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                Необходимо поставить оценку от одного до пяти
              </Text>
            : null}
          {noCompulsoryCommets
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                При оценке ниже 4 нужно написать, что не так, чтобы мы могли подобрать вам другого мастера
              </Text>
            : null}
          {props.user.status == 'designer'
            ? props.nowOrder.status == 'inWork'
              ? <Button title='Отправить' onPress={completeOrders}/>
              : <View style={[styles.statusRatingBlock,styles.p_fsm,styles.ai_c,styles.fd_r]}>
                  <Text style={[styles.whiteColor,styles.all]}>На оценке</Text>
                </View>
            : props.nowOrder.status == 'inRating'
              ? <Button title='Оценить' onPress={()=>setRatingAgree()}/>
              : null}
        </View>
      }
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user,
    nowOrder:store.register.nowOrder
  })

  export default connect(mapStoreToProps)(OrderInfoOld)
