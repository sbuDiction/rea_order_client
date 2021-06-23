module.exports = () => {
    let total = 0;

    const add = (order) => {
        if (order !== null) {
            order.forEach(item => {
                total += Number(item.price);
            });
        } else {
            total = 0;
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