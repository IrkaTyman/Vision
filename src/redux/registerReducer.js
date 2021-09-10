import logo from '../img/Logo.png'


let imgDefault= 'https://www.blexar.com/avatar.png'
//{id:'0',email:'tymanira@mail.ru',username:'Ira',surname:'',password:'0000',tel:'',status:'designer',img:imgDefault,balance:1000},
const initialState = {
  user:{},
  repeatEmail:false,
  users:{},
  logo:logo,
  isLogin:false,
  incorEmailOrPass:false,
  faceParameters:{},
  bodyParameters:{},
  noCompleteOrder:false
}

export default function registerReducer(state = initialState,action){
  switch(action.type) {
    case 'register/add_person':
      return {
        ...state,
        user:{
          email:action.payload.email,
          username:action.payload.username,
          surname:action.payload.surname|| '',
          password:action.payload.password,
          tel:action.payload.tel,
          status:action.payload.status,
          img:action.payload.img != '' ? action.payload.img : imgDefault,
          balance:0
        },
        isLogin:true
      }
    case 'register/withdraw_money':
      return{
        ...state,
        user:{
          ...state.user,
          balance:action.payload
        }
      }
    case 'register/remove_person':
      return{...state,
        user:{},
        isLogin:false}
    case 'register/repeat_email':
      return{...state,
        repeatEmail:action.payload}
    case 'register/incorrect_email_or_password':
      return{...state,
        incorEmailOrPass:action.payload}
    case 'register/add_face_parameters':
      return{...state,
        faceParameters:action.payload}

    case 'register/add_body_parameters':
      return{...state,
        bodyParameters:action.payload}

    default: return state
  }
}
