import { Component } from "react";
import 'react-tabs/style/react-tabs.css';
import { OrdersStatus } from "./ordersStatus";
import '../styles/App.css'
import { OrderBuilder } from "./orderBuilder";
import type { ProductData } from "../types/ProductData";
import { Order } from "./order";
import type { OrderData } from "../types/OrderData";
import { Button } from "@mui/material";

type MainPageState = {
  currentOrder?: OrderData,
  orderValidated: boolean
}

export class MainPage extends Component<null, MainPageState> {

  constructor(props: null) {
    super(props);
    this.state = {
      currentOrder: undefined,
      orderValidated: false
    }
  }

  newOrderStarted = (): void => {
    this.setState({ currentOrder: { products: [] } })
  }

  classicProductAdded = (name: string): void => {

    // Fetch classic product data

    this.setState((prevState: MainPageState) => ({
      currentOrder: {
        ...prevState.currentOrder,
        products: prevState.currentOrder!.products.concat({ name: name })
      }
    }))
  }



  customProductAdded = (data: ProductData): void => {

  }

  orderValidated = (status: boolean): void => {
    this.setState({ orderValidated: status });
  }

  placeOrderClicked = (): void => {

  }


  render() {
    return (
      <main>
        <div>
          <header>
            <div className="">
              Ice-Cream Parlor Demo App
            </div>
            <div className="subnote">
              Jaakko Saaristo 2025
            </div>
          </header>
          <div className="row">
            <OrderBuilder
              currentOrderExists={this.state.currentOrder != undefined}
              newOrderStartedHandler={this.newOrderStarted}
              classicProductAddedHandler={this.classicProductAdded}
              customProductAddedHandler={this.customProductAdded}
            />
            <div className="column">
              <h1 className={this.state.currentOrder == undefined ? "greyedHeading" : ""}>Current Order</h1>
              <Order data={this.state.currentOrder} />
              <div className="centeredButton">
                <Button variant="contained"
                  disabled={!this.state.orderValidated}
                  onClick={this.placeOrderClicked}>
                  Place Order
                </Button>
              </div>
            </div>
            <OrdersStatus />
          </div>
          <div className="footer">
            Some footer stuff here
          </div>
        </div>
      </main >
    );
  }
}
