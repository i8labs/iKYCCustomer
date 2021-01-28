import React,{Component} from 'react';
import RegisterForm from './RegisterForm';
import '../../css/auth.css';
import productive from '../../images/productive.png'
import element from '../../images/element.png'

export default class Register extends Component{
    render(){
        return (
            <div className="auth-main">
                <div className="auth-container">
                    <div className="auth-split auth-left">
                        <div className="left-container">
                            <div className="auth-title">
                                <p>eS-KYC</p>
                            </div>
                            <div className="auth-desc">
                                <p>Best Digital KYC management software solution provider with security and ease of use.</p>
                            </div>
                            <div className="auth-image">
                                <img src={productive} />
                            </div>
                        </div>
                    </div>
                    <div className="mid-line"></div>
                    <div className="auth-split auth-right">
                        <RegisterForm />
                    </div>
                </div>
                <div className="auth-element1">
                    <img src={element} />
                </div>
                <div className="auth-element2">
                    <img src={element} />
                </div>
            </div>
        )
    }
}