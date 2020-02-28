import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { signup } from '../../actions/authentication';

const SignupForm = (props) => {

    const handleSubmit = (e) => {
        // e.preventDefault();
        props.history.push('/username/dashboard');
        const form = e.target;
        const user = {
            email: form.email.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            password: form.password.value,
            dateOfBirth: form.dateOfBirth.value
        }
        props.signup(user);
    };

    return (
        <Form id='signUpForm' onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId='email'>
                <Form.Label column sm='6'>Email</Form.Label>
                <Col sm='6'>
                    <Form.Control type='Email' placeholder='Enter Email' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='firstName'>
                <Form.Label column sm='6'>First Name</Form.Label>
                <Col sm='6'>
                    <Form.Control type='firstName' placeholder='First Name' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='lastName'>
                <Form.Label column sm='6'>Last Name</Form.Label>
                <Col sm='6'>
                    <Form.Control type='lastName' placeholder='Last Name' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='password'>
                <Form.Label column sm='6'>Password</Form.Label>
                <Col sm='6'>
                    <Form.Control type='password' placeholder='Password' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='confirmPassword'>
                <Form.Label column sm='6'>Confirm Password</Form.Label>
                <Col sm='6'>
                    <Form.Control type='password' placeholder='Confirm Password' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='dateOfBirth'>
                <Form.Label column sm='6'>Date of Birth</Form.Label>
                <Col sm='6'>
                    <Form.Control type='dateofbirth' placeholder='Date of Birth' />
                </Col>
            </Form.Group>

            <Col sm={{ span: 6, offset: 6 }}>
                <Button variant='primary' type='submit'>Sign Up</Button>
            </Col>

        </Form>
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
