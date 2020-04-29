import { RECIEVE_IMMUNIZATION_RECORDS } from "../actionTypes/immunization";
import { post } from "../api";

const recieveImmunizationRecords = (immunizationRecords) => ({
    type: RECIEVE_IMMUNIZATION_RECORDS,
    payload: immunizationRecords
});

export function submitImmunizationRecord(immunizationRecord) {
    return (dispatch) => {
        // post("/immunization", immunizationRecord)
        //     .then(data => {
        //         const record = true;
        //         if (record) {
        //             dispatch(recieveImmunizationRecords(immunizationRecord));
        //         } else {
        //             // this really should be an invalid password notification
        //             dispatch(recieveImmunizationRecords(null));
        //         }
        //     })
        //     // e.g. how do we signify that the login failed?
        //     .catch(err => dispatch(recieveImmunizationRecords(false)));
        dispatch(recieveImmunizationRecords(immunizationRecord));

    };
}

export function getImmunizationRecords(userId) {
    return (dispatch) => {
        post("/immunizations", userId)
            .then(data => {
                const records = data.records;
                if (records) {
                    dispatch(recieveImmunizationRecords(records));
                } else {
                    // this really should be an invalid password notification
                    dispatch(recieveImmunizationRecords(null));
                }
            })
            // e.g. how do we signify that the login failed?
            .catch(err => dispatch(recieveImmunizationRecords(false)));
    };
}