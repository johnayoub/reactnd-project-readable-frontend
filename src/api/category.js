import { authHeader, baseUrl } from "./apiCommon";

export function getCategories() {
    return fetch(`${baseUrl}/categories`, {
        headers: {
            ...authHeader
        }
    }).then(res => res.json())
        .then(categories => categories.categories);
}