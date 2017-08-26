import * as PostsAPI from '../api/post';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const fetchPosts = () => dispatch => {
    return PostsAPI.fetchPosts()
        .then(posts => dispatch(receivePosts(posts)));
};