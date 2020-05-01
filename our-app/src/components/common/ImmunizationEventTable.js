import React from 'react';
import { Table } from 'react-bootstrap';

function ImmunizationEventTable(props) {
    return (
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>Administering Location</td>
                    <td>{props.immunizationEvent.vLocation}</td>
                </tr>
                <tr>
                    <td>Contraindications / Precautions</td>
                    <td>{props.immunizationEvent.vContraindications}</td>
                </tr>
                <tr>
                    <td>Contraindications / Precautions Observation Date</td>
                    <td>{(props.immunizationEvent.vExceptionDate.trim().length === 0) ? "" : Intl.DateTimeFormat('en-US').format(new Date(props.immunizationEvent.vContraindicationsDate))}</td>
                </tr>
                <tr>
                    <td>Dose Level Eligibility</td>
                    <td>{props.immunizationEvent.vEligibility}</td>
                </tr>
                <tr>
                    <td>Exemptions / Refusals Date</td>
                    <td>{(props.immunizationEvent.vExceptionDate.trim().length === 0) ? "" : Intl.DateTimeFormat('en-US').format(new Date(props.immunizationEvent.vExceptionDate))}</td>
                </tr>
                <tr>
                    <td>Exemptions / Refusals of Vaccine</td>
                    <td>{props.immunizationEvent.vExceptionReason}</td>
                </tr>
                <tr>
                    <td>IIS Vaccination Event ID</td>
                    <td>{props.immunizationEvent.vaccinaitionId}</td>
                </tr>
                <tr>
                    <td>Responsible Organization</td>
                    <td>{props.immunizationEvent.vOrgOrigination}</td>
                </tr>
                <tr>
                    <td>Sending Organization</td>
                    <td>{props.immunizationEvent.vOrgSubmitter}</td>
                </tr>
                <tr>
                    <td>Vaccine Administration Date</td>
                    <td>{(props.immunizationEvent.vAdminDate.trim().length === 0) ? "" : Intl.DateTimeFormat('en-US').format(new Date(props.immunizationEvent.vAdminDate))}</td>
                </tr>
                <tr>
                    <td>Vaccination Event ID</td>
                    <td>{props.immunizationEvent.vaccinaitionIdSubmitting}</td>
                </tr>
                <tr>
                    <td>Vaccination Event Record Type</td>
                    <td>{props.immunizationEvent.vEventType}</td>
                </tr>
                <tr>
                    <td>Vaccine Administering Provider</td>
                    <td>{props.immunizationEvent.vProviderPersonName}</td>
                </tr>
                <tr>
                    <td>Vaccine Administering Provider Suffix</td>
                    <td>{props.immunizationEvent.vProviderPersonSuffix}</td>
                </tr>
                <tr>
                    <td>Vaccine Dose Volume</td>
                    <td>{props.immunizationEvent.vDoseVolume}</td>
                </tr>
                <tr>
                    <td>Vaccine Dose Volume Units</td>
                    <td>{props.immunizationEvent.vDoseVolumeUnits}</td>
                </tr>
                <tr>
                    <td>Vaccine Expiration Date</td>
                    <td>{(props.immunizationEvent.vExpirationDate.trim().length === 0) ? "" : Intl.DateTimeFormat('en-US').format(new Date(props.immunizationEvent.vExpirationDate))}</td>
                </tr>
                <tr>
                    <td>Vaccine Funding Source</td>
                    <td>{props.immunizationEvent.vFundingSource}</td>
                </tr>
                <tr>
                    <td>Vaccine Information Statement</td>
                    <td>{(props.immunizationEvent.vInfoStatementPubDate.trim().length === 0) ? "" : Intl.DateTimeFormat('en-US').format(new Date(props.immunizationEvent.vInfoStatementPubDate))}</td>
                </tr>
                <tr>
                    <td>Vaccine Information Statement Date</td>
                    <td>{(props.immunizationEvent.vInfoStatementDate.trim().length === 0) ? "" :  Intl.DateTimeFormat('en-US').format(new Date(props.immunizationEvent.vInfoStatementDate))}</td>
                </tr>
                <tr>
                    <td>Vaccine Lot Number</td>
                    <td>{props.immunizationEvent.vLotNum}</td>
                </tr>
                <tr>
                    <td>Vaccine Manufacturer Name</td>
                    <td>{props.immunizationEvent.vMfgName}</td>
                </tr>
                <tr>
                    <td>Vaccine Ordering Provider</td>
                    <td>{props.immunizationEvent.vOrderingProvider}</td>
                </tr>
                <tr>
                    <td>Vaccine Product</td>
                    <td>{props.immunizationEvent.vProduct}</td>
                </tr>
                <tr>
                    <td>Vaccine Route of Administration</td>
                    <td>{props.immunizationEvent.vRouteOfAdmin}</td>
                </tr>
                <tr>
                    <td>Vaccine Site of Administration</td>
                    <td>{props.immunizationEvent.vSiteOfAdmin}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ImmunizationEventTable;