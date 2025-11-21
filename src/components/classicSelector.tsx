import { Button } from '@mui/material';
import { Component } from 'react';
import Select, { type SingleValue } from 'react-select';
import type { TypeSelection } from '../types/TypeSelection';

type ClassicState = {
  selection: SingleValue<TypeSelection>;
  disabled: boolean;
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
      disabled: true
    }
  }

  selectionChanged = (selectedOption: SingleValue<TypeSelection>) => {
    this.setState({
      selection: selectedOption,
      disabled: selectedOption == this.products[0]
    });
  }

  addToOrderClicked = () => {
    this.props.productAddedHandler("Classic: " + this.state.selection!.label);
    this.setState({
      selection: this.products[0],
      disabled: true
    });
  }

  render() {
    return (
      <>
        <Select name={"classicSelect"}
          options={this.products}
          defaultValue={this.products[0]}
          value={this.state.selection}
          onChange={(option: SingleValue<TypeSelection>) => this.selectionChanged(option)}
        />
        <div className="centeredButton">
          <Button variant="outlined"
            disabled={this.state.disabled}
            onClick={this.addToOrderClicked}>
            Add to Order
          </Button>
        </div>
      </>
    )
  }
}