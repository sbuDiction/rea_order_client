module.exports = (io, dbQueries) => {

    io.on("connection", async socket => {
        console.log('Client connected');
        socket.on('ordered_data', async () => {
            let data = await dbQueries.getPlacedOrders();
            io.sockets.emit('get_data', data);
        });


        socket.on('add order', async order => {
            order.forEach(async item => {
                let { id, name, description, price, count } = item;
                await dbQueries.placeOrder(id, name, description, price, count);
                io.sockets.emit('change_data');
            });

        })

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}