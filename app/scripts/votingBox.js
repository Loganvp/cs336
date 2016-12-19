
//external/local imports required by this module…
import React from 'react';
import $ from 'jquery';
import SquadronListA from './squadronListA';
import SquadronForm from './squadronForm';
import style from '../css/style.css';
import { API_URL, POST_URL, POLL_INTERVAL } from './global';
import { Router, Route, Redirect, browserHistory } from 'react-router';



//Made module.exports for all .js files
module.exports = React.createClass({
  loadSquadronFromServer: function() {
    $.ajax({
      url: API_URL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  // handleButtonSubmit: function() {
  //   $.ajax({
  //     url: API_URL,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(API_URL, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  handleMatchupSubmit: function(result) {
    var squadronNumber = this.state.data.map(function(squadron){
      return (
        <names>{squadron.squadron} </names>
      )
    });
    var arr = $.makeArray(squadronNumber);

    var jsonResult = (
      {"valueone": result.valueone, "valuetwo": result.valuetwo, "squadronA": 5, "squadronB": 6}
    );

    $.ajax({
    url: POST_URL,
    dataType: 'json',
    type: 'POST',
    data: jsonResult,
    success: function(data) {
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(POST_URL, status, err.toString());
    }.bind(this)
  });
},
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadSquadronFromServer();
  },
  render: function() {
      return (
        <div className={style.votingBox}>
        <SquadronListA data = {this.state.data}/>

        <SquadronForm onMatchupSubmit = {this.handleMatchupSubmit}/>
        </div>
        )
    }
});
