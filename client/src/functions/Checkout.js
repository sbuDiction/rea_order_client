module.exports = () => {
    let total = 0;

    const add = (order) => {
        console.log(order);
        if (order !== null) {
            order.forEach(item => {
                total += Number(item.price);
            });
        }
    }

    const getTotal = () => {
        return total;
    }


    return {
        getTotal,
        add,
    }
}