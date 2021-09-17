import React from 'react';
import { StyleSheet, Dimensions,Platform} from 'react-native';

//const STYLE
export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
export const fontSizeMain = fontSizer(SCREEN_WIDTH)

//func for STYLE
function fontSizer (screenWidth) {
  if(screenWidth > 400){
    return 18;
  }else if(screenWidth > 320){
    return 16;
  }else {
    return 14;
  }
}
export const colors = {
  darkPink:'#A57474',
  red:'#D25C5C',
  middlePink:'#D07070',
  lightPink:'#FEC9C9',
  beige:'#F9F6F1',
  darkGreen:'#899B88',
  lightGreen:'#327513',
  darkGrey:'#D8DCD8',
  lightGrey:'#E9EDE9',
  darkBeige:'#F7EDDA'
}

//FOR SLIDER
const IS_IOS = Platform.OS === 'ios';

function wp (percentage) {
    const value = (percentage * SCREEN_WIDTH) / 100;
    return Math.round(value);
}

const slideHeight = SCREEN_HEIGHT * 0.5;
export const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = SCREEN_WIDTH - 32;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export const sliderBAWidth = SCREEN_WIDTH - 4*fontSizeMain
const widthWihtout2Font = SCREEN_WIDTH - 2*fontSizeMain

//STYLE
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F7EDDA'
  },
  containerWithoutBlock:{
    padding:fontSizeMain,
  },
  p: {
    marginBottom: fontSizeMain,
    lineHeight: fontSizeMain * 1.4,
  },
  all: {
    margin: 0,
    padding: 0,
    fontSize: fontSizeMain,
    fontFamily:'Montserrat-400'
  },
  button: {
    paddingVertical: fontSizeMain*0.6 ,
    paddingHorizontal:fontSizeMain*1.5,
    minWidth:100,
    borderRadius: 10,
    fontSize:0.875 * fontSizeMain,
    alignItems:'center',
    color:'#fff',
  },
  input: {
    backgroundColor:'#fff',
    width:'100%',
    borderRadius:4,
    padding: fontSizeMain,
    fontSize: 0.875 * fontSizeMain,
    borderColor:colors.lightPink,
    borderWidth:2,
    marginBottom:2*fontSizeMain,
  },
  avaImg:{
    borderRadius:50,
  },
  /******************STYLE TEXT***************/
  h3: {
    marginBottom: fontSizeMain,
    fontSize:1.15 *fontSizeMain,
  },
  darkPinkColor:{
    color:colors.darkPink
  },
  whiteColor:{
    color:'#fff'
  },
  bold:{
    fontFamily:"Montserrat-500",
  },
  boldest:{
    fontFamily:"Montserrat-700",
  },
  redColor:{
    color:colors.red
  },
  greyColor:{
    opacity:.6
  },
  /******************DRAWER*******************/
drawer:{
    flex:1,
    backgroundColor:colors.beige,
    paddingHorizontal:fontSizeMain,
    paddingVertical:fontSizeMain,
  },
drawerInfo:{
    display:'flex',
    flexDirection:'row',
    marginBottom:fontSizeMain*1.5,
  },
drawerInfo_Ava:{
    width:45,
    height:45,
    marginRight:16,
  },
logOut:{
    marginTop:fontSizeMain,
    borderTopWidth: 1,
    borderTopColor:colors.red,
    borderRadius:0,
    paddingTop:fontSizeMain
  },
drawerOrdersWrapper:{
  marginLeft:fontSizeMain,
  marginTop:fontSizeMain
},

drawerOrdersItem:{
  marginLeft:2*fontSizeMain,
  fontSize:fontSizeMain*0.9
},
  /******************HEADER******************/
  header: {
    flex:1,
    width:SCREEN_WIDTH-32,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:colors.darkPink
},
  headerText:{
    letterSpacing:1,
},
  header_avatarDiv:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
},
  headerAvaImg:{
    width:30,
    height:30,
},
/*************PROFILE****************/
profileWrapper:{
  width:SCREEN_WIDTH,
  position:'relative'
},
profileBlock:{
  backgroundColor:colors.beige,
  paddingHorizontal:fontSizeMain,
  paddingVertical:fontSizeMain,
  marginBottom:fontSizeMain*0.7,
  width:'100%',
},
profileInfoAbout:{
  display:'flex',
  flexDirection:'row',
  marginBottom:fontSizeMain,
},
profileInfoTextView:{
  paddingVertical:fontSizeMain,
  paddingHorizontal:fontSizeMain,
  display:'flex',
  justifyContent:'center',
},
profileInfoTextName:{
  fontFamily:'Montserrat-500',
  fontSize:1.1*fontSizeMain
},
profileInfoText:{
  paddingBottom:0.3*fontSizeMain
},

//Slider
slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
},
sliderImageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
},
sliderImage: {
    height:'100%'
},
scrollview: {
    flex: 1
},
slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
},
sliderContentContainer: {
    paddingVertical: 10 // for custom animation
},
paginationContainer: {
    paddingVertical: 8
},
paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
},
/*************EDIT*****************/
labelEdit:{
  fontSize:0.8*fontSizeMain,
  color:colors.darkPink,
  paddingBottom:fontSizeMain*0.4
},
editNameOrSurnameOrImgWrapper:{
  display:'flex',
  flexDirection:'row',
  alignItems:'flex-start',
  marginBottom:1.5*fontSizeMain,
},
editNameOrSurnameWrapper:{
  flex:1,
  marginLeft:fontSizeMain,
  height:100,
},
editNameInput:{
  marginBottom:0,
  borderBottomWidth:0,
  borderBottomRightRadius:0,
  borderBottomLeftRadius:0,
},
editNameOrSurnameInput:{
  backgroundColor:'#F7EDDA',
  borderWidth:1,
  borderColor:colors.lightPink,
  padding:0.7*fontSizeMain,
  fontSize:fontSizeMain
},
editSurnameInput:{
  borderTopRightRadius:0,
  borderTopLeftRadius:0,
},
editImageWrapperAdd:{
  position:'absolute',
  top:0,
  right:0,
  width:100,
  height:100,
  justifyContent:'center',
  alignItems:'center'
},
incorrectValue:{
  fontSize:0.8*fontSizeMain,
  color:colors.red,
  fontFamily:'Montserrat-700',
  position:'absolute',
  bottom:fontSizeMain*0.8,
  zIndex:100
},
repeatEmail:{
  fontSize:0.8*fontSizeMain,
  color:colors.red,
  fontFamily:'Montserrat-700',
  position:'absolute',
  top:-fontSizeMain*0.9,
},
incorrectValueInput:{
  borderColor:colors.red
},
telBegin:{
  position:'absolute',
  top:2.5*fontSizeMain,
  left:0.7*fontSizeMain,
  fontSize:1.5*fontSizeMain,
},
/**************OLD IMAGES***********/
oldImageItem:{
  flex:1,
  height:400,
},
/**************ORDERS***********/
ordersBlock:{
  padding:fontSizeMain
},
notOrder:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  paddingTop:(SCREEN_HEIGHT-100)/2,
},
orderDescript:{
  paddingBottom:fontSizeMain*0.6,
},
orderRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
    padding:fontSizeMain,
    alignItems:'center',
    backgroundColor: colors.darkPink,
    borderRadius:10,
},
orderParentHr:{
    height:1,
    color: '#fff',
    width:'100%'
},
orderChild:{
    backgroundColor: colors.beige,
    padding:fontSizeMain,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
},
orderDescriptGroup:{
  paddingBottom:fontSizeMain
},
/************СЛАЙДЕР ДО/ПОСЛЕ**************/
sliderBAContainer:{
  marginBottom:fontSizeMain,
  position:'relative'
},
sliderBAPhoto:{
  width:sliderBAWidth,
  resizeMode:'contain',
},
sliderBAArrow:{
  width:2.3*fontSizeMain,
  height:2.3*fontSizeMain,
  justifyContent:'center',
  alignItems:'center',
  position:'absolute',
  borderRadius:50,
  zIndex:1
},
sliderBAStage:{
  paddingVertical:0.8*fontSizeMain,
  backgroundColor:'#C55454',
  position:'absolute',
  zIndex:1,
  width:8*fontSizeMain,
  justifyContent:'center',
  alignItems:'center',
},
orderTitleAfter:{
  right:0
},
/**************СПРАВКА****************/
referenceItem:{
  justifyContent:'flex-start'
},
referenceItemIcon:{
  marginRight:fontSizeMain
},
/*************REGISTRATE/LOGIN****************/
regWrapper: {
  paddingHorizontal: 2*fontSizeMain,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex:1,
  backgroundColor: '#F0E9E9',
},
regLink:{
  flexDirection:'row'
},
regPage:{
  marginTop:1.5*fontSizeMain,
  width:'100%',
  justifyContent:'center',
  alignItems:'center'
},
regInput:{
  marginBottom:fontSizeMain*2,
  width:sliderBAWidth
},
checksWrap:{
  width:sliderBAWidth,
  justifyContent:'space-between',
  flexDirection:'row',
  marginBottom:fontSizeMain*2
},
checkText:{
  marginLeft:fontSizeMain*0.4,
  color:colors.darkPink,
  fontFamily:'Montserrat-500'
},
checkWrap:{
  flexDirection:'row',
  alignItems:'center',
},
/************ NEW ORDER ***********/
newOrderPhoto:{
  width:widthWihtout2Font,
  resizeMode:'contain',
},
newOrderPicker:{
  width:widthWihtout2Font,
  backgroundColor:colors.lightGrey,
  height:200,
  justifyContent:'center',
  alignItems:'center'
},
bodyOrFaceWrap:{
  width:'100%',
  flexDirection:'row',
  justifyContent:'flex-start',
  marginBottom:fontSizeMain*1.5,
  alignItems:'center'
},
bodyOrFaceButton:{
  width:'50%',
  padding:fontSizeMain,
  flexDirection:'row',
  justifyContent:'center',
},
bodyOrFaceWindow:{
  padding:fontSizeMain,
  width:'100%',
  backgroundColor:colors.darkBeige,
},
bodyOrFaceParam:{
  marginBottom:fontSizeMain
},
paramMinus:{
  width:1.5*fontSizeMain,
  height:2,
  backgroundColor:colors.red
},
alertNewOrderWrapper:{
  position:'absolute',
  width:'100%',
  top:0,
  bottom:0,
  backgroundColor:'rgba(255,255,255,0.5)',
  zIndex:100
},
alertNewOrder:{
  width:widthWihtout2Font,
  position:'fixed',
  top:'50%',
  left:fontSizeMain,
  backgroundColor:colors.middlePink,
  paddingHorizontal:fontSizeMain,
  paddingVertical:2*fontSizeMain,
  borderRadius:10,
  zIndex:100,
  justifyContent:'center',
  alignItems:'center'
},
});
