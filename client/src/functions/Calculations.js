module.exports = () => {
    let total = 1;
    let totalCost = 0;
    let price = 0;

    const increament = () => {
        totalCost += price;
        total += 1;
    }

    const orderCost = () => totalCost;

    const decreament = () => {
        totalCost -= price;
        total -= 1;
    }

    const init = (orderPrice) => {
        if (orderPrice !== '') {
            totalCost = orderPrice;
            price = orderPrice;
        }
    }

    const getPriceTotal = () => price;

    const getToal = () => total;

    const resetCounter = () => {
        return total = 1;
    }


    return {
        increament,
        decreament,
        getToal,
        init,
        getPriceTotal,
        orderCost,
        resetCounter,
    }
}