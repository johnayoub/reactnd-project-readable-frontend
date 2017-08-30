import { authHeader, baseUrl } from "./apiCommon";

export function fetchComments(postId) {
     return fetch(`${baseUrl}/posts/${postId}/comments`, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json());
}