import { RECIEVE_IMMUNIZATION_RECORDS } from "../actionTypes/immunization";
import { post, get } from "../api";

const recieveImmunizationRecords = (immunizationRecords) => ({
    type: RECIEVE_IMMUNIZATION_RECORDS,
    payload: immunizationRecords
});

export function submitImmunizationRecord(immunizationRecord, history) {
    return (dispatch) => {
        post("/b/vaccinations", immunizationRecord)
            .then(data => {
                const record = data.data;
                if (record) {
                    dispatch(recieveImmunizationRecords([immunizationRecord]));
                    history.push('dashboard');
                } else {
                    // this really should be an invalid password notification
                    dispatch(recieveImmunizationRecords([]));
                }
            })

            // e.g. how do we signify that the login failed?
            .catch(err => dispatch(recieveImmunizationRecords([])));
    };

}

export function getImmunizationRecords(userId) {
    return (dispatch) => {
        get(`/b/patient-vaccinations/${userId}`)
            .then(data => {
                const records = data.data;
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