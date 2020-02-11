// Reducers listen for all dispatched actions. The reducer may return a new state 
// if the action type matches a case in the switch. Otherwise, state is not modified.

import { AUTHENTICATE, LOGOUT } from "../actionTypes/authentication";

const initialState = {
    isAuthenticated: false
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            // State is immutable, we must return new object. Cannot do state = something.
            return {
                // es6 spread operator
                ...state,
                isAuthenticated: action.payload
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isAuthenticated: false
            };
        }
        default: {
            return state;
        }
    }
};

export default authentication;