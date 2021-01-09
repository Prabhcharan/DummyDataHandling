import "./login.css";
import { React, Component } from "react";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
import logo from "./logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="login_container">
        <div className="left">
          <h1>
            Util<span>ize</span>.
          </h1>
          <div className="login">
            <GoogleLogin
              clientId="63528935513-jqp55d11tpe6da9b8p2p23tsnmhfh9gk.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.props.authSuccess}
              onFailure={this.props.authFail}
            />
            {this.props.err ? "User not signed up" : ""}
          </div>
        </div>
        <div className="right">
          <img src={logo} alt="logo" />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
