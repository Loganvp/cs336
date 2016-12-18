import React from 'react'
import style from '../css/style.css'

import VotingBox from './votingBox';
import ResultsBox from './resultsBox';


module.exports = React.createClass({
  render: function() {
    return (
      <div className={style.initialPage}>
        <VotingBox />
        <ResultsBox />
      </div>
    );
  }
});
