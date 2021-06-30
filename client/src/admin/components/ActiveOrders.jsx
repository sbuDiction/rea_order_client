import React from 'react'
import { Segment, Item, Checkbox } from 'semantic-ui-react'
import _ from 'lodash';
import { socket } from '../../global/socket-init';


export default class DividerExampleHorizontal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            incoming: [],
            status: 'No orders!',
        }
    }


    getData = foodItems => {
        console.log(foodItems);
        if (foodItems.length !== 0) {
            this.setState({ status: 'New orders received!' });
            this.setState({ incoming: foodItems });
        }
    }

    changeData = () => socket.emit('ordered_data');

    async componentDidMount() {
        socket.emit('ordered_data');
        socket.on('get_data', this.getData);
        socket.on('change_data', this.changeData);
    }

    ready = (e, { ready_id, ready_order }) => {
        const { incoming } = this.state;
        incoming.forEach(items => {
            if (ready_id === items.id) {
                console.log(items);
                socket.emit('ready for collection', 'Collect order', ready_order, true, ready_id);
                socket.emit('save order', items);
            }
        });
    }

    accepted = (e, { accept_id, accept_order }) => {
        const { incoming } = this.state
        incoming.forEach(order => {
            if (accept_id === order.id) {
                let query = {
                    state: 'Preparing',
                    orders: order
                }
                console.log(order);
                socket.emit('accepted', query);
            }
        });

    }


    renderOrderedItems = () => {
        const { incoming } = this.state;
        return (
            <Item.Group divided>
                {_.map(incoming, (item) => (
                    <Item key={item.id}>
                        <Item.Content>
                            <h2 style={{ color: 'rgb(117, 117, 117)', fontWeight: 300, fontSize: 30 }}>Order for: <span style={{color:'teal'}}>{item.name + ' ' + item.last_name}</span></h2>
                            <Item.Header as='a'>{item.order_name}</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>{item.order_description}</span>
                            </Item.Meta>
                            <Item.Description>Total: R{item.order_cost}</Item.Description>
                            <Item.Meta>
                                <code>Order id: <span style={{color:'blue'}}>{item.order_id}</span></code>
                            </Item.Meta>
                            <Item.Extra>
                                <Checkbox name='accept' accept_id={item.id} accept_order={item.order_id} onClick={this.accepted} label='Accept' />
                                <Checkbox name='ready' ready_id={item.id} ready_order={item.order_id} onClick={this.ready} label='Done!' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        );
    }

    render() {
        return (
            <div>
                <Segment basic textAlign='center'>
                    {/* <h1>Rea Order Manager </h1> */}
                    <h3 style={{ color: 'rgb(117, 117, 117)', fontWeight: 300, fontSize: 30 }}>{this.state.status}</h3>

                    {/* <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='list ul' />
                            Incoming orders
                        </Header>
                    </Divider> */}

                </Segment>
                <div className='items newOrders'>
                    <pre style={{ height: 250, overflowY: 'scroll' }}>
                        {this.renderOrderedItems()}
                    </pre>
                </div>

            </div>

        );
    }
}