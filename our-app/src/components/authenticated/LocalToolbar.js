import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function LocalToolbar(props) {
    return (
        <Navbar bg='secondary' variant='dark' sticky='top'>
            <Navbar.Brand>Username</Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link onClick={() => props.history.push('dashboard')}>Dashboard</Nav.Link>
                <Nav.Link onClick={() => props.history.push('records')}>My Records</Nav.Link>
                <Nav.Link onClick={() => props.history.push('profile')}>My Profile</Nav.Link>
                <Nav.Link onClick={() => props.history.push('immunization')}>Immunization Form</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default LocalToolbar;