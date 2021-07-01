import { Component } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient();
class SocketConnection extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:5000",
        }
        // socket = socketIOClient(this.state.endpoint);
    }

    render() {
        return null;
    }
}

export { SocketConnection, socket };