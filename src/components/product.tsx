import '../styles/Order.css';
import { Component } from "react";
import type { ProductData } from "../types/ProductData";

type ProductProps = {
  productIndex: number,
  data: ProductData,
  deleteProductHandler: (index: number) => undefined,
}

type ProductState = {
  hover: boolean
}

export class Product extends Component<ProductProps, ProductState> {

  constructor(props: ProductProps) {
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

  onClick() {
    this.props.deleteProductHandler(this.props.productIndex);
  }

  render() {
    if (this.props.data.name != undefined)
      return <span
        className={this.state.hover ? 'removeHover' : ''}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
        onClick={() => this.props.deleteProductHandler(this.props.productIndex)}
      >{this.props.data.name}
      </span>
  }
}
