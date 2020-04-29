import React from 'react';
import { connect } from "react-redux";
import { Navbar, Nav } from 'react-bootstrap';

function LocalToolbar(props) {
    return (
        <Navbar bg='secondary' variant='dark' sticky='top'>
            <Navbar.Brand>{props.name}</Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link onClick={() => props.history.push('dashboard')}>Dashboard</Nav.Link>
                <Nav.Link onClick={() => props.history.push('records')}>My Records</Nav.Link>
                <Nav.Link onClick={() => props.history.push('profile')}>My Profile</Nav.Link>
                <Nav.Link onClick={() => props.history.push('immunization')}>Immunization Form</Nav.Link>
            </Nav>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    const user = state.authentication.user;
    return {
        name: user && user.firstName + ' ' + user.lastName
    }
};

export default connect(mapStateToProps)(LocalToolbar);
