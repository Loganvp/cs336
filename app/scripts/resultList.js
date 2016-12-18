//This was split off because of Exercise 9.2

//external/local imports required by this module…
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Result from './result'
import style from '../css/style.css';

//Made module.exports for all .js files
module.exports = React.createClass({
    render:function() {
      var MatchupNodes = this.props.data.map(function(result) {
        return (
          <Result squadron1={result.squadron1} squadron2={result.squadron2}
          percentage={result.percentage} >
          </Result>

        );
      });
        return (
            <div className="{style.squadronListA}">
                {MatchupNodes}
            </div>
        );
    }
});
