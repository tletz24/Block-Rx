// Actions are dispatched, often by components.

import { AUTHENTICATE, LOGOUT } from "../actionTypes/authentication";
import { post } from "../api";

const login = isAuthenticated => ({
    type: AUTHENTICATE,
    payload: isAuthenticated
});

export function authenticate(email, password) {
    return (dispatch) => {
        post("/login", {}, { email, password })
            .then(data => {
                if (data.email && data.dateOfBirth) {
                    dispatch(login(true));
                } else {
                    dispatch(login(false));
                }
            })
            .catch(err => dispatch(login(false)));
    };
}

export const logout = () => ({
    type: LOGOUT,
})