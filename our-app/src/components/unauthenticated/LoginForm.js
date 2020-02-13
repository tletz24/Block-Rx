import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { authenticate } from '../../actions/authentication';

const LoginForm = (props) => {

    const handleSubmit = () => {
        // In order to preserve state accross 'pages'
        props.history.push('/username/dashboard')
        props.authenticate()
    };

    return (
        <Form>
            <Form.Group as={Row} controlId='formBasicUsername'>
                <Form.Label column sm='4'>Username</Form.Label>
                <Col sm='8'>
                    <Form.Control type='username' placeholder='Enter username' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formBasicPassword'>
                <Form.Label column sm='4'>Password</Form.Label>
                <Col sm='8'>
                    <Form.Control type='password' placeholder='Password' />
                </Col>
            </Form.Group>

            <Button variant='primary' type='submit' onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => {
            dispatch(authenticate(true))
        }
    };
};

// Connects component to redux store. connect(mapStateToProps, mapDispatchToProps)(Component)
export default connect(null, mapDispatchToProps)(LoginForm);