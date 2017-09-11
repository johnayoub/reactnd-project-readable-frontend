import React, { Component } from 'react';
import Moment from 'react-moment';
import { MdThumbDown, MdThumbUp } from 'react-icons/lib/md';
import IconButton from 'material-ui/IconButton';
import * as actions from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Comment extends Component {
    handleUpVote = () => {
        this.props.upVoteComment(this.props.comment);
    };

    handleDownVote = () => {
        this.props.downVoteComment(this.props.comment);
    };

    handleDelete = () => {
        this.props.deleteComment(this.props.comment.id);
    };

    handleEdit = () => {
        this.props.editComment(this.props.comment.id);
    };

    handleCancelEdit = () => {
        this.props.editComment(null);
    };

    handleUpdate = () => {
        const commentValue = this.input.getValue();

        if (!commentValue) {
            return;
        }

        this.props.updateComment({id: this.props.comment.id, body: commentValue});

    };

    render() {
        const {comment, edit} = this.props;

        const commentInfo = <span>posted {<Moment date={comment.timestamp} format="MMM DD 'YY"/>} @
            <Moment date={comment.timestamp} format="LT"/> by {comment.author}</span>;

        const style = {icon: {width: 12, height: 12}, button: {width: 12, height: 12, padding: 0}};

        if (edit) {
            return (
                <div className="comment">
                    <TextField ref={input => this.input = input} defaultValue={comment.body}
                               floatingLabelText="Update comment"/>
                    <br/>
                    <RaisedButton label="Cancel" onClick={this.handleCancelEdit} style={{marginRight: 10}}/>
                    <RaisedButton label="Update" primary={true} onClick={this.handleUpdate}/>
                </div>
            );
        }

        return (
            <div className="comment">
                <div className="mdc-typography--body1">
                    {comment.body}
                    <span className="comment-actions">
                            <span className="comment-action" onClick={this.handleEdit}>
                                edit
                            </span>
                            <span className="comment-action" onClick={this.handleDelete}>delete</span>
                        </span>
                </div>
                <div className="mdc-typography--caption">
                    {comment.voteScore} {' '}
                    <IconButton className="voting-button" style={style.button} iconStyle={style.icon}
                                onClick={this.handleUpVote}>
                        <MdThumbUp/>
                    </IconButton>
                    {' '}
                    <IconButton className="voting-button" style={style.button} iconStyle={style.icon}
                                onClick={this.handleDownVote}>
                        <MdThumbDown/>
                    </IconButton>{' '}
                    {commentInfo}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        upVoteComment: comment => dispatch(actions.upVoteComment(comment)),
        downVoteComment: comment => dispatch(actions.downVoteComment(comment)),
        deleteComment: commentId => dispatch(actions.deleteComment(commentId)),
        editComment: commentId => dispatch(actions.setCommentToEdit(commentId)),
        updateComment: comment => dispatch(actions.editComment(comment))
    };
};

export default connect(undefined, mapDispatchToProps)(Comment);