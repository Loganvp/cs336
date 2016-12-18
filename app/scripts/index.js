import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import style from '../css/style.css';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';
import $ from 'jquery';

import MainWindow from './mainWindow';
import ResultsBox from './resultsBox';
import VotingBox from './votingBox';
import InitialPage from './initialPage';
import NavBar from './navBar';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path = "/" component={MainWindow}>
      <IndexRoute component={InitialPage} />
      <Route path="/voting" component={VotingBox} />
      <Route path="/results" component={ResultsBox} />
    </Route>
  </Router>
), document.getElementById('content'));
