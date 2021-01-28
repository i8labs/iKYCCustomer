import React,{Component} from 'react';
import PersonalDetailForm from './PersonalDetailForm'
import '../../css/dashboard.css';

export default class Layout extends Component{
    render(){
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <p className="dashboard-heading">Online KYC</p>
                    <p className="dashboard-subhead">Enter your accurate details as these details would be used for your kyc process.</p>
                </div>
                <div className="dashboard-component">
                    <ul className="dashboard-component-list">
                        <li style={{color:"#2F80ED"}}>Personal Details</li>
                        <li>Contact Details</li>
                        <li>Account Details</li>
                        <li>Document Upload</li>
                        <li>Verify Documents</li>
                    </ul>
                </div>
                <div className="form-container">
                    <PersonalDetailForm />
                </div>
            </div>
        )
    }
}