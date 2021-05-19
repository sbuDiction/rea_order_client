export default function Orders(orders) {
    let orderStorage = orders || {};
    let ordersList = []

    const addOrderToList = (order) => {
        ordersList.push(order)
    }

    const getOrders = () => {
        return ordersList
    };

    const getSize = () => ordersList.length;

    const get = () => {
        return orderStorage;
    }

    return {
        addOrderToList,
        getOrders,
        getSize,
        get,
    }
}