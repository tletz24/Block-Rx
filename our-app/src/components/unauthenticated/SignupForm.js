import React from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { connect } from "react-redux";
import { signup } from '../../actions/authentication';

const SignupForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const user = {
            email: form.email.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            password: form.password.value,
            dateOfBirth: form.dateOfBirth.value,
            role: form.role.value
        }
        props.signup(user, props.history);
    };

    return (
        <Card>
            <Card.Header as="h5">Health Wallet Sign-Up</Card.Header>
            <Card.Body>
                <Form id='signUpForm' onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId='firstName'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='firstName' placeholder='First Name' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='lastName'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type='lastName' placeholder='Last Name' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' />
                    </Form.Group>

                    <Form.Group controlId='dateOfBirth'>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type='dateOfBirth' placeholder='Date of Birth' />
                    </Form.Group>

                    <Form.Group controlId='role'>
                        <Form.Label>User Role</Form.Label>
                        <Form.Control type='role' as="select">
                            <option value='patient'>Patient</option>
                            <option value='provider'>Provider</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant='primary' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user, history) => {
            dispatch(signup(user, history))
        }
    }
}


export default connect(null, mapDispatchToProps)(SignupForm);
