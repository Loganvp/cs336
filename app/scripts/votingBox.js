
//external/local imports required by this module…
import React from 'react';
import $ from 'jquery';
import SquadronListA from './squadronListA';
import SquadronListB from './squadronListB';
import SquadronForm from './squadronForm';
import style from '../css/style.css';
import { API_URL, POLL_INTERVAL } from './global';


//Made module.exports for all .js files
module.exports = React.createClass({
    render: function() {
        return (
          <div className={style.votingBox}>
            <SquadronListA />
            <SquadronListB />
            <SquadronForm />
          </div>
        )
    }
});
