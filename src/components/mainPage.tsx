import { Component } from "react";
import 'react-tabs/style/react-tabs.css';
import { OrdersStatus } from "./ordersStatus";
import '../styles/App.css'
import { OrderBuilder } from "./orderBuilder";
import type { ProductData } from "../types/ProductData";
import { Order } from "./orderUnderConstruction";
import type { OrderData } from "../types/OrderData";
import { Button } from "@mui/material";

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

  classicProductAdded = (name: string): void => {

    // Fetch classic product data

    this.addProduct({ name: name });
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

  validateName = (valid: boolean): void => {
    this.setState({
      nameValidated: valid
    }, () => this.validateOrder())
  }

  validateOrder = (): void => {
    this.setState({
      orderValidated: this.state.nrProducts > 0 && this.state.nameValidated
    })
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
              <Order data={this.state.currentOrder} deleteProductHandler={this.deleteProductClicked} validateNameHandler={this.validateName} />
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
