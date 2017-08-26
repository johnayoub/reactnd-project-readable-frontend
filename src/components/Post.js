import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class Post extends Component {
    render() {
        const post = this.props.post;

        return (<div className="post">
            <h1 className="mdc-typography--title">{post.title}</h1>
            <div className="mdc-typography--caption">
                posted <Moment date={post.timestamp} format="MMM DD 'YY"/> @
                {' '}<Moment date={post.timestamp} format="LT"/> {' '}
                by {post.author}, {post.commentsCount} replied
            </div>
        </div>);
    }
}

Post.PropTypes = {
    author: PropTypes.string,
    commentsCount: PropTypes.number,
    createdOn: PropTypes.object
};

export default Post;