import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Auth} from 'aws-amplify'

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
            errors:{},
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
                console.log(LoginResponse);
              this.setState({loading:false});
              this.props.history.push('/home')
            } else {
              this.setState({ password: "", confirmpassword: "",loading:false });
            }
          } catch (err) {
            console.log(err);
            const message = err.message;
            this.setState({
              password: "",
              confirmpassword: "",
              errors: {message},
              loading:false
            });
          }
    };

    render(){

        const {errors,email,password,loading} = this.state;
        return (
            <div class="auth-right-container">
                    <form onSubmit = {this.handleSubmit} autoComplete = "off">
                        <div className="auth-title-form">
                            <p>Login</p>
                        </div>
                        {errors.message && 
                            <p className="auth-message bg-error">
                             {errors.message}
                            </p>
                        }
                        <div className="form-input">
                            <input className="auth-input" type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autocomplete="off" required/>
                        </div>
                        <div className="form-input">
                            <input className="auth-input login-password" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required/>
                            <span className="forgot-password">Forgot</span>
                        </div>
                        <div className="auth-exist-login">
                            <p>No Account? <NavLink to="/register" style={{textDecoration:"none",color:"blue"}}>Sign Up</NavLink></p>
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