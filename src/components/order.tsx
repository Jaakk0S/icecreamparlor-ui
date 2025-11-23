import { Component } from "react";
import type { OrderData } from "../types/OrderData";
import { InputAdornment, Paper, TextField } from "@mui/material";
import '../styles/Order.css';
import { Product } from "./product";
import type { ProductData } from "../types/ProductData";

export type OrderProps = {
  data?: OrderData,
  deleteProductHandler: (index: number) => undefined
}

export type OrderState = {
  name: string
}

export class Order extends Component<OrderProps, OrderState> {

  constructor(props: OrderProps) {
    super(props);
    this.state = {
      name: "Enter your name"
    }
  }

  nameUnchanged: boolean = true;
  nameError: boolean = true;
  valid = false;

  nameSelected = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.nameUnchanged)
      e.currentTarget.select();
  }

  nameUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n: string = e.currentTarget.value;
    this.setState({ name: n })
    this.nameError = n.length < 3;
    this.nameUnchanged = false;
    this.validate();
  }



  validate = () => {
    this.valid = !this.nameUnchanged && !this.nameError && this.props.data!.products.length > 0;
  }

  render() {

    if (this.props.data == undefined)
      return (<div />);

    return (
      <Paper elevation={15}>
        <div className="cardPaper">
          <TextField required id="outlined-required"
            fullWidth
            variant="standard"
            label="Required"
            value={this.state.name}
            onChange={this.nameUpdated}
            onFocus={this.nameSelected}
            helperText={this.nameError ? "Too short!" : ""}
            error={this.nameError}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Customer name: </InputAdornment>,
              },
            }}
          />
          <div>
            Products:
            <ol>
              {this.props.data.products.map((prod: ProductData, index: number) =>
                <li key={index}>
                  <Product productIndex={index} data={prod} deleteProductHandler={this.props.deleteProductHandler} />
                </li>
              )}
            </ol>
          </div>
        </div>
      </Paper>
    )
  }
}
