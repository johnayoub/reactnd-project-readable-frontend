import * as PostsAPI from '../api/post';
import * as CommentsAPI from '../api/comment';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const fetchPosts = () => dispatch => {
    return PostsAPI.fetchPosts()
        .then(posts => {
            Promise.all(posts.map(post => CommentsAPI.fetchComments(post.id)))
                .then(commentsByPost => {
                    posts.forEach((post, index) => {
                        post.commentsCount = commentsByPost[index].length;
                    });
                    dispatch(receivePosts(posts));
                });
        });
};