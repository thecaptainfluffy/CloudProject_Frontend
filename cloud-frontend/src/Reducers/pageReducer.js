export default function reducer(state={
    active: false,
    email: "",
    account: ""
}, action ) {
    switch(action.type) {
        case "PAGE_LOGIN":
            return {...state, active: true}
        case "PAGE_LOGOUT":
            return {...state, active: false}
        case "INSERT_EMAIL":
            return {...state, email: action.payload}
        case "INSERT_ACCOUNT":
            return {...state, account: action.payload}
        default:
            return state;
    }
}