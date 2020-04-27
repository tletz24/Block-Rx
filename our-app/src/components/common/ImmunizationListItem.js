import React from 'react';
import { Row, Col, Image, Card } from 'react-bootstrap';

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
                        <Col xs={5} md={2}>
                            <Image style={{height: '6rem', width: '6rem'}} className="mx-4" src={process.env.PUBLIC_URL + '/images/syringe-2.png'} />
                        </Col>
                        <Col>
                            <h3>{this.props.immunizationEvent.vProduct} Vaccination</h3>
                            <h4>{date}</h4>
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