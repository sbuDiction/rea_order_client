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

    const getOrder = async (id) => {
        let item = await pool.query(`SELECT * FROM stock WHERE id = ${id}`);
        return item.rows[0];
    }

    const placeOrder = async (order_id, order_name, order_description, order_cost, counter) => {
        let order = [order_id,
            order_name,
            order_description,
            Number(order_cost).toFixed(2),
            counter
        ];
        await pool.query('INSERT INTO orders (id, order_name, order_description, order_cost, count) values ($1, $2, $3, $4, $5)', order);

    }

    const getPlacedOrders = async () => {
        let items = await pool.query(`SELECT * FROM orders`);
        return items.rows;
    }

    return {
        getDbStock,
        addDbStock,
        getOrder,
        placeOrder,
        getPlacedOrders,
    }
}