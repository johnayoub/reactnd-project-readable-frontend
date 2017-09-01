import * as PostsAPI from '../api/post';
import * as CommentsAPI from '../api/comment';
import * as CategoriesAPI from '../api/category';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const setSortField = field => ({
    type: SET_SORT_FIELD,
    field
});

export const setSortDirection = direction => ({
    type: SET_SORT_DIRECTION,
    direction
});

export const loadCategoryViewContent = () => dispatch => {
    return Promise.all([fetchPosts(), fetchCategories()])
        .then(result => {
            dispatch(receivePosts(result[0]));
            dispatch(receiveCategories(result[1]));
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

const fetchCategories = () => {
    return CategoriesAPI.getCategories();
};