import { authHeader, baseUrl } from "./apiCommon";

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePostId = () => {
    const keyLength = 22;
    let key = '';

    const keyChars = [
        ...Array.from(Array(10).keys()).map(x => x + 48),
        ...Array.from(Array(26).keys()).map(x => x + 65),
        ...Array.from(Array(26).keys()).map(x => x + 97)
    ];

    for (let i = 0; i < keyLength; i++) {
        const randomNumber = generateRandomNumber(0, keyChars.length - 1);

        key += String.fromCharCode(keyChars[randomNumber]);
    }

    return key;
};

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
    post.timestamp = Date.now();
    post.id = generatePostId();

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