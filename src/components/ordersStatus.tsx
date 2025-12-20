import { Component } from "react";
import type { OrderData } from "../types/OrderData";
import { PlacedOrder } from "./placedOrder";
import { ORDERAPI_ENDPOINT } from "../main";

type OrdersStatusState = {
  orders: OrderData[];
}

type OrdersStatusProps = {
  //dataUpdatedOnServerHandler: (name: number) => void
};

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
      await fetch(ORDERAPI_ENDPOINT + "stream", { mode: 'cors' }).then(async res => {
        this.setState({
          orders: JSON.parse(await res.text()) as OrderData[]
        });
      }).catch(err => {
        console.log("Order status poll error: " + err);
      });
    }
    if (--this.readOrderSafety <= 0)
      this.readOrderStatus = false;
  }

  async componentDidMount(): Promise<void> {
    this.orderStatusLoop();
    /*const reader = response.body!.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Streaming complete!');
          break;
        }

        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk);

        this.setState({
          orders: JSON.parse(chunk) as OrderData[]
        });
      }
    } catch (error) {
      console.error('Streaming error:', error);
    } finally {
      reader.releaseLock();
    }*/
  }

  render() {
    let test: OrderData = {
      id: 13,
      status: "delivered",
      customer_name: "Pena",
      products: []
    };
    return (
      <div className="column">
        <h1>Orders Status</h1>
        {this.state.orders.map((o: OrderData) =>
          <PlacedOrder data={o} />
        )}
        <PlacedOrder data={test} />
      </div>
    )
  }

}