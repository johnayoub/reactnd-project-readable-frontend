import { combineReducers } from 'redux';
import * as actions from '../actions';

const UI_INITIAL_STATE = {
    sortField: 'voteScore',
    sortDirection: 'asc',
    viewLoading: false
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

function currentPost(state = {post: {}, comments: []}, action) {
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

function ui(state = UI_INITIAL_STATE, action) {
    switch(action.type) {
        case actions.SET_SORT_FIELD:
            return {
                ...state,
                sortField: action.field
            };
        case actions.SET_SORT_DIRECTION:
            return {
                ...state,
                sortDirection: action.direction
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
    categories,
    ui
});

export default reducer;