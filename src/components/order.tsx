import { Component, type ChangeEventHandler } from "react";
import type { OrderData } from "../types/OrderData";
import { InputAdornment, Paper, TextField } from "@mui/material";
import '../styles/Order.css';

type OrderProps = {
  data?: OrderData
}

type OrderState = {
  name: string
}

export class Order extends Component<OrderProps, OrderState> {

  constructor(props: OrderProps) {
    super(props);
    this.state = {
      name: ""
    }
  }

  nameUnchanged: boolean = true;
  nameError: boolean = true;
  valid = false;

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
            defaultValue="Enter your name"
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
              {this.props.data.products.map((prod: ProductData) => {
                if (prod.name != undefined) {
                  return <li>{prod.name}</li>
                }
                return null;
              })}
            </ol>
          </div>
        </div>
      </Paper>
    )
  }
}
