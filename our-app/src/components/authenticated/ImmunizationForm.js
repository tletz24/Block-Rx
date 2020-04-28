import React from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';


const ImmunizationForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const immunization = {
            vaccinationId: form.vaccinationId.value,
            patientId: form.patientId.value,
            vLocation: form.vLocation.value,
            vContraindications: form.vContraindications.value,
            vContradictionsDate: form.vContradictionsDate.value,
            veligibility: form.eligibility.value,
            vExceptionDate: form.exceptionDate.value,
            vExceptionReason: form.exceptionReason.value,
            vOrgOrigination: form.vOrgOrigination.value,
            vOrgSubmitter: form.vOrgSubmitter.value,
            vAdminDate: form.vAdminDate.value,
            vaccinationIdSubmitting: form.vaccinationIdSubmitting.value,
            vEventType: form.vEventType.value,
            vProviderPersonName: form.vProviderPersonName.value,
            vProviderPersonSuffix: form.vProviderPersonSuffix.value,
            vDoseVolume: form.vDoseVolume.value,
            vDoseVolumeUnits: form.vDoseVolumeUnits.value,
            vExpirationDate: form.vExpirationDate.value,
            vFundingSource: form.vFundingSource.value,
            vInfoStatementPubDate: form.vInfoStatementPubDate.value,
            vInfoStatementDate: form.vInfoStatementDate.value,
            vLotNum: form.vLotNum.value,
            vMfgName: form.vMfgName.value,
            vOrderingProvider: form.vOrderingProvider.value,
            vProduct: form.vProduct.value,
            vRouteOfAdmin: form.vRouteOfAdmin.value,
            vSiteOfAdmin: form.vSiteOfAdmin.value

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
                            <Form.Group controlId='vLocation'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control type='vLocation' placeholder='Location' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vContraindications'>
                                <Form.Label>Contraindications</Form.Label>
                                <Form.Control type='contraindications' placeholder='Password' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vEligibility'>
                                <Form.Label>Eligibility</Form.Label>
                                <Form.Control type='vEligibility' placeholder='Eligibility' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vExceptionDate'>
                                <Form.Label>Exception Date</Form.Label>
                                <Form.Control type='vExceptionDate' placeholder='Exception Date' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vExceptionReason'>
                                <Form.Label>Exception Reason</Form.Label>
                                <Form.Control type='vExceptionReason' placeholder="Exception Reason">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vOrgOrigination'>
                                <Form.Label>Org Origination</Form.Label>
                                <Form.Control type='vOrgOrigination' placeholder="Org Origination">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vOrgSubmitter'>
                                <Form.Label>Org Submitter</Form.Label>
                                <Form.Control type='vOrgSubmitter' placeholder="Org Submitter">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vAdmitDate'>
                                <Form.Label>Admit Date</Form.Label>
                                <Form.Control type='vAdmitDate' placeholder="Admit Date">
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
                            <Form.Group controlId='vEventType'>
                                <Form.Label>Event Type</Form.Label>
                                <Form.Control type='vEventType' placeholder="Event Type">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vProviderPersonName'>
                                <Form.Label>Provider Person Name</Form.Label>
                                <Form.Control type='vProviderPersonName' placeholder="Provider Person Name">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vProviderPersonSuffix'>
                                <Form.Label>Provider Person Suffix</Form.Label>
                                <Form.Control type='vProviderPersonSuffix' placeholder="Provider Person Suffix">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vDoseVolume'>
                                <Form.Label>Dose Volume</Form.Label>
                                <Form.Control type='vDoseVolume' placeholder="Dose Volume">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vDoseVolumeUnits'>
                                <Form.Label>Dose Volume Units</Form.Label>
                                <Form.Control type='vDoseVolumeUnits' placeholder="Dose Volume Units">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vExpirationDate'>
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control type='vExpirationDate' placeholder="Expiration Date">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vFundingSource'>
                                <Form.Label>Funding Source</Form.Label>
                                <Form.Control type='vFundingSource' placeholder="Funding Source">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vInfoStatementPubDate'>
                                <Form.Label>Info Statement PubDate</Form.Label>
                                <Form.Control type='vInfoStatementPubDate' placeholder="Info Statement PubDate">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vInfoStatementDate'>
                                <Form.Label>Info Statement Date</Form.Label>
                                <Form.Control type='vInfoStatementDate' placeholder="Info Statement Date">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vLotNum'>
                                <Form.Label>Lot Num</Form.Label>
                                <Form.Control type='vLotNum' placeholder="Lot Num">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vMfgName'>
                                <Form.Label>Mfg Name</Form.Label>
                                <Form.Control type='vMfgName' placeholder="Mfg Name">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vOrderingProvider'>
                                <Form.Label>Ordering Provider</Form.Label>
                                <Form.Control type='vOrderingProvider' placeholder="Ordering Provider">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vProduct'>
                                <Form.Label>Product</Form.Label>
                                <Form.Control type='vProduct' placeholder="Product">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='vRouteOfAdmin'>
                                <Form.Label>Route Of Admin</Form.Label>
                                <Form.Control type='vRouteOfAdmin' placeholder="Route Of Admin">
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='vSiteOfAdmin'>
                                <Form.Label>Site Of Admin</Form.Label>
                                <Form.Control type='vSiteOfAdmin' placeholder="Site Of Admin">
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



