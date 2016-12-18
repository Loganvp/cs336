//external/local imports required by this module…
import React from 'react';
import NavBar from "./navBar";
import style from '../css/style.css';


//Made module.exports for all .js files
module.exports = React.createClass({
    render: function() {
        return (
          <div className={style.mainWindow}>
            <NavBar />
            {this.props.children}
          </div>
        );
    }
});
