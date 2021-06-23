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

    const placeOrder = async (order_id, order_name, order_description, order_cost, counter, isDone) => {
        let order = [
            order_id,
            order_name,
            order_description,
            Number(order_cost).toFixed(2),
            counter,
            isDone
        ];
        await pool.query('INSERT INTO orders (order_id, order_name, order_description, order_cost, count, is_done) values ($1, $2, $3, $4, $5, $6)', order);

    }

    const getPlacedOrders = async () => {
        let items = await pool.query(`SELECT * FROM orders`);
        return items.rows;
    }

    const acceptOrder = async id => {
        let getOrder = await pool.query(`SELECT * FROM orders WHERE order_id=${id}`);
        return getOrder.rows;
    }

    const getUserPlacedOrders = async () => {
        let available_orders = []
        let getOrders = await pool.query(`SELECT user_orders.id, stock.name, stock.item_description, user_orders.order_state, user_orders.is_done, user_orders.order_cost, user_orders.count FROM stock INNER JOIN user_orders ON stock.id = user_orders.orders_table WHERE is_done = ${false}`);
        getOrders.rows.forEach(items => {
            if (!items.is_done) {
                available_orders.push(items)
            }
        });
        return available_orders;
    }

    const getAllUserOrders = async () => {
        let getOrders = await pool.query(`SELECT orders.order_name, orders.order_description, user_orders.order_state, user_orders.is_done, orders.order_cost FROM orders INNER JOIN user_orders ON orders.order_id = user_orders.orders_table`);
        return getOrders.rows;
    }

    const addToUserOrders = async (data_query) => {
        const { state, orders } = data_query
        let results = await pool.query(`INSERT INTO user_orders (orders_table, order_state, order_cost, count, is_done) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [orders.order_id, state, orders.order_cost, orders.count, orders.is_done]);
        return results.rows;
    }

    const updateUserOrder = async (id_, state, is_done) => {
        let ready_orders = [];
        let get = await pool.query(`SELECT * FROM user_orders WHERE orders_table = ${id_}`);
        if (get.rows.length !== 0) {
            console.log(get.rows[0].id);
            let current_order = await pool.query(`UPDATE user_orders SET order_state = $1, is_done = $2 WHERE orders_table = ${id_} RETURNING *`, [state, is_done]);
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

    const getPastOrders = async () => {
        let oldOrders = await pool.query(`SELECT * FROM past_orders`);
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

        let check = await pool.query(`SELECT email, phone_number FROM users WHERE email = $1 AND phone_number = $2`, [input_email, input_phone]);
        if (check.rows.length === 0) {
            await pool.query(`INSERT INTO users (name, last_name, email, phone_number, password, admin, verified) VALUES ($1, $2, $3, $4, $5, $6, $7)`, user);
            return true;
        }
        return false;
    }

    const signIn = async (input_password, input_email) => {
        let check = await pool.query(`SELECT email, password FROM users WHERE email = $1 AND password = $2`, [input_email, input_password]);
        if (check.rows.length !== 0) {
            return true;
        }
        return false;
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
        signIn
    }
}