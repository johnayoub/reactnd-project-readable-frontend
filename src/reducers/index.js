import { combineReducers } from 'redux';
import * as actions from '../actions';

const UI_INITIAL_STATE = {
    sortField: 'voteScore',
    sortDirection: 'asc'
};

function posts(state = [], action) {
    switch (action.type) {
        case actions.RECEIVE_POSTS:
            return action.posts;
        case actions.UPDATE_POST_VOTE_SCORE:
            const currentPost = state.filter(post => post.id === action.post.id)[0];
            // merge the posts since the new one doesn't have the commentsCount
            return [...state.filter(post => post.id !== action.post.id), Object.assign(currentPost, action.post)];
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
        default:
            return state;
    }
}

const reducer = combineReducers({
    posts,
    categories,
    ui
});

export default reducer;