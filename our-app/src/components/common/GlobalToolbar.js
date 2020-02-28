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
            <Navbar.Collapse className="justify-content-end">
                {/* if authenticated show logout, else show login/signup */}
                {props.isAuthenticated ?
                    <Button className='ml-2' variant='outline-info' onClick={handleLogout}>Logout</Button>
                    :
                    <>
                        <Button className='ml-2' variant='outline-info' onClick={() => props.history.push('login')}>Login</Button>
                        <Button className='ml-2' variant='outline-success' onClick={() => props.history.push('signup')}>Sign Up</Button>
                    </>
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

// To access history.push in a component that is not wrapped in a <Route /> component
// we must use withRouter.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalToolbar));