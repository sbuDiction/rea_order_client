const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg');
const Api = require('./client/api/rea_order_api');
const Db_queries = require('./client/services/DbQueries');
const http = require('http');
const socketio = require('socket.io');
const AppSocket = require('./client/services/socket.io');
// const crypto = require('crypto').randomBytes(64).toString('hex');
const TokenMananger = require('./client/services/tokenMananger');
const TokenMiddleWare = require('./client/services/checkToken');
const app = express();


const { Pool } = pg;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || "postgresql://diction:root@localhost:5432/rea_order";
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('client/build'));
const PORT = process.env.PORT || 5000;
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const dbQueries = Db_queries(pool);
const tokenHandler = TokenMananger();
const rea_order = Api(dbQueries, tokenHandler);

const server = http.createServer(app);
const io = socketio(server);
AppSocket(io, dbQueries);

app.get('/api/rea_order/all', rea_order.get);
app.post('/api/rea_order/get_order', rea_order.order);
app.post('/api/rea_order/create_account', rea_order.create);
app.post('/api/rea_order/login', rea_order.login);
app.post('/api/rea_order/verify', rea_order.verify);
app.get('/api/rea_order/user', TokenMiddleWare, rea_order.fetchUser);
app.get('/api/rea_order/users/data', rea_order.fetchAllUsers);
app.get('/api/rea_order/get/past_orders', TokenMiddleWare, rea_order.getPastOrders);
app.get('/api/rea_order/get/active_order', TokenMiddleWare, rea_order.getActiveOrders);
app.post('/api/rea_order/add/stock', rea_order.addStock);


// console.log(crypto);
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});