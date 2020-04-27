import React from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';


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
        props.ImmunizationForm(immunization, props.history);
    };
    return (
        <Card>
            <Card.Header className="text-center" placeholder="h5">Health Wallet Immunization-Form</Card.Header>
            <Card.Body>
                <Form id='immunizationForm' onSubmit={handleSubmit}>

                    <Row>
                        <Col>
                            <Form.Group controlId='vaccinationId'>
                                <Form.Label>Vaccination Id</Form.Label>
                                <Form.Control type='vaccinationId' placeholder='Vaccination Id' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='patientId'>
                                <Form.Label>Patient Id</Form.Label>
                                <Form.Control type='patientId' placeholder='Patient Id' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='location'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control type='location' placeholder='Location' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='contraindications'>
                                <Form.Label>Contraindications</Form.Label>
                                <Form.Control type='contraindications' placeholder='Password' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='eligibility'>
                                <Form.Label>Eligibility</Form.Label>
                                <Form.Control type='eligibility' placeholder='Eligibility' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='exceptionDate'>
                                <Form.Label>Exception Date</Form.Label>
                                <Form.Control type='exceptionDate' placeholder='Exception Date' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='exceptionReason'>
                                <Form.Label>Exception Reason</Form.Label>
                                <Form.Control type='exceptionReason' placeholder="Exception Reason">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='orgOrigination'>
                                <Form.Label>Org Origination</Form.Label>
                                <Form.Control type='orgOrigination' placeholder="Org Origination">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='orgSubmitter'>
                                <Form.Label>Org Submitter</Form.Label>
                                <Form.Control type='orgSubmitter' placeholder="Org Submitter">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='admitDate'>
                                <Form.Label>Admit Date</Form.Label>
                                <Form.Control type='admitDate' placeholder="Admit Date">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vaccinationIdSubmitting'>
                                <Form.Label>Vaccination Id Submitting</Form.Label>
                                <Form.Control type='vaccinationIdSubmitting' placeholder="Vaccination Id Submitting">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='eventType'>
                                <Form.Label>Event Type</Form.Label>
                                <Form.Control type='eventType' placeholder="Event Type">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='providerPersonName'>
                                <Form.Label>Provider Person Name</Form.Label>
                                <Form.Control type='providerPersonName' placeholder="Provider Person Name">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='providerPersonSuffix'>
                                <Form.Label>Provider Person Suffix</Form.Label>
                                <Form.Control type='providerPersonSuffix' placeholder="Provider Person Suffix">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='doseVolume'>
                                <Form.Label>Dose Volume</Form.Label>
                                <Form.Control type='doseVolume' placeholder="Dose Volume">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='doseVolumeUnits'>
                                <Form.Label>Dose Volume Units</Form.Label>
                                <Form.Control type='doseVolumeUnits' placeholder="Dose Volume Units">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='expirationDate'>
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control type='expirationDate' placeholder="Expiration Date">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='fundingSource'>
                                <Form.Label>Funding Source</Form.Label>
                                <Form.Control type='fundingSource' placeholder="Funding Source">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='infoStatementPubDate'>
                                <Form.Label>Info Statement PubDate</Form.Label>
                                <Form.Control type='infoStatementPubDate' placeholder="Info Statement PubDate">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='infoStatementDate'>
                                <Form.Label>Info Statement Date</Form.Label>
                                <Form.Control type='infoStatementDate' placeholder="Info Statement Date">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='lotNum'>
                                <Form.Label>Lot Num</Form.Label>
                                <Form.Control type='lotNum' placeholder="Lot Num">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='mfgName'>
                                <Form.Label>Mfg Name</Form.Label>
                                <Form.Control type='mfgName' placeholder="Mfg Name">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='orderingProvider'>
                                <Form.Label>Ordering Provider</Form.Label>
                                <Form.Control type='orderingProvider' placeholder="Ordering Provider">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='product'>
                                <Form.Label>Product</Form.Label>
                                <Form.Control type='product' placeholder="Product">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='routeOfAdmin'>
                                <Form.Label>Route Of Admin</Form.Label>
                                <Form.Control type='routeOfAdmin' placeholder="Route Of Admin">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='siteOfAdmin'>
                                <Form.Label>Site Of Admin</Form.Label>
                                <Form.Control type='siteOfAdmin' placeholder="Site Of Admin">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        </Col>
                        <Col lg={7}>
                            <Button variant='primary' type='submit'>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
export default ImmunizationForm



