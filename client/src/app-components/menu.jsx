import { Component } from 'react';
import { Icon, Label, Menu, Segment } from 'semantic-ui-react';
import Home from '../main/home';
import Checkout from '../main/checkout';
import MyOrders from '../main/orders';

export default class MenuExampleSecondary extends Component {
    state = {
        activeItem: 'home',
        orderCount: 0
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    componentDidMount() {

    }

    renderItems = (active) => {
        let content;
        switch (active) {
            case 'home':
                content = <Home />;
                break;
            case 'checkout':
                // window.location.hash = 'checkout'
                content = <Checkout />;
                break;
            case 'orders':
                content = <MyOrders />;
                break;
            default:
                break;
        }
        return (
            <div>{content}</div>
        );
    }


    render() {
        const { activeItem, orderCount } = this.state
        return (
            <div className="outter-section">
                <Segment inverted>
                    <Menu inverted pointing secondary attached='top' tabular>

                        <Menu.Menu position='left'>
                            <Menu.Item
                                name='home'
                                active={activeItem === 'home'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='home' color='teal' /> Checkout
                            </Menu.Item>
                        </Menu.Menu>

                        <Menu.Menu position='left'>
                            <Menu.Item
                                name='checkout'
                                active={activeItem === 'checkout'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='cart' color='teal' /> Checkout
                                <Label color='teal' floating>
                                    {orderCount}
                                </Label>
                            </Menu.Item>
                        </Menu.Menu>

                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='orders'
                                active={activeItem === 'orders'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='shopping bag' color='teal' /> My orders
                                <Label circular empty color='teal' floating />
                            </Menu.Item>
                        </Menu.Menu>

                    </Menu>
                </Segment>
                {this.renderItems(activeItem)}
            </div>
        )
    }
}