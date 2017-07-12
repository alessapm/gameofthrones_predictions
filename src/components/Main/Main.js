import React, { Component } from 'react';
import update from 'react-addons-update';
import Axios from 'axios';

import Banner from '../../styles/images/throne.jpg';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: ''
    }
  }

  submitNewUser(){
    Axios.post(`localhost:8000/users/`, {
      user: this.state.user,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => console.log('new user created'))
    .catch(err => console.log('error in new user submit'))
  }

checkPassword(){
  if (!this.state.user.password || !this.state.user.confirm) {
    this.setState({error: 'Please enter a password and password confirmation'})
  } else if (this.state.user.password !== this.state.user.confirm) {
    this.setState({error: 'Password and confirmation do not match'})
  } else {
    this.submitNewUser()
  }
}

emailValidation(email){
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

handleSubmit(event){
  event.preventDefault();
  this.setState({error: ''});
  console.log('handle submit');
  if (this.state.user.name) {
    let checkEmail = this.emailValidation(this.state.user.email);
    checkEmail ? this.checkPassword() : this.setState({error: 'Please enter a valid email address'});
  } else {
    this.setState({error: 'Please enter your full name'})
  }
}

handleChange(event){
    let newState = update(this.state, {
      user: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }


  render() {

   return(
    <div>
      <header>
        <img className="banner" src={ Banner } />
        <p> Season 7 Predictions </p>
      </header>
      <main>
        <p>The only thing better than watching Game of Thrones is proving that you knew what was going to happen on Game of Thrones. <br/><br/>
        Sign up and prove yourself to the old gods and the new!</p>
        <form className="user-form" onSubmit={this.handleSubmit.bind(this)}>
          <h2 className="error">{ this.state.error }</h2>
          <label>Name: </label><br/>
            <input name="name"
              onChange={this.handleChange.bind(this)}
              type='text'
              placeholder="Enter Full Name" />
              <br /><br />

              <label>Email Address: </label><br/>
              <input name="email"
              onChange={this.handleChange.bind(this)}
              type='text'
              placeholder="Enter Email" />
              <br /><br />

              <label>Password: </label><br/>
              <input name="password"
              onChange={this.handleChange.bind(this)}
              type='password'
              placeholder="Enter password" /><br /><br />

              <label>Confirm Password: </label><br/>
              <input name="confirm"
              onChange={this.handleChange.bind(this)}
              type='password'
              placeholder="Enter confirm password" /><br /><br />

              <button type="submit" className="submit-btn">Submit</button>
        </form>
      </main>
    </div>

    )
  } //closes render

} //closes class Main
