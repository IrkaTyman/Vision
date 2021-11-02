export const addPerson = (obj) => {
  return {type:'register/add_person', payload:obj}
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
export const addNowOrder = (object) => {
  return {type:'register/add_now_order', payload:object}
}
export const addOldOrders = (array) => {
  return {type:'register/add_old_orders', payload:array}
}
export const addAllOrders = (array) => {
  return {type:'register/add_all_orders', payload:array}
}
export const addAllST = (object) => {
  return {type:'register/add_all_something', payload:object}
}
export const changeIndexImgGallery = (page) => {
  return {type:'register/set_index_img_gallery', payload:page}
}
export const changeCountImgInGallery = (page) => {
  return {type:'register/set_count_img_in_ gallery', payload:page}
}
