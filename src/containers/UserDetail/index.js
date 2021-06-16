    import React,{Component} from 'react';
    import '../../css/userDetail.css';
    import {Button } from 'reactstrap';
    import {NavLink } from "react-router-dom";
    import id_image from '../../images/id.jpg'
    import Axios from 'axios';
    import Endpoints from '../../api';

    class Login extends Component{

        constructor(){
            super();
            this.state = {
                user:[],
                user_documents : {},
                loading:true
            }
        }
    
        componentDidMount = async(e) =>{
            try{
                const user_Id = localStorage.getItem("User_Id");
                const body = {user_Id};
                let resp = await Axios.post(Endpoints.GET_USER_DETAIL,body);
                if(resp){
                    let resp2 = await Axios.post(Endpoints.GET_USER_DOCUMENT,{userId:user_Id});
                    this.setState({
                        user : resp.data[0],
                        user_documents : resp2.data,
                        loading : false,
                    })
                }
            }catch(err){
                console.log(err);
            }
        }

        render(){
            const {user} = this.state;
            return (
                <>
                {
                    user.length && 
                    <div className="user_detail-alert">
                        <NavLink to="/create_user"><Button color="primary" style={{paddingTop:"4px",width:"auto"}} className="search_bar-btn">Create New User</Button></NavLink>
                    </div>
                }
                { !user.length &&
                <div className="user_detail-main">
                    <div className="user_detail-container">
                        <div className="user_detail-split user_detail-left">
                            <div className="user_detail-left-container">
                                <div >
                                    <div className="user_detail-avatar">
                                        <img  className="topbar__avatar-img"
                                            src="https://robohash.org/qwert"
                                            alt="avatar"
                                            style={{width:"50px",height:"50px"}}
                                        />
                                    </div>
                                    <div className="user_detail-header">
                                        KYC is Completed.
                                    </div>
                                </div>
                                <div className="user_detail-name">
                                    Jason Macdonald
                                </div>
                                <div className="user_detail-dob">
                                    DOB: 02/01/1999
                                </div>
                                <div className="user_detail-contacts">
                                    +91 9789456123
                                    <br/>
                                    qwertyabc123@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className="user_detail-split user_detail-right">
                            <div class="user_detail-right-container">
                                    <div className="user_detail-section" style={{display:"block ruby"}}>
                                        <div className="user_detail-idSection">
                                            <p className="user_detail-section-header">Aadhar Card</p>
                                            <p className="user_detail-section-sub_header">XXXX-XXXX-XXXX-XXXX</p>
                                        </div>
                                        <div>
                                            <img src = {id_image} width="110px" height="55px" alt="file" />
                                        </div>
                                    </div>
                                    <div className="user_detail-section">
                                        <p className="user_detail-section-header">Address</p>
                                        <p className="user_detail-section-sub_header">123,ipsum lorem, lorem ipsum, loreim ipsum</p>
                                    </div>
                                    <div className="user_detail-section">
                                        <p className="user_detail-section-header">Bank Details</p>
                                        <p className="user_detail-section-sub_header">Bank Name: XXXXXXXXXXX<br/>
                                                                                    Account Number: XXXXXXXXXXXXXXX<br/>
                                                                                    IFSC: XXXXXXX</p>
                                    </div>
                            </div>
                        </div>
                    </div>
            </div>}
            </>
            )
        }
    }

    export default Login