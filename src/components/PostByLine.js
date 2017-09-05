import React, { Component } from 'react';
import { MdThumbDown, MdThumbUp } from 'react-icons/lib/md';
import IconButton from 'material-ui/IconButton';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PostByLine extends Component {
    handleUpVote = () => {
        this.props.upVotePost(this.props.post);
    };

    handleDownVote = () => {
        this.props.downVotePost(this.props.post);
    };

    render() {
        const { post, commentsCount } = this.props;

        const postInfo = <span>posted {<Moment date={post.timestamp} format="MMM DD 'YY"/>} @
            <Moment date={post.timestamp} format="LT"/> by {post.author}, {commentsCount} replied</span>;

        const style = {icon: {width: 12, height: 12}, button: {width: 12, height: 12, padding: 0}};

        return (
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
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        upVotePost: post => dispatch(actions.upVotePost(post)),
        downVotePost: post => dispatch(actions.downVotePost(post))
    };
};

export default connect(undefined, mapDispatchToProps)(PostByLine);