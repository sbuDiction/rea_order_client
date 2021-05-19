export default function Checkout() {
    let total = 0;

    const addPrices = (order) => {
        if (order === null) {
            total = 0;
        }else{
            order.forEach(items => {
                total += items.order_price;
            });
        }
    }

    const getTotal = () => total.toFixed(2);

    return {
        addPrices,
        getTotal,
    }
}