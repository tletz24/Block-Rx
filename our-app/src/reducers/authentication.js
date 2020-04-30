// Reducers listen for all dispatched actions. The reducer may return a new state 
// if the action type matches a case in the switch. Otherwise, state is not modified.

import { LOGIN, LOGOUT } from "../actionTypes/authentication";

const initialState = {
    user: {}
}

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            // State is immutable, we must return new object. Cannot do state = something.
            return {
                // es6 spread operator
                ...state,
                user: action.payload
            };
        }
        case LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default authentication;