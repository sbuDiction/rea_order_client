import React from 'react';
import { Card, Button, Modal, Icon } from 'semantic-ui-react';
import axios from 'axios';
const Calculations = require('../functions/Calculations');
const PlaceOrders = require('../functions/PlaceOrders');

const calculations = Calculations();
const placeOrder = PlaceOrders();
export default class CardExampleGroupCentered extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            open: false,
            isDisabled: false,
            res: '',
            orders: [],
            counter: 1,
            orderId: 0,
            orderName: '',
            orderDescription: '',
            orderPrice: '',
        }
    }

    handleOrders = async (e, { id }) => {
        const params = { id: id }

        if (id) {
            this.setState({ open: true });
            await axios.post('http://localhost:5000/api/rea_order/get_order', params)
                .then(res => {
                    let data = res.data.data;
                    calculations.init(Number(data.price));
                    this.setState({
                        orders: [data],
                        orderId: data.id,
                        orderName: data.name,
                        orderDescription: data.item_description,
                        orderPrice: calculations.getPriceTotal().toFixed(2),
                    })
                })
        }
    }

    closeModal = () => {
        const { orderId, orderName, orderDescription, orderPrice, counter } = this.state;
        let orders = {
            id: orderId,
            name: orderName,
            description: orderDescription,
            price: orderPrice,
            count: counter
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
        this.setState({
            counter: total,
            orderPrice: orderTotal.toFixed(2),
        });
    }

    decreament = () => {
        calculations.decreament();
        let orderTotal = calculations.orderCost();
        let total = calculations.getToal();
        this.setState({
            counter: total,
            orderPrice: orderTotal.toFixed(2),
        });
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/api/rea_order/all')
            .then(response => {
                let results = response.data;
                let data = results.data;
                this.setState({ items: data });
            })
    }

    renderModal = () => {
        const { orderName, orderDescription, orderPrice, isDisabled, counter, open } = this.state;
        return (
            <Modal centered={false} open={open} size='small' dimmer='blurring' closeIcon>
                <Modal.Header>{orderName}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>{orderDescription}</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon circular floated='left' count={counter} onClick={this.decreament} disabled={isDisabled}>
                        <Icon name='minus' />
                    </Button>
                    <Button basic floated='left'>
                        {counter}
                    </Button>
                    <Button icon circular floated='left' count={counter} price={orderPrice} onClick={this.increament}>
                        <Icon name='plus' />
                    </Button>

                    <Button
                        circular
                        onClick={this.closeModal}
                        content={`Add ${counter} to order R${orderPrice}`}
                        secondary />
                </Modal.Actions>
            </Modal>
        );
    }


    render() {
        const { items } = this.state;
        return (
            <div>
                <Card.Group itemsPerRow={3} stackable centered doubling >
                    {items.map((item) => (
                        <Card key={item.id} id={item.id} onClick={this.handleOrders} >
                            <Card.Content>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Description>
                                    {item.item_description}
                                </Card.Description>
                                <Card.Meta>R {item.price}</Card.Meta>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
                {this.renderModal()}
            </div>
        )
    }
}