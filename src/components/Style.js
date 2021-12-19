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
  if(screenWidth > 600){
    return 18;
  }else if(screenWidth > 400){
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
export const widthWihtout2Font = SCREEN_WIDTH - 2*fontSizeMain

//STYLE
export const styles = StyleSheet.create({
  /************* CONTAINER ***********/
  container: {
    flex: 1,
    backgroundColor:'#F7EDDA'
  },
  containerWithoutBlock:{
    padding:fontSizeMain,
  },
  button: {
    paddingVertical: fontSizeMain*0.6 ,
    paddingHorizontal:fontSizeMain*1.5,
    minWidth:100,
    borderRadius: 10,
    fontSize:0.875 * fontSizeMain,
    color:'#fff',
  },
  input: {
    backgroundColor:'#fff',
    width:'100%',
    borderRadius:4,
    paddingHorizontal: fontSizeMain,
    paddingVertical:0.7*fontSizeMain,
    marginVertical:0,
    fontSize: 0.875 * fontSizeMain,
    borderColor:colors.lightPink,
    borderWidth:2,
    marginBottom:2*fontSizeMain,
    position:'relative',
  },
  avaImg:{
    borderRadius:50,
  },
  /********** PADDING / MARGIN ************/
  p_fsm:{ padding:fontSizeMain },
  /***************** FLEX ***************/
  flex:{ flex: 1},
  jc_c:{ justifyContent:'center'},
  jc_sb:{ justifyContent:'space-between'},
  fd_r:{ flexDirection:'row'},
  ai_c:{ alignItems:'center'},
  /******************STYLE TEXT***************/
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
  darkPinkColor:{
    color:colors.darkPink,
    fontFamily:"Montserrat-500"
  },
  greenColor:{
    color:colors.lightGreen
  },
  /******************DRAWER*******************/
drawer:{
    backgroundColor:colors.beige,
  },
drawerInfo:{
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
    width:SCREEN_WIDTH-32,
    backgroundColor:colors.darkPink
},
  headerText:{
    letterSpacing:1,
},
  headerAvaImg:{
    width:30,
    height:30,
},
/*************PROFILE****************/
editIcon:{
  position:'absolute',
  top:fontSizeMain,
  right:fontSizeMain,
  zIndex:100
},
profileWrapper:{
  width:SCREEN_WIDTH,
  position:'relative'
},
profileBlock:{
  backgroundColor:colors.beige,
  marginBottom:fontSizeMain*0.7,
  width:'100%',
},
profileInfoAbout:{
  marginBottom:fontSizeMain,
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
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
},
sliderImage: {
    height:'100%'
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
  alignItems:'flex-start',
  marginBottom:1.5*fontSizeMain,
},
editNameOrSurnameWrapper:{
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
notOrder:{
  paddingTop:(SCREEN_HEIGHT-100)/2,
},
orderDescript:{
  paddingBottom:fontSizeMain*0.6,
},
orderRow:{
  backgroundColor:colors.darkPink,
  borderRadius:10,
  marginBottom:2
},
orderRowSee:{
  backgroundColor:"#fff",
  borderWidth:2,
  borderColor:colors.darkPink
},
orderParentHr:{
    height:2,
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
orderColorsModeratorWrapper:{
  borderRadius:10,
  display:'flex',
  width:'100%',
  backgroundColor:colors.darkPink,
  marginBottom:fontSizeMain
},
orderColorModerator:{
  width:2*fontSizeMain,
  height:fontSizeMain,
  borderRadius:50,
  backgroundColor:colors.beige,
  marginBottom:0.5*fontSizeMain
},
orderColorMore2Hour:{
  backgroundColor:colors.lightPink
},
orderColorMore15Minute:{
  backgroundColor:'#D98989'
},
orderColorMin5Minute:{
  backgroundColor:'#944444'
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
},
orderTitleAfter:{
  right:0
},
/************** СЛАЙДЕР ДО/ПОСЛЕ С ПОЛЗУНКОМ***********/
photoBA:{
  position: 'absolute',
  top: 0,
},
containerPhotoA:{
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 9,
  overflow: 'hidden'
},
draggerContainer:{
  position:'relative',
  width: fontSizeMain*2.6,
  position: 'absolute',
  top: 0,
  zIndex: 11,
  marginLeft: -fontSizeMain*1.3,
},
dragger:{
  width: fontSizeMain*2.6,
  height: fontSizeMain*2.6,
  overflow: 'hidden',
  borderColor:colors.lightGrey,
  borderWidth:2,
  borderRadius: 50,
},
sliderStage:{
  position:'absolute',
  zIndex:10
},
stickDragger:{
  position:'absolute',
  width:2,
  left:fontSizeMain*1.3-1,
  backgroundColor:colors.lightGrey
},
/**************СПРАВКА****************/
referenceItem:{
  justifyContent:'flex-start'
},
referenceItemIcon:{
  width:fontSizeMain,
  height:fontSizeMain,
  marginRight:fontSizeMain
},
/*************REGISTRATE/LOGIN****************/
secureEye:{
  opacity:0.6,
},
secureEyeWrap:{
  position:'absolute',
  right:fontSizeMain,
  top:0.7*fontSizeMain,
  zIndex:100
},
regWrapper: {
  paddingHorizontal: 2*fontSizeMain,
  backgroundColor: '#F0E9E9',
},
regPage:{
  marginTop:1.5*fontSizeMain,
  width:'100%',
},
inputGroup:{
  width:sliderBAWidth,
  flexDirection: SCREEN_WIDTH > 600 ? 'row' : 'column',
  justifyContent: SCREEN_WIDTH > 600 ? 'space-between' : 'flex-start',
},
regInput:{
  width:SCREEN_WIDTH > 600 ? (sliderBAWidth-2*fontSizeMain)/2 : sliderBAWidth,
},

checksWrap:{
  width:sliderBAWidth,
  marginBottom:fontSizeMain*2
},
checkText:{
  marginLeft:fontSizeMain*0.4,
  color:colors.darkPink,
  fontFamily:'Montserrat-500'
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
},
bodyOrFaceWrap:{
  width:'100%',
  justifyContent:'flex-start',
  marginBottom:fontSizeMain*1.5,
},
bodyOrFaceButton:{
  width:'50%',
},
bodyOrFaceWindow:{
  width:'100%',
  backgroundColor:colors.darkBeige,
},
bodyOrFaceParam:{
  marginBottom:fontSizeMain
},
paramMinus:{
  width:5,
  height:1,
  backgroundColor:colors.red
},
paramMinusWrap:{
  marginLeft:fontSizeMain,
  width:1.7*fontSizeMain,
  height:1.7*fontSizeMain,
  borderRadius:50,
  backgroundColor:colors.lightPink
},
paramPlusWrap:{
  marginHorizontal:SCREEN_WIDTH < 600 ? 'auto' : fontSizeMain,
  marginVertical:SCREEN_WIDTH < 600 ? 0.6*fontSizeMain : 0,
  width:3*fontSizeMain,
  height:1.7*fontSizeMain,
  borderRadius:10,
  backgroundColor:colors.lightPink
},
alertNewOrderWrapper:{
  width:'100%',
  flex:1,
  height:SCREEN_HEIGHT-80,
  backgroundColor:colors.darkBeige,
},
alertNewOrder:{
  width:widthWihtout2Font,
  backgroundColor:colors.middlePink,
  paddingHorizontal:fontSizeMain,
  paddingVertical:2*fontSizeMain,
  borderRadius:10,
},
statusRatingBlock:{
  width:'100%',
  backgroundColor:colors.red,
  opacity:0.7,
  borderRadius:10,
},
starsRow:{
  width:fontSizeMain*12,
},
infoPopup:{
  position:'absolute',
  bottom:'100%',
  width:SCREEN_WIDTH-2*fontSizeMain,
  padding:fontSizeMain,
  backgroundColor:colors.darkBeige,
  zIndex:100,
  shadowOffset:{  width: 0,  height: 0,  },
  shadowColor: 'black',
  shadowOpacity: .1,
  shadowRadius: 2*fontSizeMain,
  borderRadius:10
},
/********* ALL DESIGNER ************/
actionWithUserPopupText:{
  marginBottom:0.6*fontSizeMain
},
actionWithUserBtn:{
  width:1.5*fontSizeMain,
  height:1.5*fontSizeMain,
},
actionWithUserBtnText:{
  letterSpacing:0.15*fontSizeMain
},
actionWithUserAva:{
  marginRight:0.6*fontSizeMain
},
/********* GALLERY ***************/
gallery_wrap:{
  width:SCREEN_WIDTH,
  flexDirection:'row',
  flexWrap:'wrap',
  padding:2,
},
gallery_img:{
  width:SCREEN_WIDTH > 600 ? SCREEN_WIDTH/4-6 : SCREEN_WIDTH/3-6,
  height:SCREEN_WIDTH > 600 ? SCREEN_WIDTH/4-4 : SCREEN_WIDTH/3-4,
  margin:2
},
galleryHome_img:{
  width:SCREEN_WIDTH > 600 ? (SCREEN_WIDTH-2*fontSizeMain)/4-4 : (SCREEN_WIDTH-2*fontSizeMain)/3-4,
  height:SCREEN_WIDTH > 600 ? (SCREEN_WIDTH-2*fontSizeMain)/4-4 : (SCREEN_WIDTH-2*fontSizeMain)/3-4,
  margin:2,
  borderRadius:7
},
gallery_img__check:{
  position:'absolute',
  bottom:0.3*fontSizeMain,
  right:0.3*fontSizeMain,
  zIndex:100
},
gallery_icon_panel:{
  width:2.3*fontSizeMain,
  height:2.3*fontSizeMain,
  borderRadius:50,
  backgroundColor:colors.red,
},
photoActionsWrap:{
  backgroundColor:colors.beige,
  marginBottom:fontSizeMain*0.5,
  justifyContent:'space-around'
},
photoActionsText:{
  fontSize:fontSizeMain*0.9,
  marginTop:0.2*fontSizeMain
},
/**************** REFERENCE ******************/
logoOfBanks:{
  width:(SCREEN_WIDTH-2*fontSizeMain)/3-fontSizeMain,
  paddingHorizontal:0.5*fontSizeMain,
  height:2*fontSizeMain,
  resizeMode:'contain'
},
sizeVideoYouTube:{
  height:widthWihtout2Font*0.6,
  width:widthWihtout2Font,
  marginBottom:fontSizeMain
},
/*************** BALANCE *****************/
uncoverBlockHeader:{
  marginBottom:2,
},

/***************** ERROR **************/
blockImg:{
  width:5*fontSizeMain,
  height:5*fontSizeMain
},
blockText:{
  marginBottom:1*fontSizeMain
},
/*************** SUPPORT ******************/
supportMain:{
  width:'100%',
  display:'flex',
  marginBottom:fontSizeMain,
},
supportFooter:{
  backgroundColor:colors.red,
  width:'100%',
  paddingRight:2*fontSizeMain,
  position:'relative',
  paddingTop:0
},
supportIconBtn:{
  position:'absolute',
  top:0,
  right:0,
},
supportIcon:{
  backgroundColor:colors.red,
  borderRadius:50,
  padding:1.5*fontSizeMain
},
messageName:{
  marginBottom:0.3*fontSizeMain,
  fontSize:0.8*fontSizeMain
},
messageWrap:{
  borderRadius:10,
  paddingHorizontal:fontSizeMain,
  paddingVertical:0.5*fontSizeMain,
  marginBottom:0.5*fontSizeMain,
  maxWidth:widthWihtout2Font-2*fontSizeMain
},
lastMessage:{marginBottom:fontSizeMain*1.5},
leftMessage:{
  backgroundColor:colors.beige,
  marginRight:'auto',
},
rightMessage:{
  backgroundColor:colors.red,
  marginLeft:'auto',
  alignItems:'flex-end'
},
messageData:{
  fontSize:0.6*fontSizeMain,
  marginLeft:fontSizeMain
},
reloadMessage:{
  position:'absolute',
  backgroundColor:colors.darkPink,
  width:3*fontSizeMain,
  height:3*fontSizeMain,
  borderRadius:1.5*fontSizeMain,
  top:fontSizeMain*0.5,
  right:fontSizeMain*0.5,
  zIndex:150
},
activeMessageDot:{
  width:0.5*fontSizeMain,
  height:0.5*fontSizeMain,
  backgroundColor:colors.red,
  borderRadius:3,
  position:'absolute',
  top:fontSizeMain,
  right:fontSizeMain
},
messageText:{
  maxWidth:sliderBAWidth-2*fontSizeMain
},
activeMessageDotWithUser:{
  top:0,
  right:-fontSizeMain
},
resolveIssue:{
  backgroundColor:'#944444',
  width:3*fontSizeMain,
  height:3*fontSizeMain,
  borderRadius:1.5*fontSizeMain,
},
});
