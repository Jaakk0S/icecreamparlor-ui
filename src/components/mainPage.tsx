import { Component } from "react";
import 'react-tabs/style/react-tabs.css';
import { OrdersStatus } from "./ordersStatus";
import '../styles/App.css'
import { OrderBuilder } from "./orderBuilder";
import type { ProductData } from "../types/ProductData";
import { OrderUnderConstruction } from "./orderUnderConstruction";
import type { OrderData } from "../types/OrderData";
import { Button, Link } from "@mui/material";
import { MENUAPI_ENDPOINT, ORDERAPI_ENDPOINT } from "../main";

type MainPageProps = {}

type MainPageState = {
  currentOrder?: OrderData,
  nrProducts: number,
  nameValidated: boolean,
  orderValidated: boolean
}

export class MainPage extends Component<MainPageProps, MainPageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentOrder: undefined,
      nrProducts: 0,
      nameValidated: false,
      orderValidated: false
    }
  }


  newOrderStarted = (): void => {
    this.setState({ currentOrder: { products: [] } })
  }

  classicProductAdded = (classicId: number): void => {
    let url: string = MENUAPI_ENDPOINT + "product/" + classicId;
    console.log('GET ' + url);
    (async () => {
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      const response = await rawResponse.json();
      this.addProduct(response);
    })();
  }

  customProductAdded = (data: ProductData): void => {
    this.addProduct(data);
  }

  addProduct = (data: ProductData): void => {
    this.setState((prevState: MainPageState) => ({
      currentOrder: {
        ...prevState.currentOrder,
        products: prevState.currentOrder!.products.concat(data)
      },
      nrProducts: this.state.nrProducts + 1
    }), () => this.validateOrder())
  }


  deleteProductClicked = (index: number): undefined => {
    this.setState((prevState: MainPageState) => ({
      currentOrder: {
        ...prevState.currentOrder,
        products: prevState.currentOrder!.products.filter((_, i) => i !== index)
      },
      nrProducts: this.state.nrProducts - 1
    }), () => this.validateOrder())
  }

  nameUpdated = (name: string, valid: boolean): void => {
    let newOrder = Object.assign({}, this.state.currentOrder);
    newOrder.customer_name = name;
    this.setState({
      currentOrder: newOrder,
      nameValidated: valid
    }, () => this.validateOrder())
  }

  validateOrder = (): void => {
    this.setState({
      orderValidated: this.state.nrProducts > 0 && this.state.nameValidated && this.state.currentOrder!.products.length > 0
    })
  }

  placeOrderClicked = (): void => {
    let url: string = ORDERAPI_ENDPOINT + "place";
    console.log('POST ' + url);
    (async () => {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.currentOrder),
        mode: 'cors'
      });
      const response = await rawResponse.json();
      console.log("Order placed. Response: " + JSON.stringify(response));
    })();
  }


  render() {
    return (
      <main>
        <div>
          <header>
            <div className="">
              Ice-Cream Parlor
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
              <OrderUnderConstruction data={this.state.currentOrder} deleteProductHandler={this.deleteProductClicked} nameUpdatedHandler={this.nameUpdated} />
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
            This is a free demo app.<br />
            To browse and test the internal OpenAPI specification, <a href={location.hostname + ":" + location.port + "/swagger/"}>click here</a>.
          </div>
        </div>
      </main >
    );
  }
}
