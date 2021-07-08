import React, { PureComponent } from "react";
import '../../css/sidebar.css'
import warning_img from '../../images/warning.png';
import AccountSearchIcon from "mdi-react/AccountSearchIcon";
import { NavLink } from "react-router-dom";

class Sidebar extends PureComponent {



  render() {
    const {pathname} = this.props.location
    return (
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <NavLink className="sidebar_menu-navlink" to="/dashboard">
              <div className={`sidebar_menu ${pathname.includes('dashboard')?"sidebar-active":""}`}>Dashboard</div>
            </NavLink>
            <NavLink className="sidebar_menu-navlink" to="/kyc_form">
            <div className={`sidebar_menu ${pathname.includes('kyc_form')?"sidebar-active":""}`}>KYC Form</div>
          </NavLink>
          <NavLink className="sidebar_menu-navlink" to="/kyc_request">
            <div className={`sidebar_menu ${pathname.includes('kyc_request')?"sidebar-active":""}`}>KYC Request</div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Sidebar;
