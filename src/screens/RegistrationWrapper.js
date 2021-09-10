import React,{useState} from 'react';
import {styles, fontSizeMain} from '../components/Style'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const TEL_REGEX =/^((8|\+?7)[\- ]?)(\(?\d{3}\)?[\- ]?)[\d\- ]{7}$/;

import LogIn from '../components/registration/LogIn.js'
import LogUp from '../components/registration/LogUp.js'
import {Text, View, Pressable} from 'react-native';

class RegistrationWrapper extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      signIn:true,
      designer:0
    }
    this.setDesigner = this.setDesigner.bind(this)
    this.logUp = this.logUp.bind(this)
    this.logIn = this.logIn.bind(this)
  }
    logUp(data,designer){
      this.props.logup(data,designer)
      this.setState()
    }
    logIn(data){
      this.props.login(data)
      this.setState()
    }
    setDesigner(bool){
      this.setState({designer:bool})
    }
    render(){
      return (
        <View style={[styles.regWrapper]}>
          <View style={styles.regLink}>
            <Pressable onPress={() => this.setState({signIn:true})}>
              <Text style={[this.state.signIn ? styles.boldest : styles.bold, styles.redColor]}>Вход</Text>
            </Pressable>
            <Text style={[{marginHorizontal:fontSizeMain}, styles.bold, styles.redColor]}>|</Text>
            <Pressable onPress={() => this.setState({signIn:false})}>
              <Text style={[!this.state.signIn ? styles.boldest : styles.bold, styles.redColor]}>Регистрация</Text>
            </Pressable>
          </View>
            {this.state.signIn ?
                <LogIn
                    submit={this.logIn}
                    emailReg={EMAIL_REGEX}
                    telReg={TEL_REGEX}/> :
                <LogUp
                    designer={this.state.designer}
                    setDesigner={this.setDesigner}
                    submit={this.logUp}
                    emailReg={EMAIL_REGEX}
                    telReg={TEL_REGEX}/>}

        </View>
      );
    }
};
RegistrationWrapper.navigationOptions = {
    title: 'RegistrationWrapper'
};
export default RegistrationWrapper;

 /*class RegistrationWrapper extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user:{
        email:'',
        password:'',
        tel:'',
        username:'',
        status:'',
        id:Date.now().toString(),
        img:null
      },

      validForm: {
        email:false,
        username:false,
        password:false,
        tel:false
      },

      action:this.props.actionLog
    }

    this.changeActionLogHandler = this.changeActionLogHandler.bind(this)
    this.changeInputRegisterHandler = this.changeInputRegisterHandler.bind(this)
  }

  validValueRegExp(regexp,target){
    let reg = regexp;
    let valid = reg.test(target.value)
    if(!valid){
      target.parentNode.classList.add('invalidInput', 'fieldWithAlert')
    } else {
      target.parentNode.classList.remove('invalidInput', 'fieldWithAlert')
      this.setState({validForm:{...this.state.validForm,[target.name]:true}})
    }
  }

  changeInputRegisterHandler(e,value){
    let target = e.target
    let name = target.name
    let valueTarg = target.value
    valueTarg = name != 'username' ? valueTarg.toLowerCase() : valueTarg

    this.setState({user:{...this.state.user,
      [name]:valueTarg
    }})

    if(target.name == 'email'){
      let reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      this.validValueRegExp(reg,target)
        this.props.dispatch(checkRepeatEmail(false))
    } else if (target.name == 'tel'){
      if(valueTarg == '') target.parentNode.classList.remove('inputTel')
      else target.parentNode.classList.add('inputTel')

      let reg = /^[\d]{10}$/
      this.validValueRegExp(reg,target)
    } else if(name == 'username'){
      if(valueTarg == '') {
        target.parentNode.classList.add('invalidInput', 'fieldWithAlert')
      } else {
        this.setState({validForm:{...this.state.validForm,[name]:true}})
        target.parentNode.classList.remove('invalidInput', 'fieldWithAlert')
      }
    } else {
      if(valueTarg == '' || valueTarg.length < 6) {
        target.parentNode.classList.add('invalidInput', 'fieldWithAlert')
      } else {
        this.setState({validForm:{...this.state.validForm,[name]:true}})
        target.parentNode.classList.remove('invalidInput', 'fieldWithAlert')
      }
    }
}

changeActionLogHandler(){
    let action = this.state.action;
    action == 'logUp' ? action = 'logIn' : action = 'logUp'
    this.props.dispatch(changeActionLog(action))
    this.props.dispatch(checkIncor(false))
    this.props.dispatch(checkRepeatEmail(false))
    this.setState({action})
}

  render(){
  return(
    <div className="registration-wrapper">
      {this.state.action == 'logIn' ?
            <LogIn
                validForm = {this.state.validForm}
                user = {this.state.user}
                change={this.changeInputRegisterHandler}
                submit={this.props.submit}
                signIn = {this.props.signInWithGoogle}
                changeActionLogHandler = {this.changeActionLogHandler}/> :
            <LogUp
                validForm = {this.state.validForm}
                user = {this.state.user}
                change={this.changeInputRegisterHandler}
                submit={this.props.submit}
                changeActionLogHandler = {this.changeActionLogHandler}/>}
    </div>
  )
}
}


const mapStateToProps = state => ({
  repeatEmail:state.register.repeatEmail,
  actionLog:state.register.actionLog,
  incEmOrPas:state.register.incEmOrPas
})

export default connect(mapStateToProps)(RegistrationWrapper)*/
