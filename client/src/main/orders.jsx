import React from 'react';
import { Button, Modal, Divider, Header, Icon, Loader, Card, Image, Input } from 'semantic-ui-react';
import { socket } from '../global/socket-init';
import _ from 'lodash';

export default class MyOrders extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            ordersList: [],
            state: 'No new orders',
            isLoading: false,
            past_orders: [],
            order_status: '',
            // modal states
        }
    }

    getData = data => {
        this.setState({ ordersList: data.order });
        const { ordersList } = this.state;
        this.state.ordersList.forEach(orders => {
            if (orders.is_done === false) {
                this.setState({ state: 'Active orders' });
                this.setState({ isLoading: true });
            } else if (orders.is_done) {
                this.setState({ isLoading: false });
            }
        });
        if (ordersList.length !== 0) {
            this.setState({ order_status: ordersList[0].order_state });
        }
    }

    getPastOrders = orders => {
        this.setState({ past_orders: orders });
    }


    componentDidMount() {
        socket.emit('get orders');
        socket.on('data', this.getData);
        socket.on('past orders', this.getPastOrders);
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    renderModalButton() {
        return (
            <div>
                <Button size='mini' onClick={this.openModal} positive >Track order</Button>
            </div>
        );
    }

    renderActiveCardOrders() {
        const { ordersList, isLoading, order_status } = this.state;
        return (
            <div>
                <Card.Group centered>
                    {_.map(ordersList, (orders) => (
                        <Card key={orders.id}>
                            <Card.Content>
                                <Image floated='right'>
                                    <Icon name='food' size='big' />
                                </Image>
                                <Card.Header>{orders.name}</Card.Header>
                                <Card.Meta><strong>Cost:</strong> R{orders.order_cost}</Card.Meta>
                                <Card.Description>
                                    <strong>{orders.item_description}</strong>
                                </Card.Description>
                                <hr className='hb' />
                                <Card.Meta>Time: 2 minutes ago</Card.Meta>
                                <Card.Meta>Order count: {orders.count}</Card.Meta>
                                <Card.Meta>Order id: {orders.id}</Card.Meta>

                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        <span style={{ color: 'green', fontFamily: "sans-serif" }}>{order_status + ' '}</span>
                                        <Loader size='tiny' active={isLoading} inline />
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </div>
        );
    }

    renderPastOrders() {
        const { past_orders } = this.state;
        return (
            <div>
                <Card.Group centered>
                    {_.map(past_orders, (orders) => (
                        <Card key={orders.id} >
                            <Card.Content>
                                <Image floated='right'>
                                    <Icon circular color='teal' name='food' size='big' />
                                </Image>
                                <Card.Header>{orders.order_name}</Card.Header>
                                <Card.Meta><strong>Cost:</strong> R{orders.order_cost}</Card.Meta>
                                <Card.Description>
                                    <strong>{orders.order_description}</strong>
                                </Card.Description>
                                <hr className='hb' />
                                <Card.Meta><Icon name='time' color='teal' /> : 2021-06-22T09:07:04.600Z </Card.Meta>
                                <Card.Meta>Order count: {orders.count}</Card.Meta>
                                <Card.Meta>Order id: {orders.id}</Card.Meta>

                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button circular basic color='green'>
                                        <span>{orders.order_state}</span>
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </div>
        );
    }



    render() {
        const { state, open } = this.state;
        return (
            <div>
                <Button circular color='green' basic onClick={this.openModal} >
                    <Icon name='setting' color='teal' />
                    Account settings
                </Button>
                {/* <Button content='Account settings' /> */}
                <div className='currentOrders'>
                    <Divider horizontal>
                        <Header as='h4'>
                            {state}
                            <Icon color='teal' name='alarm' />
                        </Header>
                    </Divider>
                    {this.renderActiveCardOrders()}
                </div>

                <div className='currentOrders'>
                    <Divider horizontal>
                        <Header as='h4'>
                            Order history
                            <Icon color='teal' name='time' />
                        </Header>
                    </Divider>
                    {this.renderPastOrders()}
                </div>

                <Modal open={open} size='tiny' dimmer='blurring'>
                    <Modal.Header>
                        <Icon color='teal' name='settings' /> Account Settings
                    </Modal.Header>
                    <Modal.Content>
                        <ul>
                            <li><Input icon='user' type='name' label='Name' size='mini' /></li>
                            <div className='gr'></div>
                            <li ><Input icon='user' type='surname' label='Last name' size='mini' /></li>
                            <div className='gr'></div>
                            <Input icon='home' label='Home address' size='mini' />
                            <div className='gr'></div>
                            <Input icon='mail' type='email' label='Email' size='mini' >
                            </Input>
                            <div className='gr'></div>
                            <Input icon='phone' type='phone' label='Phone number' size='mini' />
                        </ul>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button circular floated content='Close' basic onClick={this.closeModal} secondary />
                        <Button circular positive floated='left' basic onClick={this.openModal} content='Save' />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
