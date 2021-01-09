import React from "react";
import "./view.css";
import Pagination from "../pagination/pagination";
import { withRouter, Redirect } from "react-router-dom";

class ViewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: JSON.parse(sessionStorage.getItem("orders")),
      currentPage: 1,
      orderPerPage: 10,
      redirect: false,
    };
  }
  dashboard = () => {
    const { history } = this.props;
    history.push("/");
  };

  increase = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.orders.length / this.state.orderPerPage)
    ) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  decrease = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  first = () => {
    this.setState({ currentPage: 1 });
  };

  last = () => {
    this.setState({
      currentPage: Math.ceil(
        this.state.orders.length / this.state.orderPerPage
      ),
    });
  };

  delete = (e) => {
    let updatedOrder = JSON.parse(sessionStorage.orders);
    const updatedOrderIndex = updatedOrder.findIndex((element) => {
      return element.id === e.target.value;
    });
    updatedOrder.splice(updatedOrderIndex, 1);
    console.log(updatedOrder);
    sessionStorage.setItem("orders", JSON.stringify(updatedOrder));
    this.setState({ orders: JSON.parse(sessionStorage.getItem("orders")) });
  };

  edit = (e) => {
    this.props.setId(e.target.value);
    this.setState({ redirect: true });
    // const { history } = this.props;
    // history.push("/edit");
  };

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.orderPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.orderPerPage;
    const data = this.state.orders.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="view_order_container">
        {this.state.redirect ? <Redirect to="/edit" /> : ""}
        <h1>View Orders</h1>
        <div className="orders">
          <div className="order">
            <p className="head">Name</p>
            <p className="head">Email</p>
            <p className="head">Product</p>
            <p className="head">Quantity</p>
            <p className="head">Edit</p>
            <p className="head">Delete</p>
          </div>
          {data.map((e) => {
            return (
              <div className="order" key={e.id}>
                <p>{e.customer_name}</p>
                <p>{e.customer_email}</p>
                <p>{e.product}</p>
                <p>{e.quantity}</p>
                {/* <p style={{ overflow: "hidden" }}> */}
                <button onClick={this.edit} value={e.id} className="edit">
                  <i className="fas fa-pen"></i>
                </button>
                {/* </p> */}
                {/* <p style={{ overflow: "hidden" }}> */}
                <button onClick={this.delete} value={e.id} className="delete">
                  <i className="fas fa-trash-alt"></i>
                </button>
                {/* </p> */}
              </div>
            );
          })}
          <Pagination
            totalSlots={this.state.orders.length}
            slotsPerPage={this.state.orderPerPage}
            currentPage={this.state.currentPage}
            increase={this.increase}
            decrease={this.decrease}
            first={this.first}
            last={this.last}
          />
          <button className="dashboard" onClick={this.dashboard}>
            Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ViewOrder);
