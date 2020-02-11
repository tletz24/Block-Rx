import React from 'react';
import { Navbar, Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authentication';
import { withRouter } from 'react-router'

function GlobalToolbar(props) {

    const handleLogout = () => {
        props.history.push('/home')
        props.logout()
    };

    return (
        <Navbar bg='dark' variant='dark' >
            <h1>
                <Badge pill variant="secondary">Health Wallet</Badge>
            </h1>
            {props.isAuthenticated ?
                <Navbar.Collapse className="justify-content-end">
                    <Button className='ml-2' variant='outline-info' onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
                :
                <Navbar.Collapse className="justify-content-end">
                    <Button className='ml-2' variant='outline-info' onClick={() => props.history.push('login')}>Login</Button>
                    <Button className='ml-2' variant='outline-success' onClick={() => props.history.push('signup')}>Sign Up</Button>
                </Navbar.Collapse>
            }
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalToolbar));