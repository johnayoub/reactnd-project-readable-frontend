import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostByLine from './PostByLine';

class Post extends Component {
    render() {
        const post = this.props.post;

        return (<div className="post">
            <h1 className="mdc-typography--title">
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            </h1>
            <PostByLine post={post} commentsCount={post.commentsCount}/>
        </div>);
    }
}

Post.PropTypes = {
    post: PropTypes.shape({
        author: PropTypes.string,
        commentsCount: PropTypes.number,
        timestamp: PropTypes.object,
        voteScore: PropTypes.number
    })
};

export default Post;