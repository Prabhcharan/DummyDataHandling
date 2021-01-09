import React from "react";
import "./add.css";
import uuid from "react-uuid";
import { withRouter } from "react-router-dom";

class AddOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      qty: null,
      product: "Product 1",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: uuid(),
      customer_name: this.state.name,
      customer_email: this.state.email,
      product: this.state.product,
      quantity: this.state.qty,
    };
    const updatedOrders = [
      ...JSON.parse(sessionStorage.getItem("orders")),
      newOrder,
    ];
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <div className="add_container">
        <h1>Add Order</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Your name"
            required
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Your email"
            required
          />
          <input
            type="number"
            name="qty"
            value={this.state.qty}
            onChange={this.onChange}
            placeholder="Quantity"
            required
          />
          <select
            className="product"
            value={this.state.product}
            onChange={this.onChange}
            name="product"
          >
            <option>Product 1</option>
            <option>Product 2</option>
            <option>Product 3</option>
          </select>
          <button type="submit">Add Order</button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddOrder);
