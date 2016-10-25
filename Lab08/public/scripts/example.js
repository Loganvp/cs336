/* React is all about modular, composable components.
 *
 *- CommentBox
 * - CommentList
 *  - Comment
 * - CommentForm
 *
 * @author: LoganVP
 * @date:   10/24/16
 *
 * This tutorial: https://web.archive.org/web/20161019043332/https://facebook.github.io/react/docs/tutorial.html
 *
 */

 // tutorial4 & 6 & 7
 var Comment = React.createClass({
   //This is a special API that intentionally makes it difficult to insert raw HTML
   rawMarkup: function() {
     // var md = new Remarkable();
     // var rawMarkup = md.render(this.props.children.toString());
     var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
     return { __html: rawMarkup };
   },

   render: function() {
     //var md =new Remarkable(); //takes Markdown text and converts it to raw HTML. **tutorial6
     return (
       <div className="comment">
         <h2 className="commentAuthor">
           {this.props.author}
         </h2>
         //{this.props.children} **tutorial4
         //{md.render(this.props.children.toString())} **tutorial6
         <span dangerouslySetInnerHTML={this.rawMarkup()} /> //**tutorial7
       </div>
     );
   }
 });

// tutorial1&3
var CommentBox = React.createClass({
  loadCommentsFromServer: function() { //tutorial14
  // tutorial13
  //componentDidMount: function() { **tutorial13
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //made the callback available to commentform by this prop
  //submit to the server and refresh the list:
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  // tutorial12 Setting the state
  getInitialState: function() {
    return {data: []};
  },
  // tutorial14
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        //Hello, world! I am a comment box. **tutorial1
        <h1>Comments!</h1>
        //<CommentList data={this.props.data} /> **tutorial10
        <CommentList data={this.state.data} // tutorial11
        <CommentForm onCommentSubmit={this.handleCommentSubmit} /> // tutorial18
      </div>
    );
  }
});

// tutorial2&5
var CommentList = React.createClass({
  //let's render the comments dynamically **tutorial10
  render: function()  {
    return commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        //Hello, world! I am a CommentList. **tutorial2
        //<Comment author="Logan VanProyen">This is my first comment</Comment> **tutorial5
        //<Comment author="Abe Lincoln">This is a *truthful* comment</Comment> **tutorial5
        {commentNodes} //tutorial10
        </div>
    );
  }
});

// tutorial2
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text   = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text}); //callbacks
    this.setState({author: '', text: ''}); //clears the form when submitted
  },
  render: function() {
    return (
      //<div className="commentForm">Hello, world! I am a CommentForm.</div> **tutorial2
      // tutorial15 & 16
      // Subsequently, the rendered value of the input element will be updated to reflect the current component state.
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Logan"
          value={this.state.author}
          onChange={this.handleAuthorChange}
          />
        <input
          type="text"
          placeholder="This is a really long tutorial"
          value={this.state.text}
          onChange={this.handleTextChange}
          />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


// tutorial8
// JSON stuff that will come from the server in the future.
// var data = [
//   {id: 1, "Logan VaProyen", text: "This is my first comment!"};
//   {id: 2, "Abe Lincoln"   , text: "This is a *truthful* comment"}
// ];

/* Keep this at the bottom.
 * Should only be called after the composite components
 * have been defined.
 */
ReactDOM.render(
  //<commentBox />, **tutorial1
  //<CommentBox data={data} />, **tutorial9
  //<CommentBox url="/public/scripts/comments" />,
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
