import React, { PureComponent } from "react";
import '../../../css/sidebar.css'
import warning_img from '../../../images/warning.png';

class Sidebar extends PureComponent {

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="warning-img">
            <img src={warning_img} />
          </div>
          <div className="sidebar-desc">
              <p className="sidebar-desc-head">Hello, KYC is not done yet! </p>
              <p className="sidebar-desc-subhead">Please fill the form and attach the require document to complete KYC.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
