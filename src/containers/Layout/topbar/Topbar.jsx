import React, { PureComponent } from "react";
import { Link,NavLink } from "react-router-dom";
import TopbarProfile from "./TopbarProfile";

class Topbar extends PureComponent {

  render() {
    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <div className="topbar__logo" >
             <Link to="/home" style={{textDecoration:"none",color:"#2F80ED"}}>es-KYC</Link>
            </div>
          </div>
          <div className="topbar__right">
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
