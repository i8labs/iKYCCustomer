import React,{Component} from 'react';
import PersonalDetailForm from './PersonalDetailForm'
import warning_img from '../../images/warning.png';
import '../../css/kycForm.css';

export default class Layout extends Component{
    render(){
        return (
            <div>
                <div className="formpage-sidebar">
                    <div className="formpage-sidebar-container">
                        <div className="formpage-warning-img">
                            <img src={warning_img} />
                        </div>
                        <div className="formpage-sidebar-desc">
                            <p className="formpage-sidebar-desc-head">Hello, KYC is not done yet! </p>
                            <p className="formpage-sidebar-desc-subhead">Please fill the form and attach the require document to complete KYC.</p>
                        </div>
                        </div>
                </div>


            <div className="kyc_form-container">
                <div className="dashboard-header">
                    <p className="dashboard-heading">Online KYC</p>
                    <p className="dashboard-subhead">Enter your accurate details as these details would be used for your kyc process.</p>
                </div>
                <div className="form-container">
                    <PersonalDetailForm {...this.props}/>
                </div>
            </div>
            </div>
        )
    }
}