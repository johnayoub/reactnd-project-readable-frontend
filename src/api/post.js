import { authHeader, baseUrl } from "./apiCommon";

export function fetchPosts(postId = '') {
    let postPromise;

    if (postId) {
        postPromise = fetch(`${baseUrl}/posts/${postId}`, {
            headers: {
                ...authHeader
            }
        });
    }
    else {
        postPromise = fetch(`${baseUrl}/posts`, {
            headers: {
                ...authHeader
            }
        });
    }

    return postPromise
        .then(res => res.json());
}