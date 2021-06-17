import React from 'react'
import { Button, Divider, Segment, Icon, Header, Item, Label, Card, Checkbox } from 'semantic-ui-react'
import _ from 'lodash';
import { socket } from '../global/socket-init';


export default class DividerExampleHorizontal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            accepted: [],
            incoming: [],
            status: 'No orders!'
        }
    }

    updateAcceptedOrders = (items) => {
        this.setState((prevState) => ({ accepted: [items, ...prevState.accepted] }))
    }

    getData = foodItems => {
        console.log(foodItems);
        this.setState({ incoming: foodItems });
    }

    changeData = () => socket.emit('ordered_data');

    async componentDidMount() {
        socket.emit('ordered_data');
        socket.on('get_data', this.getData);
        socket.on('change_data', this.changeData);
    }

    acceptOrder = (e, { id }) => {
        const { incoming } = this.state
        incoming.forEach(items => {
            if (id === items.id) {
                this.updateAcceptedOrders(items);
            }
        });
    }

    handleUncheck = () => {

    }

    renderToggleButton = (orderId) => {
        return (
            <div>
                <Button floated='right'>
                    <Checkbox id={orderId} onClick={this.acceptOrder} label='Accept order' />
                </Button>
            </div>
        );
    }

    renderOrderedItems = () => {
        const { incoming } = this.state;
        return (
            <Item.Group divided>
                {_.map(incoming, (item) => (
                    <Item key={item.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {item.order_name}
                            </Item.Header>
                            <Item.Meta>
                                <span className='cinema'>{item.order_description}</span>
                            </Item.Meta>
                            <Item.Description>Total: R{item.order_cost}</Item.Description>
                            <Item.Extra>
                                {this.renderToggleButton(item.id)}
                                <Label size='huge' color='teal'>{item.count}</Label>
                                {/* <Label icon='globe' content='Additional Languages' /> */}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        );
    }

    renderAcceptedOrders = () => {
        const { accepted } = this.state
        return (
            <Card.Group itemsPerRow={3} stackable centered doubling>
                {_.map(accepted, (item) => (
                    <Card href='#' key={item.id} >
                        <Card.Content>
                            <Label attached='top right' size='big' color='teal' >{item.count}</Label>
                            <Card.Header >Order for Sibusiso Nkosi</Card.Header>
                            <Card.Description>
                                {item.order_description}
                            </Card.Description>
                            {/* <Card.Meta>{item.order_price}</Card.Meta> */}
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        );
    }

    render() {
        return (
            <div>
                <Segment basic textAlign='center'>
                    <h1>Rea Order Manager </h1>
                    <h3>{this.state.status}</h3>

                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='list ul' />
                            Incoming orders
                        </Header>
                    </Divider>

                </Segment>
                <div className='items newOrders'>
                    <pre style={{ height: 127, overflowY: 'scroll' }}>
                        {this.renderOrderedItems()}
                    </pre>
                </div>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon color='green' name='check' />
                        Accepted orders
                    </Header>
                </Divider>
                <div className='acceptedOrders'>
                    {this.renderAcceptedOrders()}
                    {/* <Arraytester/> */}
                </div>
            </div>

        );
    }
}