import React, { Component } from 'react';
import Moment from 'react-moment';
import { MdThumbDown, MdThumbUp } from 'react-icons/lib/md';
import IconButton from 'material-ui/IconButton';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Comment extends Component {
    handleUpVote = () => {
        this.props.upVotePost(this.props.comment);
    };

    handleDownVote = () => {
        this.props.downVotePost(this.props.comment);
    };

    render() {
        const { comment } = this.props;

        const commentInfo = <span>posted {<Moment date={comment.timestamp} format="MMM DD 'YY"/>} @
            <Moment date={comment.timestamp} format="LT"/> by {comment.author}</span>;

        const style = {icon: {width: 12, height: 12}, button: {width: 12, height: 12, padding: 0}};

        return (
            <div className="comment">
                <div className="mdc-typography--body1">
                    {comment.body}
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
        upVotePost: post => dispatch(actions.upVoteComment(post)),
        downVotePost: post => dispatch(actions.downVoteComment(post))
    };
};

export default connect(undefined, mapDispatchToProps)(Comment);