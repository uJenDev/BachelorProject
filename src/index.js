import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import store from './store';
import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes';

export default function App() {

  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)