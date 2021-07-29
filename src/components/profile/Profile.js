import React from 'react'
import {connect} from 'react-redux'
//import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Menu from './menu/Menu'
import Header from './header/Header'
import {Home} from './home/Home'


 const Profile = (props) => {
  console.log(props.user)
  return (
    <Router>
      <div className="profile">
        <Header signOut = {props.signOut}/>
        <main>
          <Menu/>
          <div className="main-page__wrapper">
            <Switch>
              <Route path="/home" component = {Home} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  )
}

let mapStateToProps = state => ({
  user:state.register.user
})

export default Profile
