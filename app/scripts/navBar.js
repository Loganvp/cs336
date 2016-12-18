import React from 'react';
import style from '../css/style.css';
import { Link, IndexLink } from 'react-router';



module.exports = React.createClass({
  render: function() {
    return (
      <div className={style.navBar}>
      <ul role="navBar">
        <IndexLink to="/"><li>Home</li></IndexLink>
        <Link to = "/voting"><li>Voting</li></Link>
        <Link to = "/results"><li>Results</li></Link>
        <a href = "http://lists.starwarsclubhouse.com/" target="_blank">ListJuggler</a>
      </ul>
      </div>
    )
  }
});
