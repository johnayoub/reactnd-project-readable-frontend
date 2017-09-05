import { authHeader, baseUrl } from "./apiCommon";

export function fetchPosts(category = '') {
    const url = category ? `${baseUrl}/${category}/posts` : `${baseUrl}/posts`;

    return fetch(url, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}

export function updateVoteScore(postId, voteOption) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        method: 'POST',
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: voteOption})
    }).then(res => res.json());
}

export function fetchPost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}