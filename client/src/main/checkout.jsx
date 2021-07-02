import { socket } from '../global/socket-init';
import _ from 'lodash';
import { Component } from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
const Checkout = require('../functions/Checkout');



const chekout = Checkout();
export default class StickyExampleActive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            food_data: [],
            status: 'Your items'
        };
    }

    handleOrderButton = () => {
        const { food_data } = this.state;
        let params = { food_data };
        socket.emit('add order', params.food_data);
        this.setState({ food_data: [], status: 'Your order is sent.' });
        window.localStorage.removeItem('user_order');
    }

    componentDidMount() {
        socket.emit('initial_data');
        const jsonData = window.localStorage.getItem('user_order');
        const data = JSON.parse(jsonData);
        chekout.add(data);
        if (data === null) {
            this.setState({ status: 'Your cart is empty!', food_data: [] });
        } else {
            this.setState({ food_data: data });
        }
    }

    componentWillUnmount() {
        chekout.add(null);
    }

    renderOrderInfo = () => {
        const { food_data } = this.state;
        let content;
        if (food_data.length !== 0) {
            content = <div>
                <div className='infoMsg'>
                    <span className='hs'>If you don't come to pick up your order we will try calling.</span>
                </div>
                <hr className='hb' />
                <ul>
                    <li className='d6 cc'>
                        <div>
                            <div className='cc'>Subtotal
                                <span style={{ paddingLeft: 120 }} className='cost'>R {chekout.getTotal()},00</span>
                            </div>
                        </div>
                    </li>
                    <li className='gr'></li>
                    <li className='gr'></li>
                </ul>
                <hr className='hb' />
                <div className='d6'>
                    <div style={{ color: 'black' }}>Total
                        <span style={{ paddingLeft: 130 }}>R {chekout.getTotal()},00</span>
                    </div>
                </div>
            </div>
        } else {
            content = '';
        }
        return (
            <div>{content}</div>
        );
    }

    renderOrderButton = () => {
        const { food_data } = this.state;
        let content;
        if (food_data.length !== 0) {
            content = <Button onClick={this.handleOrderButton} className='orderBtn' positive>
                Place order
            </Button>
        } else {
            content = '';
        }
        return (
            <div>{content}</div>
        );
    }

    renderItems = () => {
        return (
            <div>
                <ul>
                    <li className='d6 cc'>
                        <div>
                            <div className='cc'>Subtotal
                            </div>
                        </div>
                    </li>
                    <li className='gr'></li>
                    <li className='d6 cc'>
                        <div>
                            <div className='cc'>Service
                            </div>
                        </div>
                    </li>
                    <li className='gr'></li>
                </ul>
            </div>
        );
    }

    renderOrderList = () => {
        const { food_data } = this.state;
        return (
            <div>
                {_.map(food_data, (item) => (
                    <div key={item.id} style={{ paddingLeft: 30, paddingBottom: 40 }} className='orderContainer'>
                        <h4 className='orderHeader'>{item.name} <span>(R {item.price})</span></h4>
                        <ul>
                            <li>{item.description}</li>
                        </ul>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        const { status } = this.state
        return (
            <Segment basic textAlign='left'>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <div><h1 className='blg'>Kota House, Vosloorus</h1></div>
                        <hr className='hb' />
                        <div><h3 className=''>{status}</h3></div>
                        <div style={{ paddingTop: 15, paddingLeft: 5 }}>
                            {/* {this.renderItems()} */}
                            {this.renderOrderList()}
                        </div>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' >
                        {this.renderOrderButton()}
                        {this.renderOrderInfo()}
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}