// Actions are dispatched, often by components.

import { AUTHENTICATE, LOGOUT } from "../actionTypes/authentication";
import { post } from "../api";

const login = (user) => ({
    type: AUTHENTICATE,
    payload: user
});

export function authenticate(email, password) {
    return (dispatch) => {
        console.log(post("/login", { email, password }));
        post("/login", { email, password })
            .then(data => {
                const user = data.body;
                console.debug(data.httpResponse);
                // data returned should have two fields if valid.
                if (user.email === email && user.dateOfBirth) {
                    dispatch(login(user));
                } else {
                    // this really should be an error
                    dispatch(login(user));
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

        //Server call add new user
        //.then
        dispatch(authenticate(user.username, user.password));
    }
};
