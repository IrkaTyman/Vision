import React from 'react'
import {connect} from 'react-redux'

import {ButtonRed} from '../../ButtonRed/ButtonRed'

const PersonBlock = (props) => {
  return(
    <div className="person_block__wrapper">
      <img className="person_block__img" src = {props.user.img}/>
      <ButtonRed type="button" disabled = "false" text = "Редактировать" />
      <hr/>
      <div className="person_block__info">
        <p className="person_block__info_name">{props.user.username}</p>
        <p className="person_block__info_status">{props.user.status=='perfomer' ? 'Дизайнер' : 'Пользователь'}</p>
        <p className="person_block__info_balance">Баланс: 111</p>
      </div>
    </div>
  )
}

let mapStateToProps = state => ({
  user:state.register.user
})

export default connect(mapStateToProps)(PersonBlock)
