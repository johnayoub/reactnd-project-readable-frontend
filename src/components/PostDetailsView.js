import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import PostByLine from './PostByLine';
import Comment from './Comment';
import AddComment from './AddComment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import sortBy from 'sort-by';

class PostDetailsView extends Component {
    handleSortField = (event, index, value) => {
        this.props.setSortField(value);
    };

    handleSortDirection = (event, index, value) => {
        this.props.setSortDirection(value);
    };

    handleDelete = () => {
        this.props.deletePost(this.props.currentPost.post.id);
    };

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postId);
    }

    render() {
        const {post, comments, commentToEdit} = this.props.currentPost;

        return (
            <div className="view view-post-details">
                <div className="post-details">
                    <h1 className="mdc-typography--title">
                        {post.title}
                        <span className="post-actions">
                            <span className="post-action">
                                <Link to={`/posts/${post.id}/edit`}>edit</Link>
                            </span>
                            <span className="post-action" onClick={this.handleDelete}>delete</span>
                        </span>
                    </h1>
                    <PostByLine post={post} commentsCount={comments.length}/>
                    <div className="mdc-typography--body1">
                        {post.body}
                    </div>
                </div>
                <div className="post-comments">
                    <div className="view-controls-container">
                        <div className="view-controls view-controls-sort">
                            <SelectField value={this.props.sortField} floatingLabelText="Sort by"
                                         onChange={this.handleSortField}>
                                <MenuItem value="voteScore" primaryText="Vote score"/>
                                <MenuItem value="timestamp" primaryText="Created on"/>
                            </SelectField>
                            <SelectField value={this.props.sortDirection} floatingLabelText="Sort direction"
                                         onChange={this.handleSortDirection}>
                                <MenuItem value="asc" primaryText="A-Z"/>
                                <MenuItem value="desc" primaryText="Z-A"/>
                            </SelectField>
                        </div>
                    </div>
                    {comments.length === 0 ? <div>No comments :(</div>
                        : comments.map(comment => (
                            <Comment key={comment.id} comment={comment}
                                     edit={commentToEdit === comment.id}/>
                        ))}
                </div>
                <AddComment postId={post.id}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const sortField = state.ui.commentSortField,
        sortDirection = state.ui.commentSortDirection;

    const comments = [...state.currentPost.comments];

    comments.sort(sortBy(`${sortDirection === 'asc' ? '' : '-'}${sortField}`));

    return {
        sortField,
        sortDirection,
        currentPost: {
            ...state.currentPost,
            comments
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPost: (postId) => dispatch(actions.loadPostDetailsViewContent(postId)),
        setSortField: (field) => dispatch(actions.setCommentSortField(field)),
        setSortDirection: (direction) => dispatch(actions.setCommentSortDirection(direction)),
        deletePost: postId => dispatch(actions.deletePost(postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);