import * as PostsAPI from '../api/post';
import * as CommentsAPI from '../api/comment';
import * as CategoriesAPI from '../api/category';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE';
export const UPDATE_COMMENT_VOTE_SCORE = 'UPDATE_COMMENT_VOTE_SCORE';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
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

export const fetchPost = (postId) => dispatch => {
  return Promise.all([PostsAPI.fetchPost(postId), CommentsAPI.fetchComments(postId)])
      .then(result => {
          dispatch(receiveCurrentPost(result[0], result[1]));
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