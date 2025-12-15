import { Component, type JSX } from "react";
import type { OrderData } from "../types/OrderData";
import { Paper } from "@mui/material";
import '../styles/Order.css';
import type { ProductData } from "../types/ProductData";
import { PlacedProductCard } from "./placedOrderProduct";

export type PlacedOrderProps = {
  data: OrderData,
}

export type PlacedOrderState = {
  hover: boolean
}

export class PlacedOrder extends Component<PlacedOrderProps, PlacedOrderState> {

  constructor(props: PlacedOrderProps) {
    super(props);
    this.state = {
      hover: false
    }
  }

  onMouseOver() {
    this.setState({
      hover: true
    });
  }

  onMouseOut() {
    this.setState({
      hover: false
    });
  }

  private productList(): JSX.Element {
    if (this.state.hover) {
      return (
        <div>
          Products:
          <ol>
            {this.props.data.products.map((prod: ProductData, index: number) =>
              <li key={index}>
                <PlacedProductCard productIndex={index} data={prod} />
              </li>
            )
            }
          </ol >
        </div>
      )
    }
    return (<div />);
  }

  render() {

    if (this.props.data == undefined)
      return (<div />);

    return (
      <Paper elevation={15}>
        <div className="cardPaper"
          onMouseEnter={this.onMouseOver.bind(this)}
          onMouseLeave={this.onMouseOut.bind(this)}
        >
          <div>Id: {this.props.data.id}</div>
          <div>Customer name: {this.props.data.customer_name}</div>
          <div>Status:  <b>{this.props.data.status}</b></div>

          {this.productList()}
        </div>
      </Paper>
    );
  }
}
