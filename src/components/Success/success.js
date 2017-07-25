import React, { Component } from 'react';
import update from 'react-addons-update';
import Axios from 'axios';
import { Link, browserHistory } from 'react-router';
import Sigils from '../../styles/images/sigils.jpg';


export default class Success extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="predictions-container">
        <h1>Success! Your predictions have been entered. </h1>
        <p> Feel free to login <Link to="/login"> here </Link> to check on your predictions throughout the season. </p>
        <img src={Sigils} className="sigils" />
      </div>
    )
  }
}
