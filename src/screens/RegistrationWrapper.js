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
      this.props.extraData.logup(data,designer)
      this.setState()
    }
    logIn(data){
      this.props.extraData.login(data)
      this.setState()
    }
    setDesigner(bool){
      this.setState({designer:bool})
    }

    render(){
      return (
        <View style={[styles.regWrapper,styles.ai_c,styles.jc_c,styles.flex]}>
          <View style={[styles.regLink,styles.fd_r]}>
            <Pressable onPress={() => this.setState({signIn:true})}>
              <Text style={[this.state.signIn ? styles.boldest : styles.bold, styles.redColor]}>Вход</Text>
            </Pressable>
            <Text style={[{marginHorizontal:fontSizeMain}, styles.bold, styles.redColor]}>|</Text>
            <Pressable onPress={() => this.setState({signIn:false})}>
              <Text style={[!this.state.signIn ? styles.boldest : styles.bold, styles.redColor]}>Регистрация</Text>
            </Pressable>
            <Pressable onPress={this.props.google}>
            </Pressable>
          </View>
            {this.state.signIn ?
                <LogIn
                    submit={this.logIn}
                    emailReg={EMAIL_REGEX}
                    telReg={TEL_REGEX}/> :
                <LogUp
                    navigation={this.props.navigation}
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
