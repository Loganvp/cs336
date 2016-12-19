//This was split off because of Exercise 9.2

//Sliders will be difficult https://github.com/whoisandie/react-rangeslider

//external/local imports required by this module…
import React from 'react';
import $ from 'jquery';
import style from '../css/style.css';


//Made module.exports for all .js files
module.exports = React.createClass({
  getInitialState: function() {
    return {valueone: 50, valuetwo: 50};
  },
  handleValueOneChange: function(e) {
    var one = e.target.value;
    var two = 100 - one;
    this.setState({valueone: one});
    this.setState({valuetwo: two});
  },
  handleValueTwoChange: function(e) {
    var two = e.target.value;
    var one = 100 - two;
    this.setState({valueone: one});
    this.setState({valuetwo: two});
  },
  handleSubmit: function(e) {
    var one = this.state.valueone;
    var two = this.state.valuetwo;
    if (one < 0 || one > 100 || two < 0 || two > 100 ) {
      return;
    }
    this.props.onMatchupSubmit({valueone: one, valuetwo: two})
    this.setState({valueone: 50, valuetwo: 50});
  },
  // handleButton: function() {
  //   this.props.onMatchupSubmit()
  //   this.setState({valueone: 50, valuetwo: 50});
  // },
  render: function() {
    return (
      <form className={style.squadronForm} onSubmit={this.handleSubmit}>
        <input className="ui-widget ui-corner-all"
          type="number"
          placeholder='50'
          value={this.state.valueone}
          onChange={this.handleValueOneChange}
          />
          <input className="ui-widget ui-corner-all"
          type="number"
          placeholder='50'
          value={this.state.valuetwo}
          onChange={this.handleValueTwoChange}
          />
          <input className="ui-button ui-widget ui-corner-all" type="submit" value="SUBMIT" />
      </form>
    );
  }
});
