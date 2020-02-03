import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function LocalToolbar() {
    return (
        <Navbar bg='info' variant='light' sticky='top'>
            <Navbar.Brand>Username</Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link href='dashboard'>Dashboard</Nav.Link>
                <Nav.Link href='records'>My Records</Nav.Link>
                <Nav.Link href='profile'>My Profile</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default LocalToolbar;