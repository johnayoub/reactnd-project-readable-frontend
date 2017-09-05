import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostByLine from './PostByLine';
import Comment from './Comment';
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
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                </div>
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
        setSortDirection: (direction) => dispatch(actions.setCommentSortDirection(direction))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);