import { Button } from '@mui/material';
import { Component } from 'react';
import Select, { type ActionMeta, type MultiValue, type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import type { TypeSelection } from '../types/TypeSelection';
import type { ProductData } from '../types/ProductData';
import { fetchTypeSelection, SELECTION_BASE } from './orderBuilder';

type CustomState = {
  flavors: TypeSelection[];
  cones: TypeSelection[];
  toppings: TypeSelection[];
  flavorSelection: SingleValue<TypeSelection>;
  coneSelection: SingleValue<TypeSelection>;
  toppingsSelection: MultiValue<TypeSelection>;
  isValid: boolean;
}

type CustomProps = {
  productAddedHandler: (data: ProductData) => void
};

export class CustomProductBuilder extends Component<CustomProps, CustomState> {

  constructor(props: CustomProps) {
    super(props);
    this.state = {
      flavors: SELECTION_BASE,
      cones: SELECTION_BASE,
      toppings: SELECTION_BASE,
      flavorSelection: null,
      coneSelection: null,
      toppingsSelection: [],
      isValid: false
    }
  }

  componentDidMount(): void {
    fetchTypeSelection('flavor').then(result => {
      this.setState({
        flavors: result
      })
    })
    fetchTypeSelection('cone').then(result => {
      this.setState({
        cones: result
      })
    })
    fetchTypeSelection('topping').then(result => {
      this.setState({
        toppings: result
      })
    })
  }


  animatedComponents = makeAnimated();

  addToOrderClicked = () => {
    let data: ProductData = {
      flavor: {
        id: this.state.flavorSelection!.value,
        name: this.state.flavorSelection!.label
      },
      cone: {
        id: this.state.coneSelection!.value,
        name: this.state.coneSelection!.label
      },
      toppings: this.state.toppingsSelection.map(sel => {
        return {
          id: sel.value,
          name: sel.label
        }
      })
    };
    this.props.productAddedHandler(data);
    this.setState({
      flavorSelection: this.state.flavors[0],
      coneSelection: this.state.cones[0],
      toppingsSelection: [this.state.toppings[0]]
    });
  }

  flavorChanged = (newValue: SingleValue<TypeSelection> | MultiValue<TypeSelection>, _actionMeta: ActionMeta<TypeSelection>): void => {
    this.setState({ flavorSelection: newValue as SingleValue<TypeSelection> }, () => this.validate());
  }

  coneChanged = (newValue: SingleValue<TypeSelection> | MultiValue<TypeSelection>, _actionMeta: ActionMeta<TypeSelection>): void => {
    this.setState({ coneSelection: newValue as SingleValue<TypeSelection> }, () => this.validate());
  }

  toppingChanged = (newValue: SingleValue<TypeSelection> | MultiValue<TypeSelection>, _actionMeta: ActionMeta<TypeSelection>): void => {
    this.setState({ toppingsSelection: newValue as MultiValue<TypeSelection> });
  }

  validate = (): void => {
    let valid: boolean = this.state.flavorSelection != this.state.flavors[0] && this.state.coneSelection != this.state.cones[0];
    this.setState({ isValid: valid });
  }


  render() {
    return (
      <div>
        <h3>Design an ice-cream of your choice</h3>
        <div className="row">
          <div className="obColumn">
            Select your flavor
          </div>
          <div className="obColumn">
            <Select
              options={this.state.flavors}
              onChange={this.flavorChanged}
              components={this.animatedComponents} />
          </div>
        </div>
        <div className="row">
          <div className="obColumn">
            Select your cone
          </div>
          <div className="obColumn">
            <Select
              options={this.state.cones}
              components={this.animatedComponents}
              onChange={this.coneChanged}
            />
          </div>
        </div>
        <div className="row">
          <div className="obColumn">
            Select your toppings
          </div>
          <div className="obColumn">
            <Select
              options={this.state.toppings}
              components={this.animatedComponents}
              onChange={this.toppingChanged}
              isMulti />
          </div>
        </div>
        <div className="centeredButton row:after">
          <Button
            variant="outlined"
            disabled={!this.state.isValid}
            onClick={this.addToOrderClicked}
          >
            Add to Order
          </Button>
        </div>
      </div>
    );
  }
}