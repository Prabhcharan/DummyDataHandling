import React from "react";
import { withRouter } from "react-router-dom";

class EditOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      qty: 0,
      product: "Product 1",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let updatedOrder = JSON.parse(sessionStorage.orders);
    const updatedOrderIndex = updatedOrder.findIndex((element) => {
      return element.id === this.props.id;
    });

    updatedOrder[updatedOrderIndex].customer_name = this.state.name;
    updatedOrder[updatedOrderIndex].customer_email = this.state.email;
    updatedOrder[updatedOrderIndex].quantity = this.state.qty;
    updatedOrder[updatedOrderIndex].product = this.state.product;

    sessionStorage.setItem("orders", JSON.stringify(updatedOrder));
    const { history } = this.props;
    history.push("/view");
  };

  componentDidMount() {
    console.log(this.props.id);
    let orders = JSON.parse(sessionStorage.orders);
    const updatedOrderIndex = orders.findIndex((element) => {
      return element.id === this.props.id;
    });
    const order = orders[updatedOrderIndex];
    if (order) {
      console.log(order);
      this.setState({
        name: order.customer_name,
        email: order.customer_email,
        qty: order.quantity,
        product: order.product,
      });
    } else {
      const { history } = this.props;
      history.push("/");
    }
  }

  render() {
    return (
      <div className="add_container">
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
          <button type="submit">Edit Order</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditOrder);
