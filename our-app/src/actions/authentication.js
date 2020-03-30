// Actions are dispatched, often by components.

import { LOGIN, LOGOUT } from "../actionTypes/authentication";
import { post } from "../api";

const login = (user) => ({
    type: LOGIN,
    payload: user
});

export function authenticate(email, password) {
    return (dispatch) => {
        post("/login", { email, password })
            .then(data => {
                const user = data.data;
                if (user) {
                    dispatch(login(user));
                } else {
                    // this really should be an invalid password notification
                    dispatch(login(null));
                }
            })
            // e.g. how do we signify that the login failed?
            .catch(err => dispatch(login(false)));
    };
}

export const logout = () => ({
    type: LOGOUT
});

export const signup = (user) => {
    return (dispatch) => {
        // todo @david server call add new user
        dispatch(authenticate(user.username, user.password));
    }
};
