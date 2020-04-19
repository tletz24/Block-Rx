import React from 'react';
import { Card, ListGroup} from 'react-bootstrap';
import  ImmunizationList  from '../common/ImmunizationList'

function Dashboard() {
    return (
        <Card style={{ width: '80vh', height: '90vh' }}>
            <Card.Header as="h1">Health Wallet Dashboard</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    Profile Information
                </ListGroup.Item>
                <ListGroup.Item>
                    <ImmunizationList/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Patient Details
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default Dashboard;