import { Button } from '@mui/material';
import { Component } from 'react';
import Select, { type MultiValue, type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import type { TypeSelection } from '../types/TypeSelection';

type ClassicState = {
  selection: SingleValue<TypeSelection>;
  isValid: boolean;
}

type ClassicProps = {
  productAddedHandler: (name: string) => void
};

export class ClassicSelector extends Component<ClassicProps, ClassicState> {

  products: TypeSelection[] = [
    { value: 0, label: 'Make your selection', isDisabled: true },
    { value: 1, label: 'Fudge Sundae' },
    { value: 2, label: 'Chocolate Dream' },
    { value: 3, label: 'Banana Republic' },
    { value: 4, label: 'Strawberry Cloud' }
  ];

  constructor(props: ClassicProps) {
    super(props);
    this.state = {
      selection: this.products[0],
      isValid: false
    }
  }

  selectionChanged = (selectedOption: SingleValue<TypeSelection> | MultiValue<TypeSelection>) => {
    this.setState({
      selection: selectedOption as SingleValue<TypeSelection>,
      isValid: selectedOption != this.products[0]
    });
  }

  addToOrderClicked = () => {
    this.props.productAddedHandler(this.state.selection!.label);
    this.setState({
      selection: this.products[0],
      isValid: false
    });
  }

  render() {
    const animatedComponents = makeAnimated();
    return (
      <>
        <h3>Choose from our classic ice-creams</h3>
        <Select name={"classicSelect"}
          options={this.products}
          defaultValue={this.products[0]}
          value={this.state.selection}
          components={animatedComponents}
          onChange={this.selectionChanged}
        />
        <div className="centeredButton">
          <Button variant="outlined"
            disabled={!this.state.isValid}
            onClick={this.addToOrderClicked}>
            Add to Order
          </Button>
        </div>
      </>
    )
  }
}