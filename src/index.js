import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/configureStore';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
