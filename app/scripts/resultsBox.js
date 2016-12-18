import React from 'react';
import style from '../css/style.css';
import ResultList from './resultList';
import $ from 'jquery';

import { API_URL, POST_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({

  loadMatchupsFromServer: function() {
    $.ajax({
      url: POST_URL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadMatchupsFromServer();
    setInterval(this.loadMatchupsFromServer, POLL_INTERVAL);
  },
  render: function() {
    return (
      <div className={style.resultsBox}>
        <h2>Results</h2>
        <ResultList data = {this.state.data}/>
      </div>
    );
  }
});
