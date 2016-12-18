//This was split off because of Exercise 9.2

//external/local imports required by this module…
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Squadron from './squadron';
import style from '../css/style.css';

//Made module.exports for all .js files
module.exports = React.createClass({
    render:function() {
      var SquadronNodes = this.props.data.map(function(squadron) {

        var PilotNames = squadron.pilots.map(function(pilot) {
          return (
            <names>{pilot.name}, </names>
          )
        });

        return (
          <Squadron squadron={squadron.squadron} faction={squadron.faction}
          points = {squadron.points} names={PilotNames} key={squadron.squadron}>
          </Squadron>
        );
      });
        return (
            <div className="{style.squadronListA}">
                {SquadronNodes}
            </div>
        );
    }
});
