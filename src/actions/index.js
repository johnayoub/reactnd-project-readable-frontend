import * as PostsAPI from '../api/post';
import * as CommentsAPI from '../api/comment';
import * as CategoriesAPI from '../api/category';
import history from '../history'

export const ADD_POST_COMMENT = 'ADD_POST_COMMENT';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';
export const RECEIVE_EDIT_POST = 'RECEIVE_EDIT_POST';
export const SET_POST_SORT_FIELD = 'SET_POST_SORT_FIELD';
export const SET_POST_SORT_DIRECTION = 'SET_POST_SORT_DIRECTION';
export const SET_COMMENT_SORT_FIELD = 'SET_COMMENT_SORT_FIELD';
export const SET_COMMENT_SORT_DIRECTION = 'SET_COMMENT_SORT_DIRECTION';
export const SET_VIEW_LOADING = 'SET_VIEW_LOADING';
export const SET_EDIT_POST = 'SET_EDIT_POST';
export const SET_EDIT_POST_ERRORS = 'SET_EDIT_POST_ERRORS';
export const SET_COMMENT_TO_EDIT = 'SET_COMMENT_TO_EDIT';
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE';
export const UPDATE_COMMENT_VOTE_SCORE = 'UPDATE_COMMENT_VOTE_SCORE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const RESET_EDIT_POST = 'RESET_EDIT_POST';
export const REMOVE_POST_COMMENT = 'REMOVE_POST_COMMENT';

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const receiveEditPost = editPost => ({
    type: RECEIVE_EDIT_POST,
    ...editPost
});

const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

const receiveCurrentPost = (post, comments) => ({
    type: RECEIVE_CURRENT_POST,
    currentPost: {
        post,
        comments
    }
});

const resetEditPost = () => ({
    type: RESET_EDIT_POST
});

const setViewLoading = viewLoading => ({
    type: SET_VIEW_LOADING,
    viewLoading
});

export const setPostSortField = field => ({
    type: SET_POST_SORT_FIELD,
    field
});

export const setPostSortDirection = direction => ({
    type: SET_POST_SORT_DIRECTION,
    direction
});

export const setCommentSortField = field => ({
    type: SET_COMMENT_SORT_FIELD,
    field
});

export const setCommentSortDirection = direction => ({
    type: SET_COMMENT_SORT_DIRECTION,
    direction
});

export const addPostComment = comment => ({
    type: ADD_POST_COMMENT,
    comment
});

export const removePostComment = commentId => ({
    type: REMOVE_POST_COMMENT,
    commentId
});

export const setEditPostError = errors => ({
    type: SET_EDIT_POST_ERRORS,
    errors: errors.reduce((ac, value) => {
        return {
            ...ac,
            ...value
        };
    }, {})
});

export const setCommentToEdit = commentId => ({
    type: SET_COMMENT_TO_EDIT,
    commentId
});

export const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
});

export const loadCategoryViewContent = () => dispatch => {
    dispatch(setViewLoading(true));

    return Promise.all([fetchPosts(), fetchCategories()])
        .then(result => {
            dispatch(receivePosts(result[0]));
            dispatch(receiveCategories(result[1]));
            dispatch(setViewLoading(false));
        });
};

export const setEditPost = post => ({
    type: SET_EDIT_POST,
    post: {
        ...post
    }
});

const updatePostScore = post => ({
    type: UPDATE_POST_VOTE_SCORE,
    post
});

const updateCommentScore = comment => ({
    type: UPDATE_COMMENT_VOTE_SCORE,
    comment
});

export const upVotePost = (post) => dispatch => {
    return PostsAPI.updateVoteScore(post.id, 'upVote')
        .then(updatedPost => dispatch(updatePostScore(updatedPost)));
};

export const downVotePost = (post) => dispatch => {
    return PostsAPI.updateVoteScore(post.id, 'downVote')
        .then(updatedPost => dispatch(updatePostScore(updatedPost)));
};

export const upVoteComment = (comment) => dispatch => {
    return CommentsAPI.updateVoteScore(comment.id, 'upVote')
        .then(updatedComment => dispatch(updateCommentScore(updatedComment)));
};

export const downVoteComment = (comment) => dispatch => {
    return CommentsAPI.updateVoteScore(comment.id, 'downVote')
        .then(updatedComment => dispatch(updateCommentScore(updatedComment)));
};

export const createPost = post => () => {
    return PostsAPI.createPost(post)
        .then(p => {
            history.push(`/${p.category}/${p.id}`);
        });
};

export const createComment = (postId, input) => dispatch => {
    return CommentsAPI.createComment(postId, input.getValue())
        .then(comment => {
            dispatch(addPostComment(comment));
            input.setValue('');
        });
};

export const editPost = (postId, post) => () => {
    return PostsAPI.editPost(postId, {title: post.title, body: post.body})
        .then(p => {
            history.push(`/${p.category}/${p.id}`);
        });
};

export const editComment = comment => dispatch => {
    return CommentsAPI.editComment(comment.id, {body: comment.body})
        .then(c => {
            dispatch(setCommentToEdit(null));
            dispatch(updateComment(c));
        });
};

export const loadPostDetailsViewContent = (postId) => dispatch => {
    dispatch(setViewLoading(true));

    return Promise.all([PostsAPI.fetchPost(postId), CommentsAPI.fetchComments(postId)])
        .then(result => {
            const [post, comments] = result;

            if (Object.keys(post).length !== 0) {
                dispatch(receiveCurrentPost(post, comments));
            }
            else {
                history.replace('/');
            }

            dispatch(setViewLoading(false));
        });
};

export const loadPostEditViewContent = postId => dispatch => {
    dispatch(setViewLoading(true));
    dispatch(resetEditPost());

    if (postId) {
        return Promise.all([PostsAPI.fetchPost(postId), fetchCategories()])
            .then(result => {
                dispatch(receiveEditPost({post: result[0], categories: result[1]}));
                dispatch(setViewLoading(false));
            });
    }

    return fetchCategories()
        .then(categories => {
            dispatch(receiveEditPost({categories}));
            dispatch(setViewLoading(false));
        });
};

const fetchPosts = () => {
    return PostsAPI.fetchPosts()
        .then(posts => {
            return Promise.all(posts.map(post => CommentsAPI.fetchComments(post.id)))
                .then(commentsByPost => {
                    posts.forEach((post, index) => {
                        post.commentsCount = commentsByPost[index].length;
                    });
                    return posts;
                });
        });
};

export const deletePost = (postId) => () => {
    return PostsAPI.deletePost(postId)
        .then(() => history.push('/'));
};

export const deleteComment = (commentId) => dispatch => {
    return CommentsAPI.deleteComment(commentId)
        .then(() => {
            dispatch(removePostComment(commentId));
        });
};

const fetchCategories = () => {
    return CategoriesAPI.getCategories();
};