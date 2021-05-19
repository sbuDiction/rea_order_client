// import logo from './logo.svg';
import './App.css';
import React from 'react';
import OrderModal from './components/OrderModal';
import Menu from './components/Menu';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className='menu' >
          <Menu />
        </div>
        <OrderModal />
      </div>
    );
  }
}