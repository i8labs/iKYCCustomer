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
              <div className="sidebar_menu" style={{background:(pathname.includes('dashboard'))?'rgb(255, 144, 64)':''}}>Dashboard</div>
            </NavLink>
          <NavLink className="sidebar_menu-navlink" to="/kyc_request">
            <div className="sidebar_menu" style={{background:(pathname.includes('kyc_request'))?'rgb(255, 144, 64)':''}}>KYC Request</div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Sidebar;
