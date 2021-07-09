import React,{Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import {Button,Spinner} from 'reactstrap';
import Axios from 'axios';
import '../../css/dashboard.css';
import Endpoints from '../../api';
import moment from 'moment';

export default class Layout extends Component{

    constructor(){
        super();
        this.state = {
            user:{},
            user_documents : {},
            loading:true,
            institutions : [],
        }
    }

    componentDidMount = async(e) =>{
        try{
            const user_Id = localStorage.getItem("User_Id");
            let body = {user_Id};
            let resp = await Axios.post(Endpoints.GET_USER_DETAIL,body);
            if(resp){
                let resp2 = await Axios.post(Endpoints.GET_USER_DOCUMENT,{userId:user_Id});
                const resp3 = await Axios.post(Endpoints.KYC_REQUEST,{userId:user_Id});
                this.setState({
                    user : resp.data[0],
                    user_documents : resp2.data,
                    institutions : resp3.data,
                    loading : false
                })
            }
        }catch(err){
            console.log(err);
            this.setState({
                loading:false
            })
        }
    }

    render(){

        const {user,loading,user_documents,institutions} = this.state;
        console.log("dashboard",user)

        return (
            <>
                {
                !!loading && 
                    <div className="panel__refresh">
                        <div className="loading__icon">
                        <Spinner color="primary"/>
                        </div>
                    </div>
                }
                { !loading && !!user &&
                <div className="user_detail-main">
                    <div className="user_detail-container">
                        <div className="user_detail-split user_detail-left">
                            <div className="user_detail-left-container">
                                <div >
                                    <div className="user_detail-avatar">
                                        <img  className="topbar__avatar-img"
                                            src={`https://robohash.org/${user.email}`}
                                            alt="avatar"
                                            style={{width:"50px",height:"50px"}}
                                        />
                                    </div>
                                    <div className="user_detail-header" style={{background:"#f5921e",minWidth:"120px"}}>
                                        {/* <p>View KYC Details</p> */}
                                        <Link to="kyc_form" > <p>{user_documents.QR?"Update KYC":"Fill KYC"} </p></Link>
                                    </div>
                                </div>
                                <div className="user_detail-name">
                                    Hello, {user.Name}
                                </div>
                                    <div className="user_detail-dob">
                                        DOB: {user.DOB}
                                    </div>
                                    <div className="user_detail-contacts">
                                        {user.Phone_No}
                                        <br/>
                                        {user.Email}
                                    </div>
                                { !!user_documents.QR && 
                                    <div>
                                        <a href={user_documents.QR} title="Save QR"><img src={user_documents.QR} alt="QR Code" width="225px" height="225px" />
                                         <p className="user_details-qr_send">Download</p>
                                        </a> 
                                    </div>
                                }
                                {!user_documents.QR && <div style={{position:"absolute",maxWidth:"400px",width:"100vw",fontSize:"18px"}}>
                                    You have not completed your KYC form.Please fill it to get your QR code.
                                </div>}
                            </div>
                        </div>
                        <div className="user_detail-split user_detail-right">
                            <div className="user_detail-right-container">
                                    <div className="user_detail-right-head">
                                      Institution List ({(institutions.length)?institutions.length:0})
                                    </div>
                                    { !institutions.length && 
                                        <p>You have not send QR to any Insititute</p>
                                    }
                                    {!!institutions.length && institutions.map(institute => {
                                            return (
                                                <div className="user_detail-institution" >
                                                <div className="user_detail-section">
                                                    <p className="user_detail-section-header">{institute.Institution_Name}</p>
                                                    <p className="user_detail-section-sub_header">{moment(institute.createdDate).fromNow()}</p>
                                                </div>
                                                <div className="user_detail-section-right" >
                                                    Status: <span style={{color:institute.fetched?"green":""}}>{institute.fetched?"FETCHED":"SCANNED"}</span>
                                                </div>
                                            </div>
                                            )
                                    })}
                            </div>
                        </div>
                    </div>
            </div>}
            </>
        )
    }
}