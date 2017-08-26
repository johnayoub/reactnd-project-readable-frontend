import { combineReducers } from 'redux';
import { RECEIVE_POSTS } from '../actions';

function posts(state = [], action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts;
        default:
            return state;
    }
}

const reducer = combineReducers({
    posts
});

export default reducer;