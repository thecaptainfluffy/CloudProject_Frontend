export function login() {
    return {
        type: "PAGE_LOGIN"
    }
}
export function logout() {
    return {
        type: "PAGE_LOGOUT"
    }
}
export function insertEmail(email) {
    return {
        type: "INSERT_EMAIL",
        payload: email
    }
}
export function insertAccount(acc) {
    return {
        type: "INSERT_ACCOUNT",
        payload: acc
    }
}