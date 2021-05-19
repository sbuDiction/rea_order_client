export default function PlaceOrder() {
    let orderObject = {
        id: 0,
        header: 'none',
        description: 'none',
        price: 0.00,
        counter: 0,
    }

    let addOrder = {
        order_id: 0,
        order_title: '',
        order_info: '',
        order_price: 0,
        order_count: 0,
    }

    let total = 1;
    let increamentSize = 1;
    let costTotal = 0;


    const add = (orderId, header, description, price, counter) => {
        orderObject = {
            id: orderId,
            header: header,
            description: description,
            price: price,
            counter: counter
        }
        return orderObject;
    }

    const placeOrder = (orderId, orderTitle, orderInfo, orderPrice, orderCount) => {
        addOrder = {
            order_id: orderId,
            order_title: orderTitle,
            order_info: orderInfo,
            order_price: orderPrice,
            order_count: orderCount,
        }
    }

    const increament = () => {
        total += increamentSize;
    };

    const decreament = () => {
        total -= increamentSize;
    }

    const init = () => {
        costTotal = Number(orderObject.price);
    }

    const getTotal = () => {
        if (total < 1) {
            return 1
        } else {
            return total
        }
    };

    const getOrder = () => addOrder;


    const resetCounter = () => total = 1;

    const getCostTotal = () => costTotal;


    return {
        add,
        increament,
        getTotal,
        getCostTotal,
        init,
        resetCounter,
        decreament,
        getOrder,
        placeOrder,
    }
}