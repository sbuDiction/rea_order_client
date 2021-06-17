module.exports = () => {
    let orders = [];

    const placeOrder = (userOrder) => {
        orders.push(userOrder);
    }

    const getOrders = () => {
        return orders;
    }

    return {
        place: placeOrder,
        send: getOrders,
    }
}