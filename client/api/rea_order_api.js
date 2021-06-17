module.exports = (dbQueries) => {

    const getStock = async (req, res) => {
        const data = await dbQueries.getDbStock();
        if (data.rows.length === 0) {
            res.json({
                status: 'no stock available',
                data: data.rows
            })
        } else {
            res.json({
                counter: data.rows.length,
                status: 'success',
                data: data.rows
            })
        }
    }

    const getOrder = async (req, res) => {
        let { id } = req.body
        console.log(id);
        let results = await dbQueries.getOrder(id);
        console.log(results);
        res.json({
            status: 'success',
            data: results
        })
    }

    const placeOrder = (req, res) => {
        let body = req.body;
        body.forEach(async item => {
            let { id, name, description, price, count } = item;
            await dbQueries.placeOrder(id, name, description, price, count);
        });
    }

    const getOrdersByAdmin = async (req, res) => {
        let results = await dbQueries.getPlacedOrders();
        res.json({
            status: 'success',
            data: results,
        });
    }

    return {
        get: getStock,
        getOrder,
        placeOrder,
        getOrdersByAdmin,
    }
}