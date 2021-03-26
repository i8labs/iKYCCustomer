import React,{Component} from 'react';
import RegisterForm from './RegisterForm';
import {NavLink} from 'react-router-dom';
import '../../css/auth.css';
import logo from '../../images/logo.png'
import element from '../../images/element.png';
import {UncontrolledAlert} from 'reactstrap'

export default class Register extends Component{


    constructor(){
        super();
        this.state = {
            showAlert:false,
            alertMessage:"",
            alertColor:""
        }
    }

    callAlert = (alertMessage,alertColor) =>{
        console.log("called");
            this.setState({
                showAlert:true,
                alertMessage:alertMessage,
                alertColor:alertColor
            })
            return null;
    }
    render(){
        const {showAlert,alertColor,alertMessage} = this.state;
        return (
            <div className="auth-main">
                <div className="auth-container">
                    {   
                        showAlert && 
                        <UncontrolledAlert color={alertColor} style={{position:"absolute",marginTop:"-24px",marginLeft:"10%",width:"80%",zIndex:"200"}}>
                            { alertColor === "success" && <span>You have been registered successfully. You can <NavLink to="/login">Login</NavLink> here post verification.</span>}
                            { alertColor === "danger" && <span>{alertMessage}</span> }
                        </UncontrolledAlert>
                    }
                    <div className="auth-split auth-left">
                        <div className="left-container">
                            <div className="auth-title">
                                <p>i8KYC</p>
                            </div>
                            <div className="auth-desc">
                                <p>Best Digital KYC management software solution provider with security and ease of use.</p>
                            </div>
                            <div className="auth-image">
                                <img src={logo} alt="logo" />
                            </div>
                        </div>
                    </div>
                    <div className="mid-line"></div>
                    <div className="auth-split auth-right">
                        <RegisterForm callAlert = {this.callAlert}/>
                    </div>
                </div>
                <div className="auth-element1">
                    <img src={element} alt="element"/>
                </div>
                <div className="auth-element2">
                    <img src={element} alt="element"/>
                </div>
            </div>
        )
    }
}