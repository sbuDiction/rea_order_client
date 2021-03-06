import React from 'react';
import Auth from '../utils/Auth';
import { Card, Button, Modal, Icon, Message } from 'semantic-ui-react';
import axios from 'axios';
const Calculations = require('../functions/Calculations');
const PlaceOrders = require('../functions/PlaceOrders');

const calculations = Calculations();
const placeOrder = PlaceOrders();
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            open: false,
            isDisabled: true,
            res: '',
            orders: [],
            counter: 1,
            orderId: 0,
            orderName: '',
            orderDescription: '',
            orderPrice: '',
            out_of_stock: false,
            visble: false
        };
    }

    handleOrders = async (e, { id }) => {
        try {
            const params = { id: id };
            if (id) {
                this.setState({ open: true });
                await axios.post('/api/rea_order/get_order', params)
                    .then(res => {
                        let data = res.data.data;
                        calculations.init(Number(data.price), res.data.data.qty);
                        this.setState({
                            orders: [data],
                            orderId: data.id,
                            orderName: data.name,
                            orderDescription: data.item_description,
                            orderPrice: calculations.getPriceTotal().toFixed(2),
                        });
                    });
            };
        } catch (error) {

        }
    }

    closeModal = () => {
        const { orderId, orderName, orderDescription, orderPrice, counter } = this.state;
        let orders = {
            id: orderId,
            name: orderName,
            description: orderDescription,
            price: orderPrice,
            count: counter,
            user_id: Auth.getClientId()
        };
        placeOrder.place(orders);
        window.localStorage.setItem('user_order', JSON.stringify(placeOrder.send()));
        this.setState({
            open: false,
            counter: calculations.resetCounter(),
            redirect: true,
        });
    }

    increament = () => {
        calculations.increament()
        let orderTotal = calculations.orderCost();
        let total = calculations.getToal();
        let qty = calculations.getQty();
        this.setState({
            counter: total,
            orderPrice: orderTotal.toFixed(2),
        });
        if (total > 1) {
            this.setState({ isDisabled: false });
        }
        if (qty === 0) {
            this.setState({ out_of_stock: true, visble: true });
        }
    }

    decreament = () => {
        calculations.decreament();
        let orderTotal = calculations.orderCost();
        let total = calculations.getToal();
        let qty = calculations.getQty();
        this.setState({
            counter: total,
            orderPrice: orderTotal.toFixed(2),
        });
        if (total === 1) {
            this.setState({ isDisabled: true });
        };
        if (qty !== 0) {
            this.setState({ out_of_stock: false, visble: false });
        };
    }

    cancelOrder = () => {
        this.setState({
            open: false,
            counter: calculations.resetCounter(),
        });
    }

    async componentDidMount() {
        try {
            await axios.get('/api/rea_order/all')
                .then(response => {
                    let results = response.data;
                    let data = results.data;
                    this.setState({ items: data });
                });
        } catch (error) {

        };
    }

    handleFilter = event => {
        console.log(event);
    }

    renderModal = () => {
        const { orderName, orderDescription, orderPrice, isDisabled, counter, open, out_of_stock, visble } = this.state;
        let message;
        if (visble) {
            message = <Message warning header={`Sorry the ${orderName} out of stock.`} />
        } else if (!visble) {
            message = ''
        }
        return (
            <Modal centered={false} open={open} size='small' dimmer='blurring'>
                <Modal.Header>{orderName}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>{orderDescription}</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon circular floated='left' count={counter} onClick={this.decreament} disabled={isDisabled}>
                        <Icon name='minus' />
                    </Button>
                    <Button basic floated='left'>{counter}</Button>
                    <Button icon circular floated='left' count={counter} price={orderPrice} onClick={this.increament} disabled={out_of_stock}>
                        <Icon name='plus' />
                    </Button>
                    <Button circular onClick={this.closeModal} content={`Add ${counter} to order R${orderPrice}`} secondary />
                </Modal.Actions>
                {message}
                <Button content='Cancel order' negative attached='top' onClick={this.cancelOrder} />
            </Modal>
        );
    }

    render() {
        const { items } = this.state;
        return (
            <div>
                {/* <hr className='hb' /> */}
                <Card.Group itemsPerRow={3} stackable centered doubling>
                    {items.map((item) => (
                        <Card key={item.id} id={item.id} onClick={this.handleOrders} color='teal' >
                            <Card.Content>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Description>
                                    {item.item_description}
                                </Card.Description>
                                <Card.Meta><Icon name='money bill alternate' /> R {item.price}</Card.Meta>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
                {this.renderModal()}
            </div>
        )
    }
}
