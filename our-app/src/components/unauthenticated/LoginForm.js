import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Col, Row } from 'react-bootstrap';
import { authenticate } from '../../actions/authentication';

const LoginForm = (props) => {

    const handleSubmit = (e) => {
        // In order to preserve state accross 'pages'
        props.history.push('/username/dashboard')
        props.authenticate(e.target.email.value, e.target.password.value)
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId='email'>
                <Form.Label column sm='4'>Email</Form.Label>
                <Col sm='8'>
                    <Form.Control type='email' placeholder='Enter email' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='password'>
                <Form.Label column sm='4'>Password</Form.Label>
                <Col sm='8'>
                    <Form.Control type='password' placeholder='Password' />
                </Col>
            </Form.Group>
            <Col sm={{ span: 8, offset: 4 }}>
                <Button variant='primary' type='submit'>Login</Button>
            </Col>
        </Form>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (username, password) => {
            dispatch(authenticate(username, password))
        }
    };
};

// Connects component to redux store. connect(mapStateToProps, mapDispatchToProps)(Component)
export default connect(null, mapDispatchToProps)(LoginForm);