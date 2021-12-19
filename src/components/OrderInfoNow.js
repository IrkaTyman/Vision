import React, { useState, useEffect} from "react";
import { Pressable,View,Image, TouchableOpacity, Text, Platform,LayoutAnimation,UIManager} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors,SCREEN_WIDTH} from './Style';
import {SliderBA} from '../components/SliderBA'
import {currencySpelling} from '../function/currencySpelling'
import {getNormalDate} from '../function/getNormalDate'
import {localeStatusOrder} from '../function/localeStatusOrder'
import {BeforeAfterSlider} from './BeforeAfterSlider'
import {Button} from './Button'
import {FormInput} from './FormInput'

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

class OrderInfoNow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rating:0,
      noCompleteOrder:false,
      noCompulsoryCommets:false,
      comment:'',
      afterImg:'',
      expanded:false
      }
    this.setImageHandler = this.setImageHandler.bind(this)
    this.deleteImageHandler = this.deleteImageHandler.bind(this)
    this.completeOrdersExtra = this.completeOrdersExtra.bind(this)
    this.setRatingAgreeExtra=this.setRatingAgreeExtra.bind(this)
  }

  componentDidMount(){
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }}

  setRatingAgreeExtra(rating,comment,id){
      if(rating){
        if((rating < 4 && comment != '') || rating > 3){
          this.props.setRatingAgree(rating,comment,id)
        } else this.setState({...this.state, noCompulsoryCommets:true})
      } else this.setState({...this.state, noCompleteOrder:true})
    }
  setImageHandler(result){
    if(!result.cancelled) {
      this.setState({...this.state, afterImg:result.uri, noCompleteOrder:false})
    }
  }
  deleteImageHandler(){
    this.setState({...this.state, afterImg:''})
  }
  setRatingBeforeAgree(stars){
    this.setState({...this.state,
            rating:stars,
            noCompleteOrder:false,
            noCompulsoryCommets:false})
  }
  toggleExpand(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({...this.state, expanded:!this.state.expanded})
  }
  async completeOrdersExtra(){
    if(this.state.afterImg){
      await this.props.completeOrders(this.state.afterImg,this.props.nowOrder.id)
      this.setState({...this.state, noCompleteOrder:false, afterImg:''})
    } else this.setState({...this.state, noCompleteOrder:true})
  }
  render(){
    return (
      <View>
        <TouchableOpacity
          style={[styles.orderRow,styles.p_fsm,styles.fd_r,
                  styles.ai_c,styles.jc_sb,
                  {borderBottomLeftRadius:!this.state.expanded ? 10 : 0,
                    borderBottomRightRadius:!this.state.expanded ? 10 : 0},]}
          onPress={()=>this.toggleExpand()}>
          <Image
            source={{uri:this.props.nowOrder.beforeImg}}
            style={[styles.headerAvaImg,styles.avaImg]}/>
          <Text style={[styles.all, styles.whiteColor]}>
            {getNormalDate(this.props.nowOrder.dateCreate,false,true)}
          </Text>
          <AntDesign name={this.state.expanded ? 'up' :  'down'} size={fontSizeMain} color="#fff"/>
        </TouchableOpacity>
        <View style={styles.orderParentHr}/>
      {
        this.state.expanded &&
        <View style={styles.orderChild}>
        {this.state.noCompleteOrder && this.props.user.status == 'designer'
          ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
              Для завершения работы нужно приложить готовое фото
            </Text>
          : null}
          <SliderBA
            handlerDelete={this.deleteImageHandler}
            handler={this.setImageHandler}
            height={this.props.nowOrder.height}
            photo={[this.props.nowOrder.beforeImg,this.props.nowOrder.afterImg||this.state.afterImg]}
            userStatus={this.props.user.status}
            userId={this.props.nowOrder.id}
            orderStatus={this.props.nowOrder.status}/>

          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.redColor,styles.bold,{fontSize:fontSizeMain*1.2}]}><Text style={{fontSize:fontSizeMain}}>Выполнить до:</Text> {getNormalDate(this.props.nowOrder.dateComplete)}</Text>
            <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Взят в работу:</Text> {this.props.nowOrder.dateTake ? getNormalDate(this.props.nowOrder.dateTake) : '-'}</Text>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>
              Статус:
              <Text style={{color:'green'}}>
                {localeStatusOrder(this.props.nowOrder.status)}
              </Text>
            </Text>
          </View>
          <View style={styles.orderDescriptGroup}>
            <Text style={[styles.all,styles.orderDescript,styles.bold]}>Задание:</Text>
            {this.props.nowOrder.param ?
              this.props.nowOrder.param.map((item,id) => <Text key={id} style={[styles.all,styles.orderDescript]}>{item}</Text>)
              : null}
          </View>
          {this.props.nowOrder.status == 'inRating'
            ? <View>
                <Text style={[styles.all,styles.orderDescript]}><Text style={[styles.all,styles.orderDescript,styles.bold]}>Завершен:</Text> { getNormalDate(this.props.nowOrder.dateCompleteDesigner)}</Text>
                <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваша оценка:</Text>
                <View style={[styles.starsRow,styles.fd_r,styles.ai_c,styles.jc_sb,{marginBottom:fontSizeMain*1.5}]}>
                  {[...Array(5)].map((item,id) => {
                      if(this.props.user.status == 'client'){
                        return(
                          <Pressable key={id} onPress={() =>this.setRatingBeforeAgree(id+1)}>
                              <AntDesign name="star" size={fontSizeMain*1.8} color={this.props.nowOrder.rating > id || this.state.rating > id ? "#ffc36d" : '#B8B8B8'} />
                          </Pressable>)
                      } else {
                        return(
                          <AntDesign name="star" key={id} size={fontSizeMain*1.8} color={this.props.nowOrder.rating > id || this.state.rating > id ? "#ffc36d" : '#B8B8B8'} />
                          )
                      }
                    })}
                </View>

                {this.props.user.status=='client'
                  ? <View>
                      <Text style={[styles.all,styles.orderDescript,styles.bold]}>Ваш комментарий</Text>
                      <FormInput
                        options={{
                             placeholder:'Комментарий',
                             onChangeText:(text)=>{this.setState({...this.state, comment:text})}
                          }}
                         styleInput = {[styles.all,styles.input]}
                       />
                    </View>
                  : null}
              </View>
            : null
          }
          <View style={styles.orderDescriptGroup}>
            {this.props.user.status == 'client'
              ? <Text style={[styles.all,styles.orderDescript]}>
                  <Text style={[styles.all,styles.orderDescript,styles.bold]}>Вы заплатили: </Text>
                  {currencySpelling(this.props.nowOrder.amount)}
                </Text>
              : <View>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Бонус за 5 звезд: </Text>
                    10 виженов
                  </Text>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Бонус за срочность: </Text>
                    5 виженов
                  </Text>
                  <Text style={[styles.all,styles.orderDescript]}>
                    <Text style={[styles.all,styles.orderDescript,styles.bold]}>Без бонусов вы получите: </Text>
                    {currencySpelling(20 )}
                  </Text>
                </View>
              }
          </View>
          {this.noCompleteOrder && this.props.user.status == 'client'
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                Необходимо поставить оценку от одного до пяти
              </Text>
            : null}
          {this.state.noCompulsoryCommets
            ? <Text style={[styles.all,styles.boldest,styles.redColor,{fontSize:fontSizeMain*0.8,marginBottom:fontSizeMain}]}>
                При оценке ниже 4 нужно написать, что не так, чтобы мы могли подобрать вам другого мастера
              </Text>
            : null}
          {this.props.user.status == 'designer'
            ? this.props.nowOrder.status == 'inWork'
              ? <Button title='Отправить' onPress={this.completeOrdersExtra}/>
              : <View style={[styles.statusRatingBlock,styles.p_fsm,styles.ai_c,styles.fd_r]}>
                  <Text style={[styles.whiteColor,styles.all]}>На оценке</Text>
                </View>
            : this.props.nowOrder.status == 'inRating'
              ? <Button title='Оценить' onPress={()=>this.setRatingAgreeExtra(this.state.rating,this.state.comment,this.props.nowOrder.id)}/>
              : null}
            </View>
      }
      </View>
    )}
  }

  let mapStoreTothis = (store) => ({
    user:store.register.user
  })

  export default connect(mapStoreTothis)(OrderInfoNow)
