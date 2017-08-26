import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default class PostList extends React.Component {
    render() {
        const posts = this.props.posts.map(post => {
            return <Post key={post.id} post={post}/>
        });

        return (
            <div className="posts">
                {posts}
            </div>
        );
    }
}

PostList.PropTypes = {
    posts: PropTypes.array
};