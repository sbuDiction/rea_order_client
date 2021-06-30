module.exports = () => {
    let total = 1;
    let totalCost = 0;
    let price = 0;
    let qty = 0;

    const increament = () => {
        totalCost += price;
        total += 1;
        qty -= 1;
    }

    const orderCost = () => totalCost;

    const decreament = () => {
        totalCost -= price;
        total -= 1;
        qty += 1;
    }

    const init = (orderPrice, orderQty) => {
        if (orderPrice !== '') {
            totalCost = orderPrice;
            price = orderPrice;
            qty = orderQty - 1;
        }
    }

    const getPriceTotal = () => price;

    const getToal = () => total;

    const resetCounter = () => {
        return total = 1;
    }

    const getQty = () => qty;


    return {
        increament,
        decreament,
        getToal,
        init,
        getPriceTotal,
        orderCost,
        resetCounter,
        getQty
    }
}