import React from 'react';
import { Form, Button, Row, Col, Card} from 'react-bootstrap';
import { connect } from "react-redux";
import { signup } from '../../actions/authentication';
import { authenticate } from '../../actions/authentication';
import { post } from '../../api';

const SignupForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const user = {
            email: form.email.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            password: form.password.value,
            dateOfBirth: form.dateOfBirth.value
        }

        post('/user', user)
            .then(id => {
                console.log(id);
                props.signup(user);
                props.history.push('username/dashboard');
            })
            .catch(err => console.error(err))
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
                        <Form.Control type='dateofbirth' placeholder='Date of Birth' />
                    </Form.Group>
                    
                    <Button variant='primary' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => {
            dispatch(signup(user))
        }
    }
}


export default connect(null, mapDispatchToProps)(SignupForm);
