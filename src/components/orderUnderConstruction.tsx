import { Component } from "react";
import type { OrderData } from "../types/OrderData";
import { InputAdornment, Paper, TextField } from "@mui/material";
import '../styles/Order.css';
import { ProductUnderConstructionCard } from "./productUnderConstructionCard";
import type { ProductData } from "../types/ProductData";

export type OrderUnderConstructionProps = {
  data?: OrderData,
  deleteProductHandler: (index: number) => undefined,
  nameUpdatedHandler: (name: string, valid: boolean) => void
}

export type OrderUnderConstructionState = {
  name: string,
  nameMsg: string,
  nameError: boolean
}

export class OrderUnderConstruction extends Component<OrderUnderConstructionProps, OrderUnderConstructionState> {

  constructor(props: OrderUnderConstructionProps) {
    super(props);
    this.state = {
      name: "Enter your name",
      nameMsg: "Name required",
      nameError: true
    }
  }

  nameUnchanged: boolean = true;

  nameSelected = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.nameUnchanged)
      e.currentTarget.select();
  }

  nameUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n: string = e.currentTarget.value;
    let err: boolean = n.length < 3;
    this.nameUnchanged = false;
    this.setState({
      name: n,
      nameError: err,
      nameMsg: n.length < 3 ? "Name too short!" : ""
    }, () => {
      let valid: boolean = !this.nameUnchanged && !this.state.nameError;
      this.props.nameUpdatedHandler(n, valid);
    })
  }

  render() {

    if (this.props.data == undefined)
      return (<div />);

    return (
      <Paper elevation={15}>
        <div className="cardPaper">
          <TextField required
            fullWidth
            variant="standard"
            label="Required"
            value={this.state.name}
            onChange={this.nameUpdated}
            onFocus={this.nameSelected}
            helperText={this.state.nameError ? this.state.nameMsg : ""}
            error={this.state.nameError}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="start">Customer name</InputAdornment>,
              },
            }}
          />
          <div>
            Products:
            <ol>
              {this.props.data.products.map((prod: ProductData, index: number) =>
                <li key={index}>
                  <ProductUnderConstructionCard productIndex={index} data={prod} deleteProductHandler={this.props.deleteProductHandler} />
                </li>
              )}
            </ol>
          </div>
        </div>
      </Paper>
    )
  }
}
