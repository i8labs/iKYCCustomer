import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Auth} from 'aws-amplify'

class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:props.email,
            otp:"",
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
            errors:{}
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
    
        const { email, password, otp,confirmPassword} = this.state;
    
        if(password !== confirmPassword){
          const message = 'Password do not Match'
          this.setState({password:"",confirmPassword:"",errors:{message}});
          return;
        }
       Auth.forgotPasswordSubmit(email, otp, password)
        .then(async data => {
            await this.props.callAlert("success","success")
            this.setState({
                errors: {},
                success:true
              });
        })
        .catch(async err => {
            const message = err.message || err;
            await this.props.callAlert(message,"danger")
            console.log(err);
        });
    
      };

    render(){

        const {errors,otp,password,isLoading,confirmPassword,success} = this.state;
        return (
                <form onSubmit = {this.handleSubmit} autoComplete = "off" >
                    <div className="auth-title-form">
                        <p>Reset Password</p>
                    </div>
                    {errors.message && 
                        <p className="auth-message bg-error">
                            {errors.message}
                        </p>
                    }
                    <div className="form-input">
                        <input className="auth-input" type="text" placeholder="OTP" name="otp" value={otp} onChange={this.handleChange} required disabled={success}/>
                    </div>
                    <div className="form-input">
                        <input className="auth-input " type="password" placeholder="Create New Password" name="password" value={password} onChange={this.handleChange} required disabled={success}/>
                    </div>
                    <div className="form-input">
                        <input className="auth-input" type="password" placeholder="Confirm New Password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required disabled={success}/>
                    </div>
                    <div className="auth-exist-login">
                        <p>Click <NavLink to="/reset_password">Here</NavLink> to change Email</p>
                    </div>
                    <div >
                        <button className="auth-submit-button" style={{background:(isLoading || success)?"gray":"#2F80ED",opacity:(isLoading || success)?"0.5":""}} disabled={isLoading || success}>Login</button>
                    </div>
                </form>
        )
    }
}

export default LoginForm;