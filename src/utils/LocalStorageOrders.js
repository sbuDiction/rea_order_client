export default function StoredOrders(json) {

    const get = () => {
        if (json === null) {
            return json = { status: 'none' }
        } else {
            return JSON.parse(json)
        }
    }

    const getCounter = () => {
        if (json != null) {
            let counter = JSON.parse(json);
            return counter.length;
        } else { 
            return 0;
        }
    }
    return {
        get,
        getCounter,
        
    }
}