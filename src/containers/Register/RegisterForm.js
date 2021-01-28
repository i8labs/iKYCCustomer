import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Spinner from '../../shared/spinner';

class RegisterForm extends Component{

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

        console.log("submittt");
        e.preventDefault();

        this.setState({
            loading:true
        })
        const {email,password,confirmPassword} = this.state;
        
        if(password !== confirmPassword){
            const message = 'Passwords do not match.'
            this.setState({
                password:'',
                confirmPassword:'',
                errors:{message},
                loading:false
            });
            return ;
        }
        try {
            const signUpResponse = await Auth.signUp({
              username: email,
              password,
            });
            if (signUpResponse) {
              this.setState({registered:true,loading:false});
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

        const {errors,email,password,confirmPassword,success,loading,registered} = this.state;

        return (
            <div class="auth-right-container">
                    <form onSubmit = {this.handleSubmit} autoComplete = "off">
                        <div className="auth-title-form">
                            <p>Sign Up</p>
                        </div>
                        {errors.message && 
                            <p className="auth-message bg-error">
                             {errors.message}
                            </p>
                        }
                        {registered && 
                            <p className="auth-message bg-success">
                                 You have been registered successfully.Check your email for verification link,you can <NavLink to='/login' style={{textDecoration:"none",color:"blue"}}>Login Here</NavLink> post verifiaction. 
                            </p>
                        }
                        <div className="form-input">
                            <input className="auth-input" type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autocomplete="off" required/>
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required/>
                        </div>
                        <div className="auth-exist-login">
                            <p>Already have an Account? <NavLink to="/login" style={{textDecoration:"none",color:"blue"}}>Log In</NavLink></p>
                        </div>
                        <div >
                         <button className="auth-submit-button" style={{background:(loading || registered)?"gray":"#2F80ED",opacity:(loading || registered)?"0.5":""}} disabled={loading || registered}>Register</button>
                        </div>
                    </form>
            </div>
        )
    }
}

export default RegisterForm;