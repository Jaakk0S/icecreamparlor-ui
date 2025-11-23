import { Button } from '@mui/material';
import Select from 'react-select';

export function CustomProductBuilder() {

  const cones = [
    { value: 1, label: 'Waffle' },
    { value: 2, label: 'Chocolate-dipped' },
    { value: 3, label: 'Sugar' },
    { value: 4, label: 'Bowl' },
    { value: 5, label: 'Pretzel' }
  ];

  const flavors = [
    { value: 1, label: 'Vanilla' },
    { value: 2, label: 'Chocolate' },
    { value: 3, label: 'Strawberry' },
    { value: 4, label: 'Banana' },
    { value: 5, label: 'Fudge' },
    { value: 6, label: 'Coconut' }
  ];

  const toppings = [
    { value: 1, label: 'Chocolate chips' },
    { value: 2, label: 'Chocolate sprinkles' },
    { value: 3, label: 'Whipped cream' },
    { value: 4, label: 'Mini candy cane' },
    { value: 5, label: 'Powdered sugar' },
    { value: 6, label: 'Melted fudge' },
    { value: 7, label: 'Melted chocolate' }
  ];

  return (
    <>
      <div>
        <h3>Design an ice-cream of your choice</h3>
        <h4>Select your cone</h4>
        <Select options={cones} />
      </div>
      <div className="centeredButton">
        <Button variant="outlined" disabled>Add to Order</Button>
      </div>
    </>
  );
}