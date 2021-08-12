import logo from '../img/Logo.png'


let imgDefault= 'https://www.blexar.com/avatar.png'

const initialState = {
  user:{id:'0',email:'tymanira@mail.ru',username:'Ira',surname:'',password:'0000',tel:'',status:'designer',img:imgDefault,balance:1000},
  repeatEmail:false,
  users:{},
  actionLog:'logIn',
  incEmOrPas:false,
  logo:logo,
  isLogin:true
}

export default function registerReducer(state = initialState,action){
  switch(action.type) {
    case 'register/add_person':
      return {
        ...state,
        user:{
          id:action.payload.id,
          email:action.payload.email,
          username:action.payload.username,
          surname:action.payload.surname|| '',
          password:action.payload.password,
          tel:action.payload.tel,
          status:action.payload.status,
          img:action.payload.img || imgDefault,
          balance:0
        }
      }

    case 'register/get_all_users':
      return{
        ...state,
        users:action.payload
    }

    case 'register/check_repeat_email':
      return{
        ...state,
        repeatEmail:action.payload
    }

    case 'register/change_action_log':
      return{
        ...state,
        actionLog:action.payload
    }

    case 'register/incorrect_email_or_pass':
      return{
        ...state,
        incEmOrPas:action.payload
    }

    case 'register/edit_userdata':
      return{
        ...state,
        user:{
          ...state.user,
          id:action.payload.id,
          email:action.payload.email,
          username:action.payload.username,
          surname:action.payload.surname|| '',
          password:action.payload.password,
          tel:action.payload.tel,
          status:action.payload.status,
          img:action.payload.img || imgDefault,
        }
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

    default: return state
  }
}
