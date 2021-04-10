import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Endpoints from '../../api'
import Axios from 'axios';


class LoginForm extends Component{

    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            confirmPassword:"",
            errors:{},
            registered:false,
            success:false
        };
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
            success:false,
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            loading:true
        })
        const {email,password} = this.state;
        
        try {
            const LoginResponse = await Auth.signIn({
              username: email,
              password,
            });
            if (LoginResponse) {
                console.log("lr",LoginResponse)

                try{
                let params = {cognito_id : LoginResponse.username}

                const resp = await Axios.get(Endpoints.GET_UserId,{params})
                if(resp){
                    localStorage.setItem('User_Id', resp.data[0]);
                    this.props.history.push('/dashboard')
                }
                }catch(err){
                    await Auth.signOut()
                    this.props.callAlert(err.message)
                }
            } else {
              this.setState({ password: "", confirmpassword: "",loading:false });
            }
          } catch (err) {
            console.log(err);
            this.props.callAlert(err.message)
            this.setState({
              password: "",
              confirmpassword: "",
              loading:false
            });
          }
    };

    render(){

        const {email,password,loading} = this.state;
        return (
            <div className="auth-right-container">
                    <form onSubmit = {this.handleSubmit} autoComplete = "off">
                        <div className="auth-title-form">
                            <p>Login</p>
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form-input">
                            <input className="auth-input login-password" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required/>
                            <span className="forgot-password"><NavLink to="/reset_password" style={{textDecoration:"none"}}>Forgot</NavLink></span>
                        </div>
                        <div className="auth-exist-login">
                            {/* <p>No Account? <NavLink to="/register" style={{textDecoration:"none",color:"blue"}} disabled>Sign Up</NavLink></p> */}
                        </div>
                        <div >
                         <button className="auth-submit-button" style={{background:loading?"gray":"#2F80ED",opacity:loading?"0.5":""}} disabled={loading}>Login</button>
                        </div>
                    </form>
            </div>
        )
    }
}

export default LoginForm;