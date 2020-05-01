// Actions are dispatched, often by components.

import { LOGIN, LOGOUT } from '../actionTypes/authentication';
import { post } from '../api';
import { getImmunizationRecords } from '../actions/immunization';

const login = (user) => ({
    type: LOGIN,
    payload: user
});

export function authenticate(email, password, history) {
    return (dispatch) => {
        post("/login", { email, password })
            .then(data => {
                const user = data.data;
                if (user) {
                    dispatch(login(user));
                    dispatch(getImmunizationRecords(user._id))
                    history.push('/username/dashboard');
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

export const signup = (user, history) => {
    return (dispatch) => {
        post('/user', user)
            .then(id => {
                dispatch(authenticate(user.email, user.password, history));
            })
            .catch(err => console.error(err))
    }
};
