import './App.css';
import React from 'react';
import Router from './Router';
import { Socket_Connection } from './global/socket-init';


export default class App extends React.Component {

  render() {
    return (
      <div>
        <Socket_Connection />
        <div className="container">
          <Router />
        </div>
      </div>

    );
  }
}