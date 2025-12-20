import { Component, type JSX } from "react";
import type { OrderData } from "../types/OrderData";
import { Paper } from "@mui/material";
import '../styles/Order.css';
import type { ProductData } from "../types/ProductData";
import { PlacedProductCard } from "./placedOrderProduct";
import completedUrl from '../../assets/check.png';
import pendingUrl from '../../assets/rajinikanth.gif';
import deliveryUrl from '../../assets/cat-delivery.gif';

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

    let processing: boolean = this.props.data.status == "in_preparation" || this.props.data.status == "in_delivery";
    let completed: boolean = this.props.data.status == "delivered";
    let deliveryPosition;
    switch (this.props.data.status) {
      case "placed":
        deliveryPosition = 0;
        break;
      case "in_preparation":
        deliveryPosition = 20;
        break;
      case "prepared":
        deliveryPosition = 40;
        break;
      case "in_delivery":
        deliveryPosition = 60;
        break;
      case "delivered":
        deliveryPosition = 80;
        break;
    }

    return (
      <Paper elevation={15}>
        <div className="cardPaper"
          onMouseEnter={this.onMouseOver.bind(this)}
          onMouseLeave={this.onMouseOut.bind(this)}
        >
          <div className="row">
            <div className="orderStatusColumn">
              <div>Id: {this.props.data.id}</div>
              <div>Customer name: {this.props.data.customer_name}</div>
              <div>Status:  <b>{this.props.data.status}</b></div>
            </div>
            <div className="orderStatusColumn">
              <img src={pendingUrl} className={processing ? "pendingImage" : "invisible"} />
              <img src={completedUrl} className={completed ? "completedImage" : "invisible"} />
              <img src={deliveryUrl} style={{ left: deliveryPosition + "%" }} className={completed ? "invisible" : "deliveryImage"} />
            </div>
          </div>

          {this.productList()}
        </div>
      </Paper>
    );
  }
}
