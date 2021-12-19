import React, { Component} from "react";
import { View,Image, TouchableOpacity, Text, Platform,LayoutAnimation,UIManager} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors,SCREEN_WIDTH} from './Style';

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'

class Uncover extends Component {
  state = {
    expanded:false,
  }

  componentDidMount(){
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded:!this.state.expanded})
    this.props.toggleExtra()
  }
  renderChildren = (props, state) => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        state,
        parent: this
      })
    })
  }
  render(){
    return (
      <View>
        <TouchableOpacity
          style={[styles.uncoverBlockHeader,styles.p_fsm,styles.fd_r,
                  styles.ai_c,styles.jc_sb,...this.props.style]}
          onPress={()=>this.toggleExpand()}>
          <Text style={[styles.all,styles.whiteColor]}>
            {this.props.header}
          </Text>
          <Text style={[styles.all,styles.whiteColor,styles.bold]}>
            {this.props.price}
          </Text>
          <AntDesign name={this.state.expanded ? 'up' :  'down'} size={fontSizeMain} color={"#fff"}/>
        </TouchableOpacity>
        <View style={styles.orderParentHr}/>
      {
        this.state.expanded &&
        <View style={[styles.orderChild,{marginBottom:1.5*fontSizeMain}]}>
          {this.renderChildren(this.props)}
        </View>
      }
      </View>
    )
  }}

  let mapStoreToProps = (store) => ({
    user:store.register.user
  })

  export default connect(mapStoreToProps)(Uncover)
