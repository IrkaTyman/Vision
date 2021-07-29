import React from 'react'
import '../profile.css'
//import {NavLink} from 'react-router-dom'

export const MenuItem = (props) => {
  return(
    <NavLink to = {props.src}>
    <div className="menu-item">
      <img src={props.img}/>
      <p>{props.text}</p>
    </div>
    </NavLink>
  )
}
