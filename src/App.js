import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
