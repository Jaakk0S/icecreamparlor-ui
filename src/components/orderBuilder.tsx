import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ClassicSelector } from './classicSelector';
import { CustomProductBuilder } from './customProductBuilder';
import '../styles/App.css'
import type { ProductData } from "../types/ProductData";
import { Button } from "@mui/material";


export type OBProps = {
  currentOrderExists: boolean,
  newOrderStartedHandler: () => void,
  classicProductAddedHandler: (name: string) => void,
  customProductAddedHandler: (data: ProductData) => void
}

export class OrderBuilder extends Component<OBProps> {
  render() {
    return (
      <div className="column">
        <h1>Order Builder</h1>

        {this.props.currentOrderExists ?
          (
            <Tabs>
              <TabList>
                <Tab>Classic</Tab>
                <Tab>Custom</Tab>
              </TabList>
              <TabPanel>
                <ClassicSelector productAddedHandler={this.props.classicProductAddedHandler} />
              </TabPanel>
              <TabPanel>
                <CustomProductBuilder productAddedHandler={this.props.customProductAddedHandler} />
              </TabPanel>
            </Tabs>
          )
          :
          (
            <div className="centeredButton">
              <Button variant="contained"
                onClick={this.props.newOrderStartedHandler}>
                Start a New Order
              </Button>
            </div>
          )}
      </div>
    );
  }
}
