import React, { Component } from 'react'
import { Icon, Label, Menu } from 'semantic-ui-react'
// import Search from './SearchBox'
// import Orders from '../utils/Orders';
import Context from './Context';


export default class MenuExampleSecondary extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        let count = window.localStorage.getItem('orders');
        let counter = JSON.parse(count);
        let howManyOrders = 0;
        if (counter === null) {
            howManyOrders = 0;
        } else {
            howManyOrders = counter.length
        }

        
        return (
            <div className="outter-section">
                <Menu inverted>
                    <Menu.Item className='searchBox'>
                        {/* <Search /> */}
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
                                {howManyOrders}
                            </Label>
                        </Menu.Item>
                    </Menu.Menu>


                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='orders'
                            active={activeItem === 'orders'}
                            onClick={this.handleItemClick}
                        >
                            <Icon name='archive' /> Orders
                            <Label circular empty color='teal' floating />
                        </Menu.Item>
                    </Menu.Menu>

                </Menu>
                <div>
                    <Context menuItem={activeItem} />
                </div>
            </div>


        )
    }
}