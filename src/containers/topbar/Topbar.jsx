import React, { PureComponent } from "react";
import {NavLink } from "react-router-dom";
import {Button } from 'reactstrap';
import TopbarProfile from "./TopbarProfile";
import '../../css/topbar.css'
import AccountSearchIcon from "mdi-react/AccountSearchIcon";

class Topbar extends PureComponent {

  constructor(){
    super();
    this.state = {
      mobile_no:null,
    }
  }


  handleChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {


    const {mobile_no} = this.state;
    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <div className="topbar__logo" >
             <NavLink to="/dashboard" style={{textDecoration:"none",color:"#2F80ED"}}>i8KYC</NavLink>
            </div>
          </div>
          {/* <div className="topbar__center" >
            <form style={{display:"inline"}}  action="/home" method="get" >
              <div className="search_bar">
                <AccountSearchIcon className="search_icon"/>
                <input className="searchbar-form-input" name="mobile_no" value={mobile_no} onChange={this.handleChange} placeholder="Search User By Mobile No" />
              </div>
              <Button color="primary" style={{paddingTop:"4px"}} className="search_bar-btn" disabled={mobile_no === null}>Search</Button>
            </form>
            <div style={{display:"inline-flex"}} type="submit">
              <NavLink to="/create_user">
                <Button color="primary" style={{paddingTop:"4px",width:"auto"}} className="search_bar-btn">
                  Create New User
                </Button>
                </NavLink>
            </div>
          </div> */}
          <div className="topbar__right">
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
