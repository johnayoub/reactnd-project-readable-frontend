import { combineReducers } from 'redux';
import * as actions from '../actions';

const UI_INITIAL_STATE = {
    postSortField: 'voteScore',
    postSortDirection: 'desc',
    commentSortField: 'voteScore',
    commentSortDirection: 'desc',
    viewLoading: false
};

const EDIT_POST_INITIAL_STATE = {
    categories: [],
    post: {
        title: '',
        body: '',
        category: ''
    },
    errors: {
        title: '',
        body: '',
        category: ''
    }
};

const CURRENT_POST_INITIAL_STATE = {
    post: {},
    comments: [],
    commentToEdit: null
};

function updateItemVoteScore(item, voteScore) {
    return {
        ...item,
        voteScore
    };
}

function posts(state = [], action) {
    switch (action.type) {
        case actions.RECEIVE_POSTS:
            return action.posts;
        case actions.UPDATE_POST_VOTE_SCORE:
            const postToUpdate = state.filter(post => post.id === action.post.id)[0];

            if (!postToUpdate) {
                return state;
            }

            return [...state.filter(post => post.id !== action.post.id),
                updateItemVoteScore(postToUpdate, action.post.voteScore)];
        default:
            return state;
    }
}

function currentPost(state = CURRENT_POST_INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_CURRENT_POST:
            return action.currentPost;
        case actions.UPDATE_POST_VOTE_SCORE:
            if (state.post.id !== action.post.id) {
                return state;
            }

            return {
                ...state,
                post: updateItemVoteScore(state.post, action.post.voteScore)
            };
        case actions.UPDATE_COMMENT_VOTE_SCORE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id !== action.comment.id) {
                        return comment;
                    }

                    return updateItemVoteScore(comment, action.comment.voteScore);
                })
            };
        case actions.REMOVE_POST_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.commentId)
            };
        case actions.ADD_POST_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            };
        case actions.SET_COMMENT_TO_EDIT:
            return {
                ...state,
                commentToEdit: action.commentId
            };
        case actions.UPDATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments.filter(c => c.id !== action.comment.id), action.comment]
            };
        default:
            return state;
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case actions.RECEIVE_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

function editPost(state = EDIT_POST_INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_EDIT_POST:
            return {
                ...state,
                categories: action.categories || state.categories,
                post: action.post || state.post
            };
        case actions.SET_EDIT_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.post
                }
            };
        case actions.SET_EDIT_POST_ERRORS:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.errors
                }
            };
        case actions.RESET_EDIT_POST:
            return EDIT_POST_INITIAL_STATE;
        default:
            return state;
    }
}

function ui(state = UI_INITIAL_STATE, action) {
    switch (action.type) {
        case actions.SET_POST_SORT_FIELD:
            return {
                ...state,
                postSortField: action.field
            };
        case actions.SET_POST_SORT_DIRECTION:
            return {
                ...state,
                postSortDirection: action.direction
            };
        case actions.SET_COMMENT_SORT_FIELD:
            return {
                ...state,
                commentSortField: action.field
            };
        case actions.SET_COMMENT_SORT_DIRECTION:
            return {
                ...state,
                commentSortDirection: action.direction
            };
        case actions.SET_VIEW_LOADING:
            return {
                ...state,
                viewLoading: action.viewLoading
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    posts,
    currentPost,
    editPost,
    categories,
    ui
});

export default reducer;