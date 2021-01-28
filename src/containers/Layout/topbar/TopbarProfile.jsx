import React, { PureComponent } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import {Amplify,Auth} from "aws-amplify";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import { withRouter } from "react-router";

class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
      display_name: "",
      profile_pic: "",
    };
  }

  toggle = () => {
    this.setState((prevState) => ({ collapse: !prevState.collapse }));
  };

  logOut = async () => {
    await Auth.signOut();
    this.props.history.push("/login");
  };

  render() {
    const { collapse, profile_pic } = this.state;

    return (
      <div className="topbar__profile ml-0">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
        <div className="topbar__avatar-name" style={{background:"#EB5757",borderRadius: "4px",width: "188px",height:"32px",paddingTop:"6.5px",margin:"17px 12px 0 0"}}>
          <p style={{fontSize:"12px",lineHeight:"140.3%",color:"#FFFFFF"}}>KYC is not completed</p>
        </div>
          <img
            className="topbar__avatar-img"
            src="https://robohash.org/qwert"
            alt="avatar"
          />
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && (
          <button
            type="button"
            className="topbar__back"
            onClick={this.toggle}
          />
        )}
         <Collapse isOpen={collapse} className="topbar__menu-wrap" style={{background:"#F4F8F9"}}>
          <div className="topbar__menu">
            <div onClick={this.logOut}>
              <TopbarMenuLink title="Log Out" icon="exit" path="/login" />
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withRouter(TopbarProfile);
