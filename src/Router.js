import React from 'react';

import {Route,Switch,withRouter} from 'react-router-dom';
import Register from './containers/Register/index';
import Login from './containers/Login/index';
import Layout from './containers/Layout/index'
import Dashboard from './containers/Dashboard/index';
import './MainWrapper'

const Pages = () => (
    <Switch>
        <Route path='/home' component={Dashboard} />
    </Switch>
);

const wrappedRoutes = () => (
    <div style={{backgroundColor: "red"}}>
      <Layout />
      <Route path="/" component={Pages} />
    </div>
  )

const Router = () => (
        <Switch>
            <Route exact path ='/' component={Login} />
            <Route exact path ='/login' component={Login} />
            <Route exact path ='/register' component={Register} />
            <Route path="/" component={wrappedRoutes} />
        </Switch>
    );


export default withRouter(Router);