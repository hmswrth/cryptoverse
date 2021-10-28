import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import App from './App';
import 'antd/dist/antd.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
   <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
   </BrowserRouter>
   , document.getElementById('root'));