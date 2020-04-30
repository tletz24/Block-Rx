import React from 'react';
import { Row, Col, Image, Card, Badge } from 'react-bootstrap';

class ImmunizationListItem extends React.Component {
    state = {
        visible: false
    };
    
    toggleModal = () => {
        this.setState(prevState => ({ visible: !prevState.visible }));
    };

    render() {
        const ImmunizationModal = this.props.ImmunizationModal;
        const date = Intl.DateTimeFormat('en-US').format(new Date(this.props.immunizationEvent.vAdminDate));
        return (
            <Card body className="my-2">
                    <Row>
                        <Col xs={5} md={2} className={{"vertical-align": "middle"}}>
                            <Image style={{height: '6rem', width: '6rem'}} className="ml-4 mt-2" src={process.env.PUBLIC_URL + '/images/syringe-2.png'} />
                        </Col>
                        <Col>
                            <Badge pill variant="success">Vaccination</Badge>
                            <h3>{this.props.immunizationEvent.vProduct}</h3>
                            <h6>{date}</h6>
                            <Card.Link href="#" onClick={this.toggleModal}>
                                View More
                            </Card.Link>  
                        </Col>
                        <ImmunizationModal
                            show={this.state.visible}
                            onHide={this.toggleModal}
                            immunizationEvent={this.props.immunizationEvent}
                        />
                    </Row>        
                </Card>
        );
    }
}

export default ImmunizationListItem;