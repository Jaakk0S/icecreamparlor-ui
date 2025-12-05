import { Button } from '@mui/material';
import { Component } from 'react';
import Select, { type ActionMeta, type MultiValue, type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import type { TypeSelection } from '../types/TypeSelection';
import type { ProductData } from '../types/ProductData';

type CustomState = {
  flavorSelection: SingleValue<TypeSelection>;
  coneSelection: SingleValue<TypeSelection>;
  toppingsSelection: MultiValue<TypeSelection>;
  isValid: boolean;
}

type CustomProps = {
  productAddedHandler: (data: ProductData) => void
};

export class CustomProductBuilder extends Component<CustomProps, CustomState> {

  cones = [
    { value: 0, label: 'Select your cone', isDisabled: true },
    { value: 1, label: 'Waffle' },
    { value: 2, label: 'Chocolate-dipped' },
    { value: 3, label: 'Sugar' },
    { value: 4, label: 'Bowl' },
    { value: 5, label: 'Pretzel' }
  ];

  flavors = [
    { value: 0, label: 'Select your flavor', isDisabled: true },
    { value: 1, label: 'Vanilla' },
    { value: 2, label: 'Chocolate' },
    { value: 3, label: 'Strawberry' },
    { value: 4, label: 'Banana' },
    { value: 5, label: 'Fudge' },
    { value: 6, label: 'Coconut' }
  ];

  toppings = [
    { value: 0, label: 'Select some toppings', isDisabled: true },
    { value: 1, label: 'Chocolate chips' },
    { value: 2, label: 'Chocolate sprinkles' },
    { value: 3, label: 'Whipped cream' },
    { value: 4, label: 'Mini candy cane' },
    { value: 5, label: 'Powdered sugar' },
    { value: 6, label: 'Melted fudge' },
    { value: 7, label: 'Melted chocolate' }
  ];

  constructor(props: CustomProps) {
    super(props);
    this.state = {
      flavorSelection: this.flavors[0],
      coneSelection: this.cones[0],
      toppingsSelection: [this.toppings[0]],
      isValid: false
    }
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
      flavorSelection: this.flavors[0],
      coneSelection: this.cones[0],
      toppingsSelection: [this.toppings[0]]
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
    let valid: boolean = this.state.flavorSelection != this.flavors[0] && this.state.coneSelection != this.cones[0];
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
              options={this.flavors}
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
              options={this.cones}
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
              options={this.toppings}
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