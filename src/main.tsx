import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// First look for environment variables. If they're not found, use the test variables in .env

let menuHost: string = import.meta.env.VITE_MENU_API_HOST ? import.meta.env.VITE_MENU_API_HOST : import.meta.env.VITE_MENU_API_TEST_HOST;
let menuPort: string = import.meta.env.VITE_MENU_API_PORT ? import.meta.env.VITE_MENU_API_PORT : import.meta.env.VITE_MENU_API_TEST_PORT;
let orderHost: string = import.meta.env.VITE_ORDER_API_HOST ? import.meta.env.VITE_ORDER_API_HOST : import.meta.env.VITE_ORDER_API_TEST_HOST;
let orderPort: string = import.meta.env.VITE_ORDER_API_PORT ? import.meta.env.VITE_ORDER_API_PORT : import.meta.env.VITE_ORDER_API_TEST_PORT;

export const MENUAPI_ENDPOINT: string = `http://${menuHost}:${menuPort}/v1/menu/`;
export const ORDERAPI_ENDPOINT: string = `http://${orderHost}:${orderPort}/v1/order/`;

const container = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
