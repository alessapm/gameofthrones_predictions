import React, { Component } from 'react';
import update from 'react-addons-update';
import Axios from 'axios';

import Banner from '../../styles/images/throne.jpg';

export default class Predictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      user_email: "",
      user_name: ""
    }
  }

  componentDidMount(){
    this.setState({user_email: window.localStorage.getItem('user_email')})
    this.setState({user_id: window.localStorage.getItem('user_id')});
    this.setState({user_name: window.localStorage.getItem('user_name')});

    console.log('user id: ', this.state.user_id)
  }

  showID(){
    console.log('user id: ', this.state.user_id)
  }
  render(){
    return(
      <div>
        <h1>Hello {this.state.user_name}</h1>
        <button onClick={this.showID.bind(this)} value="click" />
      </div>
    )
  }
}
