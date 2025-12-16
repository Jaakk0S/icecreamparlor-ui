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

  async componentDidMount(): Promise<void> {
    const response: Response = await fetch(
      ORDERAPI_ENDPOINT + "stream", {
      mode: 'cors'
    }
    );
    const reader = response.body!.getReader();
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
    }
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