import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, ClientContextProvider } from 'react-fetching-library';

import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

const client = createClient();

ReactDOM.render(
  <React.StrictMode>
    <ClientContextProvider client={client}>
      <App />
    </ClientContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
