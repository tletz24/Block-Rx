import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Card } from 'react-bootstrap';
import { authenticate } from '../../actions/authentication';

const LoginForm = (props) => {

    const handleSubmit = (e) => {
        // In order to preserve state accross 'pages'
        e.preventDefault();
        props.authenticate(e.target.email.value, e.target.password.value, props.history);
    };

    return (
        <Card style={{ width: '25rem' }}>
            <Card.Header as="h5">Health Wallet Sign-In</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Login</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (username, password, history) => {
            dispatch(authenticate(username, password, history))
        }
    };
};

// Connects component to redux store. connect(mapStateToProps, mapDispatchToProps)(Component)
export default connect(null, mapDispatchToProps)(LoginForm);
