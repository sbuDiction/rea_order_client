import { Component } from 'react';
import { Icon, Label, Menu, Segment } from 'semantic-ui-react';
import Home from '../main/home';
import Checkout from '../main/checkout';

export default class MenuExampleSecondary extends Component {
    state = {
        activeItem: 'home',
        orderCount: 0
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    renderItems = (active) => {
        let content;
        switch (active) {
            case 'home':
                content = <Home />;
                break;
            case 'checkout':
                content = <Checkout />;
                break;
            case 'orders':
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
                        <Menu.Item className='searchBox'>
                        </Menu.Item>
                        <Menu.Menu position='left'>
                            <Menu.Item
                                name='home'
                                icon='home'
                                active={activeItem === 'home'}
                                onClick={this.handleItemClick}
                            />
                        </Menu.Menu>
                        <Menu.Menu position='left'>
                            <Menu.Item
                                name='checkout'
                                active={activeItem === 'checkout'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='cart' /> Checkout
                                <Label color='teal' floating>
                                    {orderCount}
                                </Label>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu position='left'>
                            <Menu.Item
                                name='admin'
                                active={activeItem === 'admin'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='' /> Adminstration
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='orders'
                                active={activeItem === 'orders'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='shopping bag' /> My orders
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