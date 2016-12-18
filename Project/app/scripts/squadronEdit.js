/*
 *  Taken from here: https://cs.calvin.edu/courses/cs/336/kvlinden/12router/code/commentEdit.js
 */

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { API_URL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(squadronItems) {
            this.setState(squadronItems[0]);
        }.bind(this));
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function() {
        var updatedSquadronItem = {
            author: this.state.author.trim(),
            text: this.state.text.trim()
        }
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedSquadronItem)
        })
            .done(function(squadronItems){
                this.context.router.push('/');
            }.bind(this))
            .fail(function(xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    //  @author:  Loganvp
    handleDelete: function() {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
            contentType:'application/json'
        })
            .done(function(squadronItems){
                this.context.router.push('/');
            }.bind(this))
            .fail(function(xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },

    render: function() {
        return (
            <div>
                <form className="squadronForm">
                    <h1>SquadronItem Edit - {this.state.id}</h1>
                    <input
                        type="text"
                        value={this.state.author}
                        onChange={this.handleAuthorChange}
                    />
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});