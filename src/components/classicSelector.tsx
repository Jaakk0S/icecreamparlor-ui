import { Button } from '@mui/material';
import { Component, Suspense } from 'react';
import Select, { type MultiValue, type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import type { TypeSelection } from '../types/TypeSelection';
import { fetchTypeSelection, SELECTION_BASE } from '../components/orderBuilder';

type ClassicState = {
  products: TypeSelection[];
  selection: SingleValue<TypeSelection>;
  isValid: boolean;
}

type ClassicProps = {
  productAddedHandler: (name: number) => void
};

export class ClassicSelector extends Component<ClassicProps, ClassicState> {

  constructor(props: ClassicProps) {
    super(props);
    this.state = {
      products: SELECTION_BASE,
      selection: null,
      isValid: false
    }
  }

  componentDidMount(): void {
    fetchTypeSelection('products').then(result => {
      this.setState({
        products: result
      })
    })
  }

  private selectionChanged = (selectedOption: SingleValue<TypeSelection> | MultiValue<TypeSelection>) => {
    this.setState({
      selection: selectedOption as SingleValue<TypeSelection>,
      isValid: selectedOption != this.state.products[0]
    });
  }

  private addToOrderClicked = () => {
    this.props.productAddedHandler(this.state.selection!.value);
    this.setState({
      selection: this.state.products[0],
      isValid: false
    });
  }

  render() {
    const animatedComponents = makeAnimated();
    return (
      <>
        <h3>Choose from our classic ice-creams</h3>
        <Suspense>
          <Select name={"classicSelect"}
            options={this.state.products}
            defaultValue={this.state.products[0]}
            value={this.state.selection}
            components={animatedComponents}
            onChange={this.selectionChanged}
          />
        </Suspense>
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