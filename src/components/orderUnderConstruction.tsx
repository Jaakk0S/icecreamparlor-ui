import { Component } from "react";
import type { OrderData } from "../types/OrderData";
import { InputAdornment, Paper, TextField } from "@mui/material";
import '../styles/Order.css';
import { Product } from "./product";
import type { ProductData } from "../types/ProductData";

export type OrderProps = {
  data?: OrderData,
  deleteProductHandler: (index: number) => undefined,
  validateNameHandler: (valid: boolean) => void
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
  nameMsg: string = "Name required";
  nameError: boolean = true;

  nameSelected = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.nameUnchanged)
      e.currentTarget.select();
  }

  nameUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n: string = e.currentTarget.value;
    this.setState({ name: n })
    this.nameError = n.length < 3;
    if (n.length < 3)
      this.nameMsg = "Name too short!"
    this.nameUnchanged = false;
    this.validate();
  }

  validate = () => {
    let valid: boolean = !this.nameUnchanged && !this.nameError && this.props.data!.products.length > 0;
    this.props.validateNameHandler(valid);
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
            helperText={this.nameError ? this.nameMsg : ""}
            error={this.nameError}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="start">Customer name: </InputAdornment>,
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
