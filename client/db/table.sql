CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT,
    password TEXT,
    admin BOOLEAN
);

CREATE TABLE stock
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    item_description TEXT,
    price DECIMAL(10,2),
    qty INTEGER
);


CREATE TABLE orders
(
    id INTEGER,
    order_name TEXT,
    order_description TEXT,
    order_cost DECIMAL(10,2),
    count INTEGER
);

CREATE TABLE logger
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    event TEXT,
    timestamp TEXT
);