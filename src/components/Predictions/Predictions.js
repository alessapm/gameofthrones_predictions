import React, { Component } from 'react';
import update from 'react-addons-update';
import Axios from 'axios';

import Sigils from '../../styles/images/sigils.jpg';

export default class Predictions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      user_email: "",
      user_name: "",
      predictions: {},
      error: "",
      predictions_arr: []
    }
  }

  componentDidMount(){
    this.setState({user_email: window.localStorage.getItem('user_email')})
    this.setState({user_id: window.localStorage.getItem('user_id')});
    this.setState({user_name: window.localStorage.getItem('user_name')});

    console.log('user id: ', this.state.user_id)
  }

  showID(){
    console.log('user id: ', this.state.user_id);
    console.log('predictions: ', this.state.predictions.pred1);
  }

  makePredictionsArr(){
    let predictions = [this.state.predictions.pred1, this.state.predictions.pred2, this.state.predictions.pred3, this.state.predictions.pred4, this.state.predictions.pred5, this.state.predictions.pred6]
    this.setState({predictions_arr: predictions});

  }

  submitPredictions(){
    if (this.state.predictions_arr !== []) {
      Axios.post(`http://localhost:8000/predictions/${this.state.user_id}`, {
        predictions: this.state.predictions_arr,
        email: this.state.user_email,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        console.log('success!')
      })
      .catch(err => console.log('err in submitPredictions: ', err))
    }
  }

  handleChange(event){
    let newState = update(this.state, {
      predictions: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('handlesubmit clicked');
    if (!this.state.predictions.pred1 || !this.state.predictions.pred2 || !this.state.predictions.pred3 || !this.state.predictions.pred4 || !this.state.predictions.pred5 || !this.state.predictions.pred6){
      this.setState({error: 'Please fill out all 6 predictions'})
    } else {
      this.makePredictionsArr();
    }
  }

  render(){
    return(
      <div className="predictions-container">
        <h1>Hello, {this.state.user_name}</h1>
        <button onClick={this.showID.bind(this)} value="click" />
        <img src={Sigils} className="sigils" />
        <p> Here are the rules: Enter up to 6 predictions for season 7 of Game of Thrones, anything that has already happened or has been heavily alluded to does not count. Also, anything that you predict that might happen in the final season (season 8) does not count. It has to happen in season 7, okay?  Good luck, there's no editing these once they are submitted!<br /><br />
        At the end of the season I'll announce a winner with the most correct predictions through email or facebook or something </p>
        <div className="prediction-container">
          <p className="error">{this.state.error}</p>
          <form className="user-form" onSubmit={this.handleSubmit.bind(this)}>
            <label>Prediction #1: </label>
            <input name="pred1" onChange={this.handleChange.bind(this)} /><br/><br/>
            <label>Prediction #2: </label>
            <input name="pred2" onChange={this.handleChange.bind(this)} /><br/><br/>
            <label>Prediction #3: </label>
            <input name="pred3" onChange={this.handleChange.bind(this)} /><br/><br/>
            <label>Prediction #4: </label>
            <input name="pred4" onChange={this.handleChange.bind(this)} /><br/><br/>
            <label>Prediction #5: </label>
            <input name="pred5" onChange={this.handleChange.bind(this)} /><br/><br/>
            <label>Prediction #6: </label>
            <input name="pred6" onChange={this.handleChange.bind(this)} /><br/><br/>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
