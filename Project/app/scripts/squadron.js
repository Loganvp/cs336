
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import style from '../css/style.css';


module.exports = React.createClass({
    render: function() {
        return (
          <div className={style.squadron}>
          <h2 className="SquadNumber">Squad: {this.props.squadron}</h2>
          <div className="SquadFaction"><b>Faction:</b> {this.props.faction}</div>
          <div className="SquadPoints"><b>Points:</b> {this.props.points}</div>
          <div className="SquadPilots"><b><u>Pilots</u></b> {this.props.names}</div>

          </div>
        );
    }
});
