export const addPerson = ({email,username,surname,password,tel,status,id,img,balance}) => {
  return {type:'register/add_person', payload:{email,username,surname,password,tel,status,id,img,balance}}
}

 const checkRepeatEmail = (repeatEmail) => {
  return {type:'register/check_repeat_email', payload:repeatEmail}
}

 const changeActionLog = (actionLog) => {
  return {type:'register/change_action_log', payload:actionLog}
}

 const getAllUsers = (users) => {
  return {type:'register/get_all_users', payload:users}
}

export const withdrawMoney = (balance) => {
 return {type:'register/withdraw_money', payload:balance}
}


export const editPerson = ({email,username,surname,password,tel,status,id,img}) => {
 return {type:'register/edit_userdata', payload:{email,username,surname,password,tel,status,id,img}
}}

export const removePerson = () => {
  return {type:'register/remove_person', payload:{}}
}

 const actionCreators = {
  addPerson,
  checkRepeatEmail,
  changeActionLog,
  getAllUsers,
  withdrawMoney
}
export {actionCreators}
