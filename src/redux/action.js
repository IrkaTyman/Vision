export const addPerson = ({email,username,surname,password,tel,status,img,balance}) => {
  return {type:'register/add_person', payload:{email,username,surname,password,tel,status,img,balance}}
}

export const withdrawMoney = (balance) => {
 return {type:'register/withdraw_money', payload:balance}
}

export const removePerson = (desc) => {
  return {type:'register/remove_person', payload:{desc}}
}
export const repeatEmail = (bool) => {
  return {type:'register/repeat_email', payload:{bool}}
}
export const incorEmailOrPass = (bool) => {
  return {type:'register/incorrect_email_or_password', payload:{bool}}
}
export const addFaceParameters = (object) => {
  return {type:'register/add_face_parameters', payload:object}
}
export const addBodyParameters = (object) => {
  return {type:'register/add_body_parameters', payload:object}
}
