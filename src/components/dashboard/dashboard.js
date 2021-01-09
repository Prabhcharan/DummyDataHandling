import "./dashboard.css";
import { React, Component } from "react";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    const { history } = this.props;
    if (!sessionStorage.isAuth) {
      history.push("/");
    }
  }
  render() {
    const name = sessionStorage.name;
    const email = sessionStorage.email;
    const dp = sessionStorage.dp;
    return (
      <div className="dashboard_container">
        <div className="profile">
          <img src={dp} alt="dp" />
          <div>
            <h1>{name}</h1>
            <p>{email}</p>
          </div>
        </div>
        <div className="button">
          <button
            className="view"
            onClick={() => {
              const { history } = this.props;
              history.push("/view");
            }}
          >
            View
          </button>
          <button
            className="add"
            onClick={() => {
              const { history } = this.props;
              history.push("/add");
            }}
          >
            Add new order
          </button>

          <button onClick={this.props.logout} className="logout">
            Logout
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
