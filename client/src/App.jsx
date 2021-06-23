import './App.css';
import React from 'react';
import Router from './Router';
import { SocketConnection } from './global/socket-init';


export default class App extends React.Component {

  render() {
    return (
      <div>
        <SocketConnection />
        <div className="container">
          <Router />
        </div>
      </div>

    );
  }
}