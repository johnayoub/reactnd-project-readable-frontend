import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { MdThumbDown, MdThumbUp } from 'react-icons/lib/md';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Post extends Component {
    handleUpVote = () => {
        this.props.upVotePost(this.props.post);
    };

    handleDownVote = () => {
        this.props.downVotePost(this.props.post);
    };

    render() {
        const post = this.props.post;
        const postInfo = <span>posted {<Moment date={post.timestamp} format="MMM DD 'YY"/>} @
            <Moment date={post.createdOn} format="LT"/> by {post.author}, {post.commentsCount} replied</span>;

        const style = {icon: {width: 12, height: 12}, button: {width: 12, height: 12, padding: 0}};

        return (<div className="post">
            <h1 className="mdc-typography--title">{post.title}</h1>
            <div className="mdc-typography--caption">
                {post.voteScore} {' '}
                <IconButton className="voting-button" style={style.button} iconStyle={style.icon}
                            onClick={this.handleUpVote}>
                    <MdThumbUp/>
                </IconButton>
                {' '}
                <IconButton className="voting-button" style={style.button} iconStyle={style.icon}
                            onClick={this.handleDownVote}>
                    <MdThumbDown/>
                </IconButton>{' '}
                {postInfo}
            </div>
        </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        upVotePost: post => dispatch(actions.upVotePost(post)),
        downVotePost: post => dispatch(actions.downVotePost(post))
    };
};

Post.PropTypes = {
    post: PropTypes.shape({
        author: PropTypes.string,
        commentsCount: PropTypes.number,
        createdOn: PropTypes.object,
        voteScore: PropTypes.number
    })
};

export default connect(undefined, mapDispatchToProps)(Post);