
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import style from '../css/style.css';


module.exports = React.createClass({
    render: function() {
        return (
          <div className="{style.Result}">
          <div className="SquadInfo">Squadron {this.props.squadron1} beats
          Squadron {this.props.squadron2} {this.props.percentage}% of the time
          </div>

            </div>
        );
    }
});
