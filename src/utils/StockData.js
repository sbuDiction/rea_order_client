export default function StockDataManagement() {
    let total = 0;
    let setPrice;
    const getStockData = (data, orderId) => {
        for (let x = 0; x < data.length; x++) {
            if (data[x].id === Number(orderId)) {
                total = Number(data[x].meta);
                setMinusPrice(Number(data[x].meta));
                return data[x];
            }
        }
    }

    const getTotal = () => {
        if (total < getPrice()) {
            return getPrice();
        } else {
            return total
        }
    };

    const getPrice = () => setPrice;

    const increPrice = () => {
        total += getPrice();
        getTotal();
    }

    const decrePrice = () => {
        total -= getPrice();
        // getTotal();
    }

    const setMinusPrice = (price) => {
        setPrice = price
    };

    const displayStockData = (data) => data;


    return {
        getStockData,
        displayStockData,
        getTotal,
        increPrice,
        decrePrice,
    }
}