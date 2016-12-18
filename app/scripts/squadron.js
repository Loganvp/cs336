
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import style from '../css/style.css';


module.exports = React.createClass({
    render: function() {
        return (
          <div className="{style.Squadron}">
          <h2 className="SquadNumber">Squad: {this.props.squadron}</h2>
          <div className="SquadInfo"> {this.props.faction}, {this.props.points},
          {this.props.names}
          </div>

          </div>
        );
    }
});
