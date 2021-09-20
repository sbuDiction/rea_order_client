module.exports = (pool) => {

    const getDbStock = async () => await pool.query(`SELECT * FROM stock`);

    const addDbStock = async (itemName, itemDescription, itemPrice, qty) => {
        let stock = [itemName, itemDescription, itemPrice, qty];
        let availableStock = await getDbStock();
        for (let item of availableStock.rows) {
            if (itemName === item.name) {
                return false;
            }
        }
        await pool.query(`INSERT INTO stock (name, item_description, price, qty) values ($1, $2, $3, $4)`, stock);
        return true;
    }

    const getOrder = async id => {
        let item = await pool.query(`SELECT * FROM stock WHERE id = ${id}`);
        return item.rows[0];
    }

    const placeOrder = async (order_id, order_name, order_description, order_cost, counter, isDone, user_id, time_stamp) => {
        let order = [
            order_id,
            order_name,
            order_description,
            Number(order_cost).toFixed(2),
            counter,
            isDone,
            user_id,
            time_stamp
        ];
        await pool.query('INSERT INTO orders (order_id, order_name, order_description, order_cost, count, is_done, whos_order, TIMESTAMP) values ($1, $2, $3, $4, $5, $6, $7, $8)', order);

    }

    const getPlacedOrders = async () => {
        let items = await pool.query(`SELECT orders.id, orders.order_id, orders.order_name, orders.order_description, orders.order_cost, orders.count, orders.is_done, orders.TIMESTAMP, users.name, users.last_name, orders.whos_order FROM orders INNER JOIN users ON users.id = orders.whos_order`);
        return items.rows;
    }

    const acceptOrder = async id => {
        let getOrder = await pool.query(`SELECT * FROM orders WHERE order_id=${id}`);
        return getOrder.rows;
    }

    const getUserPlacedOrders = async (id) => {
        let getOrders = await pool.query(`SELECT user_orders.my_orders, user_orders.id, stock.name, stock.item_description, user_orders.order_state, user_orders.is_done, user_orders.order_cost, user_orders.count FROM stock INNER JOIN user_orders ON stock.id = user_orders.orders_table WHERE user_orders.my_orders = ${id}`);
        return getOrders.rows;
    }

    const getAllUserOrders = async () => {
        let getOrders = await pool.query(`SELECT orders.order_name, orders.order_description, user_orders.order_state, user_orders.is_done, orders.order_cost FROM orders INNER JOIN user_orders ON orders.order_id = user_orders.orders_table`);
        return getOrders.rows;
    }

    const addToUserOrders = async (data_query) => {
        const { state, orders } = data_query
        let results = await pool.query(`INSERT INTO user_orders (orders_table, order_state, order_cost, count, is_done, my_orders, time_stamp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [orders.order_id, state, orders.order_cost, orders.count, true, orders.whos_order, orders.timestamp]);
        return results.rows;
    }

    const updateUserOrder = async (id_, state, is_done) => {
        let ready_orders = [];
        let get = await pool.query(`SELECT * FROM user_orders WHERE orders_table = ${id_}`);
        if (get.rows.length !== 0) {
            let current_order = await pool.query(`UPDATE user_orders SET order_state = $1, is_done = $2 WHERE orders_table = ${id_} RETURNING *`, [state, false]);
            ready_orders.push(current_order.rows[0]);
        }
        return ready_orders;
    }

    const updateOrders = async (id) => {
        let orders = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
        if (orders.rows.length !== 0) {
            await pool.query(`UPDATE orders SET is_done = ${true} WHERE id = ${id}`,);
        }
    }

    const removeOrder = async (search_id, delete_id) => {
        let order = await pool.query(`SELECT * FROM orders WHERE id = ${search_id}`);
        if (order.rows.length !== 0) {
            let deletedRow = await pool.query(`DELETE FROM orders WHERE is_done = ${true} RETURNING *`);
            const { order_id, order_name, order_description, order_cost, count, is_done } = deletedRow.rows[0];
            let recentOrder = [
                order_id,
                order_name,
                order_description,
                order_cost,
                count,
                is_done,
                'Finished',
                ''
            ]
            await pool.query(`INSERT INTO past_orders (order_id, order_name, order_description, order_cost, count, is_done, order_state, time_stamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, recentOrder);
        }
    }

    const getPastOrders = async (id) => {
        let oldOrders = await pool.query(`SELECT users.id, past_orders.order_name, past_orders.order_description, past_orders.order_cost, past_orders.count, past_orders.is_done, past_orders.order_state, past_orders.time_stamp FROM past_orders users INNER JOIN past_orders ON users.id = past_orders.my_orders WHERE past_orders.my_orders = $1`, [id]);
        return oldOrders.rows;
    }

    const getActiveOrders = async () => {
        let orders = await pool.query(`SELECT * FROM user_orders WHERE is_done = ${false}`);
        return orders.rows[0];
    }

    const getReadyOrder = async (id) => {
        let order = await pool.query(`SELECT user_orders.id, stock.name, stock.item_description, user_orders.order_state, user_orders.is_done, user_orders.order_cost, user_orders.count FROM stock INNER JOIN user_orders ON stock.id = user_orders.orders_table WHERE user_orders.id = ${id}`);
        return order.rows;
    }

    const createAccount = async (input_name, input_surname, input_password, input_email, input_phone) => {
        let user = [
            input_name,
            input_surname,
            input_email,
            input_phone,
            input_password,
            false,
            false
        ]
        let accounts = [];
        let check = await pool.query(`SELECT email, phone_number FROM users WHERE email = $1 AND phone_number = $2`, [input_email, input_phone]);
        if (check.rows.length === 0) {
            let accountId = await pool.query(`INSERT INTO users (name, last_name, email, phone_number, user_password, is_admin, verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, user);
            accounts.push(accountId.rows[0]);
        }
        return accounts;
    }

    const signIn = async (input_email) => {
        let check = await pool.query(`SELECT email, user_password, id FROM users WHERE email = $1`, [input_email]);
        return check.rows[0];
    }


    const getUser = async (id) => {
        let get = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
        return get.rows[0];
    }

    const getAllusers = async () => {
        let get = await pool.query(`SELECT * FROM users`);
        return get.rows;
    }

    const updateStockQty = async (stockId, qty) => {
        let getStock = await pool.query(`SELECT * FROM stock WHERE id = ${stockId}`);
        if (getStock !== 0) {
            await pool.query(`UPDATE stock SET qty = qty - ${qty} WHERE id = ${stockId}`);
        };
    }

    return {
        getDbStock,
        addDbStock,
        getOrder,
        placeOrder,
        getPlacedOrders,
        acceptOrder,
        getUserPlacedOrders,
        addToUserOrders,
        updateUserOrder,
        updateOrders,
        getAllUserOrders,
        removeOrder,
        getPastOrders,
        getActiveOrders,
        getReadyOrder,
        createAccount,
        signIn,
        getUser,
        getAllusers,
        updateStockQty
    }
}