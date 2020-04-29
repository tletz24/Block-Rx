import { RECIEVE_IMMUNIZATION_RECORDS } from "../actionTypes/immunization";

const initialState = {
    records: []
}
const immunization = (state = initialState, action) => {
    switch (action.type) {
        case RECIEVE_IMMUNIZATION_RECORDS: {
            return {
                ...state,
                records: [...state.records, action.payload]
            };
        }
        default: {
            return state;
        }
    }
};

export default immunization;