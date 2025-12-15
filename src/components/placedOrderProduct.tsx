import '../styles/Order.css';
import { Component } from "react";
import type { ProductData } from "../types/ProductData";
import parse from 'html-react-parser';

type PlacedProductProps = {
  productIndex: number,
  data: ProductData,
  deleteProductHandler?: (index: number) => undefined,
}

type PlacedProductState = {
  hover: boolean
}

export class PlacedProductCard extends Component<PlacedProductProps, PlacedProductState> {

  constructor(props: PlacedProductProps) {
    super(props);
    this.state = {
      hover: false
    }
  }

  toString(): string {
    if (this.props.data.name != undefined) // Is classic
      return "Classic: " + this.props.data.name;

    // Is custom

    let str = "Custom:<ul>" +
      "<li>Flavor: " + this.props.data.flavor!.name + "</li>" +
      "<li>Cone: " + this.props.data.cone!.name + "</li>" +
      "<li>Toppings: ";
    if (this.props.data.toppings!.length == 1 && this.props.data.toppings![0].id == 0)
      str += "-";
    else {
      str += "<ul>";
      this.props.data.toppings!.map(t => {
        str += t.name
      });
      str += "</ul>";
    }
    str += "</li></ul>";
    return str;
  }

  render() {
    return <>
      <div>
        {parse(this.toString())}
      </div>
      <span className={this.state.hover ? 'deleteIndicator' : 'invisible'}>
        &nbsp;&nbsp;&lt;click to delete&gt;
      </span>
    </>
  }
}
