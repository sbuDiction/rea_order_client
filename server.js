// require('dotenv').config();
const express = require('express');
// const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg');
const Api = require('./client/api/rea_order_api');
const Db_queries = require('./client/services/DbQueries');
const http = require('http');
const socketio = require('socket.io');
const AppSocket = require('./client/services/socket.io');
const app = express();


const { Pool } = pg;
let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || "postgresql://diction:root@localhost:5432/rea_order";
const pool = new Pool({ connectionString, ssl: useSSL });




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// app.use(app.static('build'));
const PORT = process.env.PORT || 5000;

const dbQueries = Db_queries(pool);
const rea_order = Api(dbQueries);

const server = http.createServer(app);
const io = socketio(server);
AppSocket(io, dbQueries);

app.get('/api/rea_order/all', rea_order.get);
app.post('/api/rea_order/get_order', rea_order.getOrder);
app.post('/api/rea_order/order', rea_order.placeOrder);
app.get('/api/rea_order/admin/get_orders', rea_order.getOrdersByAdmin);

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});