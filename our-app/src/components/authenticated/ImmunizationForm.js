import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';



const ImmunizationForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const immunization = {
            vaccinationId: form.vaccincationId.value,
            patientId: form.patientId.value,
            location: form.location.value,
            contraindications: form.contraindictions.value,
            contradictionsDate: form.contradictionsDate.value,
            eligibility: form.eligibility.value,
            exceptionDate: form.exceptionDate.value,
            exceptionReason: form.exceptionReason.value,
            orgOrigination: form.orgOrigination.value,
            OrgSubmitter: form.OrgSubmitter.value,
            adminDate: form.adminDate.value,
            vaccinationIdSubmitting: form.vaccinationIdSubmitting.value,
            eventType: form.eventType.value,
            providerPersonName: form.providerPersonName.value,
            providerPersonSuffix: form.providerPersonSuffix.value,
            doseVolume: form.doseVolume.value,
            doseVolumeUnits: form.doseVolumeUnits.value,
            expirationDate: form.exceptionDate.value,
            fundingSource: form.fundingSource.value,
            infoStatementPubDate: form.infoStatementPubDate.value,
            infoStatementDate: form.infoStatementDate.value,
            lotNum: form.lotNum.value,
            mfgName: form.mfgName.value,
            orderingProvider: form.orderingProvider.value,
            product: form.product.value,
            routeOfAdmin: form.routeOfAdmin.value,
            siteOfAdmin: form.siteOfAdmin.value


        }
        props.signup(immunization, props.history);
    };

    return (
        <Card>
            <Card.Header as="h5">Health Wallet Sign-Up</Card.Header>
            <Card.Body>
                <Form id='immunizationForm' onSubmit={handleSubmit}>
                    <Form.Group controlId='vaccinationId'>
                        <Form.Label>Vaccination Id</Form.Label>
                        <Form.Control type='firstName' placeholder='Vaccination Id' />
                    </Form.Group>

                    <Form.Group controlId='patientId'>
                        <Form.Label>Patient Id</Form.Label>
                        <Form.Control type='patientId' placeholder='Patient Id' />
                    </Form.Group>
                    <Form.Group controlId='location'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type='location' placeholder='Location' />
                    </Form.Group>

                    <Form.Group controlId='contraindications'>
                        <Form.Label>Contraindications</Form.Label>
                        <Form.Control type='contraindications' placeholder='Password' />
                    </Form.Group>

                    <Form.Group controlId='eligibility'>
                        <Form.Label>Eligibility</Form.Label>
                        <Form.Control type='eligibility' placeholder='Eligibility' />
                    </Form.Group>

                    <Form.Group controlId='exceptionDate'>
                        <Form.Label>Exception Date</Form.Label>
                        <Form.Control type='exceptionDate' placeholder='Exception Date' />
                    </Form.Group>

                    <Form.Group controlId='exceptionReason'>
                        <Form.Label>Exception Reason</Form.Label>
                        <Form.Control type='exceptionReason' as="Exception Reason">
                        </Form.Control>
                    </Form.Group>

                    <Button variant='primary' type='submit'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}


export default ImmunizationForm



