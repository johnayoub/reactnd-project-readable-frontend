import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostByLine from './PostByLine';
import Comment from './Comment';

class PostDetailsView extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postId);
    }

    render() {
        const {post, comments} = this.props.currentPost;

        return (
            <div className="view view-post-details">
                <div className="post-details">
                    <h1 className="mdc-typography--title">
                        {post.title}
                    </h1>
                    <PostByLine post={post} commentsCount={comments.length}/>
                    <div className="mdc-typography--body1">
                        {post.body}
                    </div>
                </div>
                <div className="post-comments">
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentPost: state.currentPost
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPost: (postId) => dispatch(actions.fetchPost(postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);