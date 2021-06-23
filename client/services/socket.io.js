module.exports = (io, dbQueries) => {

    io.on("connection", async socket => {
        socket.on('ordered_data', async () => {
            const date = new Date();
            let time = date.getHours() + 2 + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log(date);
            let data = await dbQueries.getPlacedOrders();
            io.sockets.emit('get_data', data);
        });

        // listening for new orders placed
        socket.on('add order', async order => {
            order.forEach(async item => {
                let { id, name, description, price, count } = item;
                const isDone = false;
                await dbQueries.placeOrder(id, name, description, price, count, isDone);
                io.sockets.emit('change_data');
            });

        });

        // sending info about the order that it has been accepted and busy preparing.
        socket.on('accepted', async query => {
            await dbQueries.addToUserOrders(query);
            let order = await dbQueries.getUserPlacedOrders();
            let data = {
                order: order,
            }
            io.sockets.emit('data', data);
        });

        // emit that the order is ready for pick up
        socket.on('ready for collection', async (msg, id, isDone) => {
            let results = await dbQueries.updateUserOrder(id, msg, isDone);
            const order_id = results[0].id;
            let order = await dbQueries.getReadyOrder(order_id);
            let data = {
                order: order,
            }
            io.sockets.emit('data', data);
        });

        // emiting all the user orders
        socket.on('get orders', async () => {
            let orders = await dbQueries.getPastOrders();
            let order = await dbQueries.getUserPlacedOrders();
            let data = {
                order: order,
            }
            io.sockets.emit('data', data);
            io.sockets.emit('past orders', orders);
        });

        // saving the order after it has been finished
        socket.on('save order', async (order) => {
            await dbQueries.updateOrders(order.id);
            // setTimeout(() => {
            await dbQueries.removeOrder(order.id);
            io.sockets.emit('change_data');
            // }, 3000)
        })

        socket.on("disconnect", () => {
        });
    });
}