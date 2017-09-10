import { authHeader, baseUrl } from "./apiCommon";
import { generateId } from './idGenerator';

export function fetchPosts(category = '') {
    const url = category ? `${baseUrl}/${category}/posts` : `${baseUrl}/posts`;

    return fetch(url, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json())
        .then(posts => posts.filter(post => !post.deleted));
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

export function createPost(post) {
    post = {
        ...post,
        id: generateId(),
        timestamp: Date.now(),
        author: 'anonymous'
    };

    return fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(result => result.json());
}

export function editPost(postId, post) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(result => result.json());
}

export function fetchPost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}

export function deletePost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            ...authHeader
        }
    });
}