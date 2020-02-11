import { AUTHENTICATE, LOGOUT } from "../actionTypes/authentication";

const initialState = {
    isAuthenticated: false
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
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