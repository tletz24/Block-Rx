import React from 'react';
import { Navbar, Button, Badge } from 'react-bootstrap';

function GlobalToolbar() {
    return (
        <Navbar bg='dark' variant='dark' >
            <h1>
                <Badge pill variant="secondary">Health Wallet</Badge>
            </h1>
            <Navbar.Collapse className="justify-content-end">
                <Button className='ml-2' variant='outline-info' href='login'>Login</Button>
                <Button className='ml-2' variant='outline-success' href='signup'>Sign Up</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default GlobalToolbar;