import React from 'react';
import { Row, Col, Image, Card } from 'react-bootstrap';

function ImmunizationList(props) {

    const immunizations = ["Flu", "MMR", "Polio", "The Berk", "Justin", "React", "JQuery", "Bootstrap", "Machine Learning"];

    const records = [];

    for (const [index, value] of immunizations.entries()) {
        records.push(
            <Card body>
                <Row>
                    <Col xs={6} md={2}>
                        <Image src={process.env.PUBLIC_URL + '/images/david.png'} roundedCircle />
                    </Col>
                    <Col>
                        <h3>{value}</h3>
                        <h4>This is the description of item {index}</h4>
                        <Card.Link href="#">View</Card.Link>  
                    </Col>
                </Row>        
            </Card>
        )
    }

    return (
        <>
            {records}
        </>
    );
}

export default ImmunizationList;