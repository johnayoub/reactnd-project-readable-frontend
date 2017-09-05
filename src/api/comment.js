import { authHeader, baseUrl } from "./apiCommon";

export function fetchComments(postId) {
     return fetch(`${baseUrl}/posts/${postId}/comments`, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}

export function updateVoteScore(commentId, voteOption) {
    return fetch(`${baseUrl}/comments/${commentId}`, {
        method: 'POST',
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: voteOption})
    }).then(res => res.json());
}