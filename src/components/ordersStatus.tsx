import { Component } from "react";
import type { OrderData } from "../types/OrderData";
import { PlacedOrder } from "./placedOrder";
import { ORDERAPI_ENDPOINT } from "../main";

type OrdersStatusState = {
  orders: OrderData[];
}

type OrdersStatusProps = {};

export class OrdersStatus extends Component<OrdersStatusProps, OrdersStatusState> {

  constructor(props: OrdersStatusProps) {
    super(props);
    this.state = {
      orders: []
    }
  }

  private readOrderStatus: boolean = true;
  private readOrderSafety = 500;

  private orderStatusLoop = async () => {
    while (this.readOrderStatus) {
      await fetch(ORDERAPI_ENDPOINT + "stream", { mode: 'cors', signal: AbortSignal.timeout(1000000) }).then(async res => {
        this.setState({
          orders: JSON.parse(await res.text()) as OrderData[]
        });
      }).catch((err: unknown) => {
        console.log("Order status poll error: " + err);
        if (err instanceof TypeError && err.message.indexOf("CORS") != -1) {
          this.readOrderStatus = false; // CORS error? -> Stop polling
        }
      });
    }
    if (--this.readOrderSafety <= 0)
      this.readOrderStatus = false;
  }

  async componentDidMount(): Promise<void> {
    this.orderStatusLoop();
  }

  render() {
    return (
      <div className="column">
        <h1>Orders Status</h1>
        {this.state.orders.map((o: OrderData) =>
          <PlacedOrder data={o} />
        )}
      </div>
    )
  }

}