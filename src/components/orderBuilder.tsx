import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ClassicSelector } from './classicSelector';
import { CustomProductBuilder } from './customProductBuilder';
import '../styles/App.css'
import type { AbstractProductData, ProductData } from "../types/ProductData";
import { Button } from "@mui/material";
import type { TypeSelection } from '../types/TypeSelection';
import { MENUAPI_ENDPOINT } from "../main";


export type OBProps = {
  currentOrderExists: boolean,
  newOrderStartedHandler: () => void,
  classicProductAddedHandler: (classicId: number) => void,
  customProductAddedHandler: (data: ProductData) => void
}

export const SELECTION_BASE: TypeSelection[] = [{ value: 0, label: 'Make your selection', isDisabled: true }];

export async function fetchTypeSelection(endpoint: string): Promise<TypeSelection[]> {
  let url: string = MENUAPI_ENDPOINT + endpoint;
  console.log('GET ' + url);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }).then(async (resp) => {
    const data: AbstractProductData[] = await resp.json() as AbstractProductData[];
    let newItems: TypeSelection[] = SELECTION_BASE.concat(data.map(p => {
      return { value: p.id, label: p.name } as TypeSelection;
    }));
    newItems.sort((a: TypeSelection, b: TypeSelection) => {
      return a.value < b.value ? -1 : 1;
    });
    return newItems;
  }).catch(err => {
    console.error("Error fetching data: " + err);
    return [];
  });
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
