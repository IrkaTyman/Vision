import React from 'react'
import '../profile.css'
import {MenuItem} from './MenuItem'
import {connect} from 'react-redux'

import home from '../../../img/home.svg'
import cart from '../../../img/cart.svg'
import wallet from '../../../img/wallet.svg'
import support from '../../../img/support.svg'
import question from '../../../img/question.svg'

const Menu = (props) => {
  return(
    <div className="menu-wrapper">
      <MenuItem img = {home} text = "Мой профиль" src = "/home" />
      <MenuItem img = {cart} text = "Мои заказы" src = "/cart" />
      <MenuItem img = {wallet} text = "Мой баланс" src = "/balance" />
      <MenuItem img = {support} text = "Поддержка" src = "/support" />
      <MenuItem img = {question} text = "Справка" src = "/question" />
      {props.status == 'performer' ? <Menu img = {home} text = "Учебный центр" src="/learn"/> : null}
    </div>
  )
}

let mapStateToProps = state => ({
  status:state.register.user.status
})

export default connect(mapStateToProps)(Menu)
