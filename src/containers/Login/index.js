import React,{Component} from 'react';
import LoginForm from './LoginForm';
import '../../css/auth.css';
import logo from '../../images/logo.png'
import element from '../../images/element.png'
import {UncontrolledAlert} from 'reactstrap'

class Login extends Component{

    constructor(){
        super();
        this.state = {
            showAlert:false,
            alertMessage:"",
        }
    }

    callAlert = (alertMessage) =>{
            this.setState({
                showAlert:true,
                alertMessage:alertMessage,
            })
            return null;
    }


    render(){
        const {showAlert,alertMessage} = this.state;

        return (
            <div className="auth-main">
                <div className="auth-container">
                {   
                        showAlert && 
                        <UncontrolledAlert color="danger" style={{position:"absolute",marginTop:"-24px",marginLeft:"10%",width:"80%",zIndex:"200"}}>
                            {alertMessage}
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
                                <img src={logo} alt="logo"/>
                            </div>
                        </div>
                    </div>
                    <div className="mid-line"></div>
                    <div className="auth-split auth-right">
                        <LoginForm callAlert = {this.callAlert} {...this.props}/>
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

export default Login