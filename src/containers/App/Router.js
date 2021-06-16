import React from 'react';

import {Route,Switch,withRouter} from 'react-router-dom';
import Register from '../Register/index';
import Login from '../Login/index';
import ResetPassword from '../ResetPassword/index';
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import Dashboard from '../Dashboard/index';
import KYCForm from '../KYCForm/index';
import UserDetail from '../UserDetail/index'
import KYC_Request from '../KYC_Request';

const Pages = () => (
    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route exact path='/kyc_form/:user_id' component={KYCForm} />
        <Route exact path ='/user/:user_id' component={UserDetail} />
        <Route path='/kyc_request' component={KYC_Request} />
        <Route path="*" component= {Dashboard} />
    </Switch>
);

const wrappedRoutes = (props) => (
    <div>
      <Topbar />
      <Sidebar {...props}/>
      <Route path="/" component={Pages} />
    </div>
  )

class Router extends React.Component{

    // componentWillMount = () =>{
    //     console.log('router will mount')
    // }

    // componentDidMount = () =>{
    //     console.log('router Did mount')
    //     console.log('router Did mount 2')
    // }
    render(){
        return(
            <Switch>
                <Route exact path ='/' component={Login} />
                <Route exact path ='/login' component={Login} />
                <Route exact path ='/register' component={Register} />
                <Route exact path ='/reset_password' component={ResetPassword} />
                <Route path="/" component={wrappedRoutes} />
            </Switch>
        );
    }
} 

export default withRouter(Router);