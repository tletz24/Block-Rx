import React from 'react';
import ImmunizationModal from './ImmunizationModel'
import ImmunizationListItem from './ImmunizationListItem'


function ImmunizationList(props) {
    const immunizations = [
        {
            vaccinaitionId:"EE12345",
            patientId:"EE1234",
            vLocation:"LabCrop",
            vContraindications:"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
            vContraindicationsDate:"2018-10-24T11:52:20.182Z",
            vEligibility:"Summa Health Care",
            vExceptionDate:"2018-10-22T11:52:20.182Z",
            vExceptionReason:"",
            vOrgOrigination:"32985792",
            vOrgSubmitter:"32985792",
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
            vaccinaitionId:"EE12465",
            patientId:"EE1234",
            vLocation:"edge",
            vContraindications:"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
            vContraindicationsDate:"2018-10-22T11:52:20.182Z",
            vEligibility:"BlueCrossBlueSheild",
            vExceptionDate:"2018-10-22T11:52:20.182Z",
            vExceptionReason:"Sick",
            vOrgOrigination:"Provider ID",
            vOrgSubmitter:"Provider ID",
            vAdminDate:"2017-08-02T11:52:20.182Z",
            vaccinaitionIdSubmitting:"EE1234",
            vEventType:"administered",
            vProviderPersonName:"Joe Doe",
            vProviderPersonSuffix:"RN",
            vDoseVolume:".7",
            vDoseVolumeUnits:"ml",
            vExpirationDate:"2018-10-22T11:52:20.182Z",
            vFundingSource:"private",
            vInfoStatementPubDate:"2018-10-22T11:52:20.182Z",
            vInfoStatementDate:"2018-10-22T11:52:20.182Z",
            vLotNum:"120020",
            vMfgName:"Pfizer",
            vOrderingProvider:"Joe Person MD",
            vProduct:"Hepatitis A",
            vRouteOfAdmin:"Injection",
            vSiteOfAdmin:"Right Arm"
         },
         {
            vaccinaitionId:"EE12345",
            patientId:"EE1234",
            vLocation:"edge",
            vContraindications:"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
            vContraindicationsDate:"2018-10-22T11:52:20.182Z",
            vEligibility:"BlueCrossBlueSheild",
            vExceptionDate:"2018-10-22T11:52:20.182Z",
            vExceptionReason:"Sick",
            vOrgOrigination:"Provider ID",
            vOrgSubmitter:"Provider ID",
            vAdminDate:"2015-06-12T11:52:20.182Z",
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
            vProduct:"Pneumococcal",
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
