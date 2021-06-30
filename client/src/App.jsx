import './App.css';
import React from 'react';
import Router from './Router';
import { SocketConnection } from './global/socket-init';
import Auth from './utils/Auth';


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      auth: false,
    }
  }

  async componentDidMount() {
    this.setState({ auth: await Auth.check() });
  }

  render() {
    return (
      <div>
        <SocketConnection />
        <Router />
      </div>

    );
  }
}