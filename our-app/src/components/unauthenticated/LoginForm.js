import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function LoginForm() {
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
            <Button href='username/dashboard' variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;