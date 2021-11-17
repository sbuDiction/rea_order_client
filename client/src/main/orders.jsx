import React from 'react';
import { Divider, Header, Icon, Loader, Card, Image, Label } from 'semantic-ui-react';
import { socket } from '../global/socket-init';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import Auth from '../utils/Auth';
import Axios from 'axios';

export default class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            ordersList: [],
        }
    }

    componentDidMount() {
        try {
            let config = {
                headers: {
                    'Authorization': `bearer:${Auth.getToken()}`
                }
            }
            socket.emit('get orders');
            socket.on('data', async () => {
                Axios.get('/api/rea_order/get/active_order', config)
                    .then(res => {
                        this.setState({ ordersList: res.data.data });
                    });
            });
        } catch (error) {

        }
    }

    renderActiveCardOrders() {
        const { ordersList } = this.state;
        return (
            <div>
                <Card.Group centered stackable>
                    {_.map(ordersList, (orders) => (
                        <Card key={orders.id} color='teal'>
                            <Card.Content>
                                <Image floated='right'>
                                    <Loader active={orders.is_done} size='small' />
                                </Image>
                                <Card.Header>{orders.name}</Card.Header>
                                <Card.Meta><Icon name='money bill alternate' /> R {orders.order_cost}</Card.Meta>
                                <Card.Description>
                                    <strong>{orders.item_description}</strong>
                                </Card.Description>
                                <hr className='hb' />
                                <Card.Meta>Time: {`${orders.time_stamp}`}</Card.Meta>
                                <Card.Meta>Order count: {orders.count}</Card.Meta>
                                <Card.Meta>Order id: {orders.id}</Card.Meta>
                            </Card.Content>
                            <Label attached='bottom right' content={orders.order_state} color='teal' />
                        </Card>
                    ))}
                </Card.Group>
            </div>
        );
    }

    render() {
        if (!Auth.getAuth()) {
            return <Redirect to='/login' />;
        }
        return (
            <div>
                <div className='currentOrders'>
                    <Divider horizontal>
                        <Header as='h4' color='teal'>
                            My orders
                            <Icon color='teal' name='alarm' />
                        </Header>
                    </Divider>
                    {this.renderActiveCardOrders()}
                </div>
            </div>
        );
    }
}
