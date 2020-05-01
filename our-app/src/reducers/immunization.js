import { RECIEVE_IMMUNIZATION_RECORDS } from '../actionTypes/immunization';
import { LOGOUT } from '../actionTypes/authentication';

const initialState = {
    records: []
}
const immunization = (state = initialState, action) => {
    switch (action.type) {
        case RECIEVE_IMMUNIZATION_RECORDS: {
            return {
                ...state,
                records: [...state.records, ...action.payload]
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

export default immunization;