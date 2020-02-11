import { AUTHENTICATE, LOGOUT } from "../actionTypes/authentication";

const login = isAuthenticated => ({
    type: AUTHENTICATE,
    payload: isAuthenticated
});

export function authenticate(username, password) {
    return (dispatch) => {
        // Thunk for server call
        // return serverCall().then(
        //     (isAuthenticated) => dispatch(login(isAuthenticated))
        // );
        dispatch(login(true));
    };
}

export const logout = () => ({
    type: LOGOUT,
})