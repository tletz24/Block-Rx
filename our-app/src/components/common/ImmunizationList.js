import React from 'react';
import ImmunizationModal from './ImmunizationModel'
import ImmunizationListItem from './ImmunizationListItem'


function ImmunizationList({ immunizations }) {

    const list = [];
    for (const [index, immunizationEvent] of immunizations.entries()) {
        list.push(
            <ImmunizationListItem
                key={index}
                immunizationEvent={immunizationEvent}
                ImmunizationModal={ImmunizationModal}
            />
        )
    }

    return (
        <>
            {list}
        </>
    );
}

export default ImmunizationList;
