import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Auth} from 'aws-amplify';

class RegisterForm extends Component{

    constructor(){
        super();
        this.state = {
            i_name:'',
            phone_number:"",
            contactPerson:"",
            email:"",
            password:"",
            confirmPassword:"",
            registered:false
        };
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleSubmit = async (e) => {

        console.log("submittt");
        e.preventDefault();

        this.setState({
            loading:true
        })
        const {email,password,confirmPassword,i_name,phone_number,contactPerson} = this.state;
        
        if(password !== confirmPassword){
            this.props.callAlert("passwords do not match","danger")
            this.setState({
                password:'',
                confirmPassword:'',
                loading:false
            });
            return ;
        }
        try {
            const signUpResponse = await Auth.signUp({
              username: email,
              password,
              attributes: {
                name: i_name,
                phone_number:"+91"+phone_number,
                "custom:contact_person":contactPerson
              },
            });
            if (signUpResponse) {
              await this.props.callAlert("success","success")
              this.setState({registered:true,loading:false});
            } else {
              this.setState({ password: "", confirmpassword: "",loading:false });
            }
          } catch (err) {
            console.log(err);
            await this.props.callAlert(err.message,"danger")
            this.setState({
              password: "",
              confirmpassword: "",
              loading:false
            });
          }
    };

    render(){

        const {email,password,confirmPassword,phone_number,contactPerson,loading,registered,i_name} = this.state;

        return (
            <div className="auth-right-container" style={{top:"11%"}}>
                    <form onSubmit = {this.handleSubmit} autoComplete = "off">
                        <div className="auth-title-form">
                            <p>Sign Up</p>
                        </div>
                        
                        <div className="form-input">
                            <input className="auth-input" type="text" placeholder="Institution name" name="i_name" value={i_name} onChange={this.handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autoComplete="off" required />
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="text" placeholder="Phone No" name="phone_number" value={phone_number} onChange={this.handleChange} autoComplete="off" required />
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="text" placeholder="Contact Person" name="contactPerson" value={contactPerson} onChange={this.handleChange} autoComplete="off" required />
                        </div>
                        <div className="form-input">
                            <input className="auth-input" type="password" placeholder="Create Password" name="password" value={password} onChange={this.handleChange} required/>
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