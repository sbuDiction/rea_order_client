import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import StockMananger from '../utils/StockData';
import Data from '../utils/data';
import PlaceOrder from '../utils/PlaceOrder';
import Orders from '../utils/Orders';

const placeorderInstance = PlaceOrder();
const modalInstance = StockMananger();
const dataInstance = Data();
const ordersInstance = Orders();


export default class ModalExampleTopAligned extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            orderId: undefined,
            orderHeader: undefined,
            orderDescription: undefined,
            orderCostPrice: 0.00,
            counter: placeorderInstance.getTotal(),
        }
    }

    handleCloseModal = () => {
        window.location.hash = '#added'
        this.setState({
            open: false,
            orderId: this.state.orderId,
            orderHeader: this.state.orderHeader,
            orderDescription: this.state.orderDescription,
            orderCostPrice: 0.00,
            counter: this.state.counter,
        })
    }

    handlePlusButton = () => {
        placeorderInstance.increament();
        modalInstance.increPrice();
        this.setState({ counter: placeorderInstance.getTotal() })
    }

    handleMinusButton = () => {
        placeorderInstance.decreament();
        modalInstance.decrePrice();
        this.setState({ counter: placeorderInstance.getTotal() })
    }


    render() {
        const open = this.state.open
        const header = this.state.orderHeader
        const description = this.state.orderDescription;
        const counter = this.state.counter
        const id = this.state.orderId;
        let button;

        onhashchange = () => {
            let hashUrl = window.location.hash;
            let url = hashUrl.split('/');
            if (url[0] === '#order') {
                const item = modalInstance.getStockData(dataInstance.displayAllData(), url[1]);
                placeorderInstance.init()
                this.setState({
                    open: true,
                    orderId: Number(url[1]),
                    orderHeader: item.header,
                    orderDescription: item.description,
                    orderCostPrice: modalInstance.getTotal(),
                    counter: placeorderInstance.resetCounter(),
                })
                placeorderInstance.add(
                    Number(url[1]),
                    item.header,
                    item.description,
                    Number(item.meta).toFixed(2),
                    1)
            } else if (url[0] === '#added') {
                placeorderInstance.placeOrder(id, header, description, modalInstance.getTotal(), counter);
                ordersInstance.addOrderToList(placeorderInstance.getOrder());
                window.localStorage.setItem('orders', JSON.stringify(ordersInstance.getOrders()))
            }
        }
        if (counter === 1) {
            button = <Button icon circular floated='left' onClick={this.handleMinusButton} disabled>
                <Icon name='minus' />
            </Button>
        } else {
            button = <Button icon circular floated='left' onClick={this.handleMinusButton}>
                <Icon name='minus' />
            </Button>
        }
        return (
            <>
                <Modal centered={false} open={open} size='small' dimmer='blurring' closeIcon>
                    <Modal.Header>{header}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>{description}</Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        {button}
                        <Button basic floated='left'>
                            {counter}
                        </Button>
                        <Button icon circular floated='left' onClick={this.handlePlusButton}>
                            <Icon name='plus' />
                        </Button>
                        <Button
                            onClick={this.handleCloseModal}
                            content={"Add " + counter + " to order " + "R" + modalInstance.getTotal().toFixed(2)}
                            secondary />
                    </Modal.Actions>
                </Modal>
            </>

        );
    }
}