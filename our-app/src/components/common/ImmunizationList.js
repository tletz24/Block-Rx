import React from 'react';
import ImmunizationModal from './ImmunizationModel'
import ImmunizationListItem from './ImmunizationListItem'


function ImmunizationList(props) {
    const immunizations = [
        {
            vaccinaitionId:"EE12345",
            patientId:"EE1234",
            vLocation:"edge",
            vContraindications:"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
            vContraindicationsDate:"2018-10-24T11:52:20.182Z",
            vElegablity:"BlueCrossBlueSheild",
            vExceptionDate:"2018-10-22T11:52:20.182Z",
            vExceptionReason:"Sick",
            vOrgOrigination:"Provider ID",
            vOrgSubmitter:"Provider ID",
            vAdminDate:"2018-10-24T11:52:20.182Z",
            vaccinaitionIdSubmitting:"EE1234",
            vEventType:"administered",
            vProviderPersonName:"Joe Doe",
            vProviderPersonSuffix:"RN",
            vDoseVolume:".5",
            vDoseVolumeUnits:"ml",
            vExpirationDate:"2018-10-22T11:52:20.182Z",
            vFundingSource:"private",
            vInfoStatementPubDate:"2018-10-22T11:52:20.182Z",
            vInfoStatementDate:"2018-10-22T11:52:20.182Z",
            vLotNum:"120020",
            vMfgName:"Pfizer",
            vOrderingProvider:"Joe Person MD",
            vProduct:"Influenza",
            vRouteOfAdmin:"Injection",
            vSiteOfAdmin:"Left Arm"
         },
         {
            vaccinaitionId:"EE12345",
            patientId:"EE1234",
            vLocation:"edge",
            vContraindications:"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
            vContraindicationsDate:"2018-10-22T11:52:20.182Z",
            vElegablity:"BlueCrossBlueSheild",
            vExceptionDate:"2018-10-22T11:52:20.182Z",
            vExceptionReason:"Sick",
            vOrgOrigination:"Provider ID",
            vOrgSubmitter:"Provider ID",
            vAdminDate:"2018-10-22T11:52:20.182Z",
            vaccinaitionIdSubmitting:"EE1234",
            vEventType:"administered",
            vProviderPersonName:"Joe Doe",
            vProviderPersonSuffix:"RN",
            vDoseVolume:".5",
            vDoseVolumeUnits:"ml",
            vExpirationDate:"2018-10-22T11:52:20.182Z",
            vFundingSource:"private",
            vInfoStatementPubDate:"2018-10-22T11:52:20.182Z",
            vInfoStatementDate:"2018-10-22T11:52:20.182Z",
            vLotNum:"120020",
            vMfgName:"Pfizer",
            vOrderingProvider:"Joe Person MD",
            vProduct:"162",
            vRouteOfAdmin:"Injection",
            vSiteOfAdmin:"Left Arm"
         },
         {
            vaccinaitionId:"EE12345",
            patientId:"EE1234",
            vLocation:"edge",
            vContraindications:"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
            vContraindicationsDate:"2018-10-22T11:52:20.182Z",
            vElegablity:"BlueCrossBlueSheild",
            vExceptionDate:"2018-10-22T11:52:20.182Z",
            vExceptionReason:"Sick",
            vOrgOrigination:"Provider ID",
            vOrgSubmitter:"Provider ID",
            vAdminDate:"2018-10-22T11:52:20.182Z",
            vaccinaitionIdSubmitting:"EE1234",
            vEventType:"administered",
            vProviderPersonName:"Joe Doe",
            vProviderPersonSuffix:"RN",
            vDoseVolume:".5",
            vDoseVolumeUnits:"ml",
            vExpirationDate:"2018-10-22T11:52:20.182Z",
            vFundingSource:"private",
            vInfoStatementPubDate:"2018-10-22T11:52:20.182Z",
            vInfoStatementDate:"2018-10-22T11:52:20.182Z",
            vLotNum:"120020",
            vMfgName:"Pfizer",
            vOrderingProvider:"Joe Person MD",
            vProduct:"162",
            vRouteOfAdmin:"Injection",
            vSiteOfAdmin:"Left Arm"
         },

    ];

    const list = [];

    for (const [index, immunizationEvent] of immunizations.entries()) {
        list.push(
           <ImmunizationListItem
                immunizationEvent={ immunizationEvent }
                ImmunizationModal={ ImmunizationModal }
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

