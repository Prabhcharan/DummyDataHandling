import "./App.css";
import { React, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Data from "../src/data.json";
import ViewOrder from "./components/view/view";
import AddOrder from "./components/add/add";
import EditOrder from "./components/edit/edit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: sessionStorage.isAuth,
      err: false,
      orders: Data,
      reload: true,
      id: "",
    };
  }

  componentDidMount() {
    sessionStorage.setItem("orders", JSON.stringify(this.state.orders));
    if (sessionStorage.isAuth) {
      sessionStorage.setItem("isAuth", false);
    }
  }

  authSuccess = (response) => {
    sessionStorage.setItem("isAuth", true);
    sessionStorage.setItem("name", response.profileObj.name);
    sessionStorage.setItem("email", response.profileObj.email);
    sessionStorage.setItem("dp", response.profileObj.imageUrl);
    this.setState({ reload: false, isAuth: sessionStorage.isAuth });
  };

  authFail = () => {
    this.setState({ isAuth: false, err: true });
  };
  logout = () => {
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("dp");
    this.setState({ isAuth: sessionStorage.isAuth });
  };

  setId = (id) => {
    this.setState({ id });
  };

  render() {
    if (this.state.isAuth) {
      return (
        <Router>
          <Switch>
            <Route path="/" exact>
              <Dashboard logout={this.logout} />
            </Route>
            <Route path="/view" exact>
              <ViewOrder setId={this.setId} />
            </Route>
            <Route path="/add" exact>
              <AddOrder />
            </Route>
            <Route path="/edit" exact>
              <EditOrder id={this.state.id} />
            </Route>
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route path="/">
              <Login
                authSuccess={this.authSuccess}
                err={this.state.err}
                authFail={this.authFail}
                isAuth={this.state.isAuth}
              />
            </Route>
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
