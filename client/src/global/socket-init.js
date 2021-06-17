import { Component } from 'react';
import socketIOClient from 'socket.io-client';

let socket;
class Socket_Connection extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:5000",
        }
        socket = socketIOClient(this.state.endpoint);
    }

    render() {
        return null;
    }
}

export { Socket_Connection, socket };