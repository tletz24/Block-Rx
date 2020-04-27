import React from 'react';
import { Card, ListGroup, Row, Col, Container} from 'react-bootstrap';
import  ImmunizationList from '../common/ImmunizationList'

function Dashboard() {
    return (
        <Container fluid="xl" style={{height: '80rem', width: '90rem'}}>
            <Row>
                <Col>
                    <Card>
                        <Card.Header as="h1">Dashboard</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2></h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Vaccines</h2>
                                <ImmunizationList
                                    // TODO Insert Vaccines Here
                                />
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;