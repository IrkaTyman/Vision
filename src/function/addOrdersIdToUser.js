import firebase from 'firebase'
import {removePerson,addPerson} from '../redux/action'

export const addOrdersIdToUser = (user,dispatch,id) => {
  let userOrders = user.orders || []
  userOrders.push(id)
  user.orders=userOrders
  firebase.database().ref('users/'+user.uid+'/orders').set(user.orders)
  dispatch(addPerson(user))
}
