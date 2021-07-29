import React from 'react'
import {connect} from 'react-redux'
import down from '../../../img/down.svg'

import {Logo} from '../Logo'

const Header = (props) => {
  const modalMenuHandler = () => {
    const modalMenu = document.querySelector('.modal-menu')
    modalMenu.classList.toggle('visible');
  }

  return (
    <div className="header-wrapper">
      <div className="header flex-al-c">
        <Logo/>
        <div className="header__user-info flex-al-c">
          <p>{props.user.username}</p>
          <div className="user-avatar flex-al-c">
            <img className="user-avatar__img" src = {props.user.img}/>
            <button onClick = {modalMenuHandler}><img src={down}/></button>
            <div className="modal-menu">
              <a>Настройки</a>
              <a onClick = {() => props.signOut()}>Выйти</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

let mapStateToProps = state => ({
  user:state.register.user
})

export default connect(mapStateToProps)(Header)
