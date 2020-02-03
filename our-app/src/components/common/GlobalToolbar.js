import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function GlobalToolbar() {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href='/'>
                Block
                <sub>Rx</sub>
            </Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link href='home'>Home</Nav.Link>
                <Nav.Link href='pricing'>Pricing</Nav.Link>
                <Nav.Link href='about'>About Us</Nav.Link>
            </Nav>
            <Button variant='outline-info' href='login'>Login</Button>
        </Navbar>
    );
}

export default GlobalToolbar;