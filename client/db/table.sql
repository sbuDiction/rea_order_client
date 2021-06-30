-- This table is for storing user infomation
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number TEXT,
    home_address TEXT,
    user_password TEXT,
    is_admin BOOLEAN,
    verified BOOLEAN
);

-- This table is for store the stock 
CREATE TABLE stock
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    item_description TEXT,
    price DECIMAL(10,2),
    qty INTEGER
);

-- This table is for admin used to store orders placed by users
CREATE TABLE orders
(
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    order_name TEXT,
    order_description TEXT,
    order_cost DECIMAL(10,2),
    count INTEGER,
    is_done BOOLEAN,
    TIMESTAMP text,
    whos_order INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE logger
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    event TEXT,
    timestamp TEXT
);

-- This table is for users to store current active orders
CREATE TABLE user_orders
(
    id SERIAL PRIMARY KEY,
    orders_table INTEGER REFERENCES stock (id) ON DELETE CASCADE ON UPDATE CASCADE,
    my_orders INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    order_state TEXT,
    order_cost DECIMAL(10,2),
    count INTEGER,
    is_done BOOLEAN,
    time_stamp TEXT
);

-- This table is for users used to store finished orders
CREATE TABLE past_orders
(
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    order_name TEXT,
    order_description TEXT,
    order_cost DECIMAL(10,2),
    count INTEGER,
    is_done BOOLEAN,
    order_state TEXT,
    time_stamp TEXT,
    my_orders INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);