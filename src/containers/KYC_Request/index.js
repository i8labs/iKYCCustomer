import React,{Component} from 'react';
import {Button,Spinner} from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Axios from 'axios';
import EyeOffIcon from "mdi-react/EyeOffIcon";
import EyeIcon from "mdi-react/EyeIcon";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Alert } from 'reactstrap';
import '../../css/dashboard.css';
import Endpoints from '../../api'

export default class KYC_Request extends Component{

    constructor(){
        super();
        this.state = {
            institutions: [],
            toggle: "",
            otp: "",
            showAlert:false,
            alertColor:"",
            alertMessage:""
        }
    }

   callAlert = (alertMessage,alertColor) =>{
      this.setState({
          showAlert:true,
          alertMessage:alertMessage,
          alertColor:alertColor,
          loading:false
      })
      // clearTimeout(timeoutId)
      // cancelTokenSource.cancel();
      setTimeout(
        () => this.setState({showAlert:false}),
        3000
      )
      return null;
  }
   getOtp = async(institutionId) => {
      try{
        const body = {
          userId : localStorage.getItem("User_Id"),
          institutionId
        }

        const resp = await Axios.post(Endpoints.GET_OTP,body)
        if(resp){
            this.setState({
              otp : resp.data.OTP,
              toggle : institutionId
            })
        }
        }catch(err){
            console.log(err);
        }
    }
    hideOtp = () => {
      this.setState({
        otp : '',
        toggle : ''
      })
    }
    componentDidMount = async(e) =>{
     
        try{
           const body = {userId : localStorage.getItem("User_Id")}

            const resp = await Axios.post(Endpoints.KYC_REQUEST,body)
            if(resp){
                this.setState({
                    institutions : resp.data,
                    loading:false,
                })
            }
        }catch(err){
            console.log(err);
        }
    }

    render(){

        const {institutions,loading,toggle,otp,alertColor,alertMessage, showAlert} = this.state;
        console.log(window.innerWidth)
        console.log("ale",alertMessage)
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
              <div className="dashboard">
                { showAlert &&
                  <Alert color={alertColor} style={{position:"absolute",marginTop:"-26px",marginLeft:"8%",width:"80%",zIndex:"200"}}>
                      { alertColor === "danger" && <span>{alertMessage}</span> }
                  </Alert>
                }
                <div className="dashboard-header">
                    <div style={{float:"left"}}>
                      <p className="dashboard-heading">Institutions</p>
                      <p className="dashboard-subhead">List of Institution with their OTP</p>
                    </div>
                </div>
                {!loading && !institutions.length && 
                <div style={{marginTop:"130px",marginLeft:"18px",fontFamily:"Lato",fontSize:"20px"}}>No request for KYC.</div>
                }
              {!!institutions.length &&
                <Table className="table" >
              <Thead className="thead">
                <Tr>
                  <Th style={{borderTop:"none",paddingLeft:"18px"}}>Institution Id</Th>
                  <Th style={{borderTop:"none",paddingLeft:"18px"}}>Institution Name</Th>
                  <Th style={{borderTop:"none",paddingLeft:"18px"}}>Email</Th>
                  <Th style={{borderTop:"none"}}>Requested Date</Th>
                  <Th style={{borderTop:"none"}}>KYC Status</Th>
                  <Th style={{borderTop:"none"}}>Action</Th>
    
                </Tr>
              </Thead>
              <Tbody>
                 {institutions.map((institution) => {
                  return ( 
                    <Tr>
                      <Td>
                        {institution.Institution_Id}
                      </Td>
                      <Td style={{paddingTop:"4px"}}>
                            <img  className="topbar__avatar-img"
                                        src={`https://robohash.org/${institution.Email}`}
                                        alt="avatar"
                                        style={{marginRight:"10px",marginBottom:"5px"}}
                                    alt="user_pic"
                            />
                         {institution.Institution_Name}
                      </Td>
                      <Td> {institution.Email}</Td>
                      <Td>{new Date(institution.createdDate).toLocaleDateString()}</Td>
                      <Td style={{color:institution.fetched?"green":"orange"}}>
                        {institution.fetched?'FETCHED':'SCANNED'}
                      </Td>
                      <Td >
                        {(toggle === institution.Institution_Id) && 
                          <div>
                            <input  style={{border:"1px solid",width:"70px",borderRadius:"2px",textAlign:"center"}} type="text" placeholder="OTP" name="otp" onChange={this.handleChange} maxLength="4" value={otp} disabled/>
                            <EyeOffIcon size="1.8em" style={{color:"#6c85a0",cursor:"pointer",margin:" 0 0 4px 4px"}} onClick={() => this.hideOtp(institution.User_Id)}/> 
                          </div>
                        }
                        {(toggle !== institution.Institution_Id) &&
                          <Button style={{padding:"2px 6px"}} onClick = {() => this.getOtp(institution.Institution_Id)}><EyeIcon size="1.2em" style={{marginRight:"6px",marginBottom:"1.8px"}} />View OTP</Button>
                        }
                      </Td>
                    </Tr>
                   );
                })}
              </Tbody>
            </Table>
            }
            </div>
            
            </>
        )
    }
}