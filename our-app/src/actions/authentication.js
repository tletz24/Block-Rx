// Actions are dispatched, often by components.

import { AUTHENTICATE, LOGOUT } from "../actionTypes/authentication";
import { post } from "../api";

const login = (user) => ({
    type: LOGIN,
    payload: user
});

export function authenticate(email, password) {
    return (dispatch) => {
        post("/login", {}, { email, password })
            .then(data => {
                // data returned should have two fields if valid.
                if (data.email == email && data.dateOfBirth) {
                    dispatch(login(true));
                } else {
                    dispatch(login(false));
                }
            })
            .catch(err => dispatch(login(false)));
    };
}

export const logout = () => ({
    type: LOGOUT
});

export const signup = (user) => {
    return (dispatch) => {

        //Server call add new user
        //.then
        dispatch(authenticate(user.username, user.password));
    }
};
