import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { authenticate } from '../../actions/authentication';
import { post } from '../../api';

const SignupForm = (props) => {
    const handleSubmit = () => {
        // todo @justin
        const user = {
            // firstName,
            // lastName,
            // email,
            // password,
            // dateOfBirth
        }

        post('/user', user)
            .then(_ => {
                props.history.push('/username/dashboard')
                props.authenticate()
            })
            .catch(err => {
                // error handler
            })
    };

    return (
        <Form>
            <Form.Group as={Row} controlId='formBasicEmail'>
                <Form.Label column sm='6'>Email</Form.Label>
                <Col sm='6'>
                    <Form.Control type='Email' placeholder='Enter Email' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formBasicUsername'>
                <Form.Label column sm='6'>First Name</Form.Label>
                <Col sm='6'>
                    <Form.Control type='firstname' placeholder='First Name' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formBasicUsername'>
                <Form.Label column sm='6'>Last Name</Form.Label>
                <Col sm='6'>
                    <Form.Control type='lastname' placeholder='Last Name' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formBasicPassword'>
                <Form.Label column sm='6'>Password</Form.Label>
                <Col sm='6'>
                    <Form.Control type='password' placeholder='Password' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formBasicPassword'>
                <Form.Label column sm='6'>Confirm Password</Form.Label>
                <Col sm='6'>
                    <Form.Control type='confirmpassword' placeholder='Confirm Password' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formBasicPassword'>
                <Form.Label column sm='6'>Date of Birth</Form.Label>
                <Col sm='6'>
                    <Form.Control type='dateofbirth' placeholder='Date of Birth' />
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
            dispatch(authenticate())
        }
    }
}


export default connect(null, mapDispatchToProps)(SignupForm);




