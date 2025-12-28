import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// In dev mode, use test values in .env. Otherwise use the server host and port

let menuHost: string = import.meta.env.DEV ? import.meta.env.VITE_MENU_API_TEST_HOST : location.hostname;
let menuPort: string = import.meta.env.DEV ? import.meta.env.VITE_MENU_API_TEST_PORT : location.port;
let orderHost: string = import.meta.env.DEV ? import.meta.env.VITE_ORDER_API_TEST_HOST : location.hostname;
let orderPort: string = import.meta.env.DEV ? import.meta.env.VITE_ORDER_API_TEST_PORT : location.port;

export const MENUAPI_ENDPOINT: string = `https://${menuHost}:${menuPort}/menu/v1/`;
export const ORDERAPI_ENDPOINT: string = `https://${orderHost}:${orderPort}/order/v1/`;

const container = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
