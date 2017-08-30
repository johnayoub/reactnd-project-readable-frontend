import { authHeader, baseUrl } from "./apiCommon";

export function fetchPosts(category = '') {
    const url = category ? `${baseUrl}/${category}/posts` : `${baseUrl}/posts`;

    return fetch(url, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}

export function fetchPost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}