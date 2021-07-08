import React, { PureComponent } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import {Auth} from "aws-amplify";
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

  componentDidMount = async() =>{
    const institution = await Auth.currentAuthenticatedUser();
    this.setState({
      display_name:institution.attributes.name
    }) /// attach with ID not email
  }

  logOut = async () => {
    await Auth.signOut();
    localStorage.removeItem('User_Id');
    this.props.history.push("/login");
  };

  render() {
    const { collapse,display_name} = this.state;

    return (
      <div className="topbar__profile ml-0">
        <button type="button" className="topbar__avatar" onClick={this.toggle} >
        
          <img
            className="topbar__avatar-img"
            src="https://robohash.org/qwerty"
            alt="avatar"
          />
          <div className="topbar__avatar-name" style={{paddingTop:"11px"}}>
            <p >{display_name}</p>
          </div>
          <DownIcon className="topbar__icon" />
        </button>
         <Collapse isOpen={collapse} className="topbar__menu-wr" style={{background:"#F4F8F9",marginTop:"7px"}}>
          <div className="topbar__menu" >
            <TopbarMenuLink
              title="Dashboard"
              icon="list"
              path="/dashboard"
              style={{paddingBottom:"22px"}}
            />
            <div onClick={this.logOut} style={{borderTop:"1px solid #BDBDBD"}}>
              <TopbarMenuLink title="Log Out" icon="exit" path="/login" />
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withRouter(TopbarProfile);
