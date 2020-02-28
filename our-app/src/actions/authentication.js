// Actions are dispatched, often by components.

import { LOGIN, LOGOUT } from "../actionTypes/authentication";

const login = (user) => ({
    type: LOGIN,
    payload: user
});

export function authenticate(username, password) {
    return (dispatch) => {
        // Thunk for server call
        // return serverCall().then(
        //     (isAuthenticated) => dispatch(login(isAuthenticated))
        // );
        const fakeUser = {
            email: 'form.email.value',
            firstName: 'form.firstName.value',
            lastName: 'form.lastName.value',
            password: 'form.password.value',
            dateOfBirth: 'form.dateOfBirth.value'
        };
        dispatch(login(fakeUser));
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
