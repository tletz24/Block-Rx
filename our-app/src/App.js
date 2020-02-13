import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import GlobalToolbar from './components/common/GlobalToolbar';
import LocalToolbar from './components/authenticated/LocalToolbar';
import LoginForm from './components/unauthenticated/LoginForm';
import HomePage from './components/unauthenticated/HomePage';
import Dashboard from './components/authenticated/Dashboard';
import Records from './components/authenticated/Records';
import Profile from './components/authenticated/Profile';
import SignupForm from './components/unauthenticated/SignupForm'

function App(props) {
  return (
    <div className='App'>
      <GlobalToolbar />
      <Route path='/username' component={LocalToolbar} />
      <header className='App-header'>
        <div>
          <Route exact path='/' render={() => (
            <Redirect to='/home' />
          )} />
          <Route path='*/home' component={HomePage} />
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignupForm} />
          <Route path='*/dashboard' component={Dashboard} />
          <Route path='*/records' component={Records} />
          <Route path='*/profile' component={Profile} />
        </div>
      </header>
    </div>
  );
}

export default App;
