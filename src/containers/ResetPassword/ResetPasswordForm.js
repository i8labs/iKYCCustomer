import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import SetNewPasswordForm from './SetNewPasswordForm'

class ResetPasswordForm extends Component{

    constructor(){
        super();
        this.state = {
            email:"",
            errors:{},
            success:false,
            isLoading:false
        };
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:{},
            success:false,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    
        const { email } = this.state;
        this.setState({isLoading:true});
    
        Auth.forgotPassword(email)
        .then(data =>{
          console.log(data);
          this.setState({isLoading:false,success:true});
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false
            })
        });
    
      };

    render(){

        const {errors,email,isLoading,success} = this.state;
        return (
            <div className="auth-right-container">
                    {!success && 
                        <form onSubmit = {this.handleSubmit} autoComplete = "off">
                            <div className="auth-title-form">
                                <p>Reset Password</p>
                            </div>
                            {errors.message && 
                                <p className="auth-message bg-error">
                                {errors.message}
                                </p>
                            }
                            <div className="form-input">
                                <input className="auth-input" type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autocomplete="off" required/>
                            </div>
                            <div className="auth-exist-login">
                                <p>Remember Your password? <NavLink to="/login" style={{textDecoration:"none",color:"blue"}}>Login</NavLink></p>
                            </div>
                            <div >
                            <button className="auth-submit-button" style={{background:isLoading?"gray":"#2F80ED",opacity:isLoading?"0.5":""}} disabled={isLoading}>Login</button>
                            </div>
                        </form>
                    }
                    {
                        !!success && <SetNewPasswordForm email={email} callAlert = {this.props.callAlert}/>
                    }
            </div>
        )
    }
}

export default ResetPasswordForm;