//This was split off because of Exercise 9.2

//external/local imports required by this module…
import React from 'react';
import $ from 'jquery';
import CommentList from './commentList';
import CommentForm from './commentForm';
import { store, ActionTools } from './flux';


//Made module.exports for all .js files
module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
        this.setState({
            data: store.getState().data
        });
    });
  },
  componentWillUnmount: function() {
      this.unsubscribe();
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    store.dispatch(ActionTools.addComment(comment));
  },
  console.log(POLL_INTERVAL);
  setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
},
render: function() {
  return (
    <div className="commentBox">
    <h1>Comments</h1>
    <CommentList data={this.state.data} />
    <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>
  );
}
});
