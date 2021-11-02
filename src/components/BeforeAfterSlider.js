import React, { Component,useState } from 'react';
import { StyleSheet, View, Text, PanResponder, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {styles,fontSizeMain,sliderBAWidth,colors} from './Style'
import {Svg,Text as TextSvg} from 'react-native-svg'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Before = (props) => (
  <View style={styles.flex}>
    <View style={[styles.photoBA,{left:0,overflow: 'hidden', width: props.state.width, height: props.state.height}]}>
    <Svg height={fontSizeMain*1.45} width={5*fontSizeMain} style={[styles.sliderStage,{left:0}]}>
      <TextSvg
        fill="#fff"
        stroke={colors.red}
        fontSize={fontSizeMain*1.45}
        x={2.5*fontSizeMain}
        strokeWidth="1"
        fontWeight='bold'
        y={fontSizeMain*1.4}
        textAnchor="middle"
        fontFamily='Montserrat-700'
      >
        До
      </TextSvg>
    </Svg>
      {props.children}
    </View>
  </View>
);

const After = (props) => (
  <View style={[styles.flex,styles.containerPhotoA,{left: props.state.left}]}>
    <View style={[styles.photoBA,{right: 0, width: props.state.width, height: props.state.height}]}>
    <Svg height={fontSizeMain*1.45} width={5*fontSizeMain} style={[styles.sliderStage,{right:0}]}>
      <TextSvg
        fill="#fff"
        stroke={colors.red}
        fontSize={fontSizeMain*1.45}
        x={2.5*fontSizeMain}
        strokeWidth="1"
        fontWeight='bold'
        y={fontSizeMain*1.4}
        textAnchor="middle"
        fontFamily='Montserrat-700'
      >
        После
      </TextSvg>
    </Svg>
      {props.children}
    </View>
  </View>
);

const DefaultDragger = (props) => (
  <View {...props.parent._panResponder.panHandlers} style={[styles.draggerContainer,{height: props.state.height, left: props.state.left}]}>
    <View style={[styles.dragger,styles.ai_c,styles.jc_c,{marginTop: (props.state.height/2-fontSizeMain*1.3)}]}>
      <Ionicons name="code-outline" size={fontSizeMain*1.2} color="#fff"/>
    </View>
    <View style={[styles.stickDragger,{height: props.state.height}]}></View>
  </View>
);

class Compare extends Component {
  constructor(props) {
    super(props);
    const initial = props.width/2;
    const width = props.width;
    const height = props.height;
    const draggerWidth = fontSizeMain*2
    const onMove = ()=>{};
    const onMoveStart = props.onMoveStart
    const onMoveEnd = props.onMoveEnd
    this.state = {
      width,
      height,
      draggerWidth,
      currentLeft: initial,
      left: initial,
      dx: 0,
      onMove,
      onMoveStart,
      onMoveEnd
    };
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.setState({dx: 0});
        this.state.onMoveStart();
      },
      onPanResponderMove: (event, gestureState) => {
        let dx = gestureState.dx;
        let left = this.state.currentLeft + dx;
        let { width, draggerWidth } = this.state;

        if ( left < 0 ) left = 0;
        else if ( left >= width) left = width;
        this.setState({ left });
        this.state.onMove();
      },
    onPanResponderRelease: (e, {vx, vy}) => {
        this.state.onMoveEnd();
        this.setState({currentLeft: this.state.left});
      }
    });
  }
  renderChildren = (props, state) => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        state,
        parent: this
      })
    })
  }
  render() {
    const { width, height, draggerWidth, left } = this.state;
    const { children } = this.props;
    return (
      <View style={[{width, height, backgroundColor: '#f2f2f2'},styles.sliderBAContainer]}>
        {this.renderChildren(this.props, this.state)}
      </View>
    );
  }
}


export const BeforeAfterSlider = (props) => {
  const [scrollEnabled,setScrollEnable]= useState(true)
  const onMoveStart =()=> {
    setScrollEnable(false)
  }
  const onMoveEnd =()=> {
    setScrollEnable(true)
  }
  return(
      <Compare width={props.width} height={props.height} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
        <Before>
          <Image source={{uri:props.photo[0]}} style={{width:props.width,height:props.height}} />
        </Before>
        <After>
          <Image source={{uri:props.photo[1]}} style={{width:props.width, height: props.height}} />
        </After>
        <DefaultDragger />
      </Compare>
  )
}
