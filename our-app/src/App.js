import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalToolbar from './components/common/GlobalToolbar';
import LocalToolbar from './components/common/LocalToolbar';
import LoginForm from './components/unauthenticated/LoginForm';
import HomePage from './components/unauthenticated/HomePage';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Dashboard from './components/authenticated/Dashboard';
import Records from './components/authenticated/Records';
import Profile from './components/authenticated/Profile';


function App() {
  return (
    <div className='App'>

      <Router>
        <GlobalToolbar />
        <Route path='/username' component={LocalToolbar} />
        <header className='App-header'>
          <div>
            <Route exact path='/' render={() => (
              <Redirect to='/home' />
            )} />
            <Route path='*/home' component={HomePage} />
            <Route path='/login' component={LoginForm} />
            <Route path='*/dashboard' component={Dashboard} />
            <Route path='*/records' component={Records} />
            <Route path='*/profile' component={Profile} />
          </div>
        </header>
      </Router>
    </div>
  );
}

export default App;
