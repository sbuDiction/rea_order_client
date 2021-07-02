import React, { Component } from 'react'
import { Menu, Icon, Button, Modal } from 'semantic-ui-react'
import StockTable from './StockTable';
import ClientTable from './ClientTable';
import ActiveOrders from './ActiveOrders';
import UpdateStockForm from './UpdateStockForm';

class Dashbord extends Component {
    constructor() {
        super();
        this.state = {
            activeItem: 'Stock',
            open: false
        };
    };


    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    open = () => this.setState({ open: true });

    close = () => this.setState({ open: false });

    renderHtmlContent = (active) => {
        let content;
        switch (active) {
            case 'Stock':
                content = <StockTable />;
                break;
            case 'Available stock':
                content = '';
                break;
            case 'Active orders':
                content = <ActiveOrders />;
                break;
            case 'Finished orders':
                content = '';
                break;
            case 'Users':
                content = <ClientTable />;
                break;
            case 'Connected users':
                content = '';
                break;
            case 'Verified users':
                content = '';
                break;
            case 'Profit':
                content = '';
                break;
            case 'Cash':
                content = '';
                break;
            case 'Bought':
                content = '';
                break;
            case 'Admin profile':
                content = '';
                break;
            case 'App settings':
                content = '';
                break;
            default:
                break;
        }
        return (
            <div>{content}</div>
        );
    }

    renderMenu = () => {
        const { activeItem } = this.state;
        return (
            <Menu vertical>
                <Menu.Item>
                    <Menu.Header>Products</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Stock' active={activeItem === 'Stock'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Orders</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Active orders' active={activeItem === 'Active orders'} onClick={this.handleItemClick}>
                        </Menu.Item>
                        <Menu.Item name='Finished orders' active={activeItem === 'Finished orders'} onClick={this.handleItemClick}>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Clients</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Users' active={activeItem === 'Users'} onClick={this.handleItemClick} />
                        <Menu.Item name='Connected users' active={activeItem === 'Connected users'} onClick={this.handleItemClick} />
                        <Menu.Item name='Verified users' active={activeItem === 'Verified users'} onClick={this.handleItemClick} />
                        <Menu.Item name='Not verified users' active={activeItem === 'Not verified users'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Market</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Profit' active={activeItem === 'Profit'} onClick={this.handleItemClick} />
                        <Menu.Item name='Cash' active={activeItem === 'Cash'} onClick={this.handleItemClick} />
                        <Menu.Item name='Bought' active={activeItem === 'Bought'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Settings</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Admin profile' active={activeItem === 'Admin profile'} onClick={this.handleItemClick}>
                            Admin profile
                        </Menu.Item>
                        <Menu.Item name='App settings' active={activeItem === 'App settings'} onClick={this.handleItemClick}>
                            App settings
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        );
    }

    renderUpdateStockModal = () => {
        const { open } = this.state;
        return (
            <Modal open={open}>
                <Modal.Header>Add stock</Modal.Header>
                <Modal.Content scrolling><UpdateStockForm /></Modal.Content>
                <Modal.Actions><Button secondary floated='right' compact onClick={this.close} labelPosition='right' icon='x' content='Close' /></Modal.Actions>
            </Modal>
        );
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <nav className='col-md-2 d-none d-md-block'>
                            <div className='sidebar-sticky'>
                                {this.renderMenu()}
                            </div>
                        </nav>
                        <main role='main' className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4' >
                            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
                                <h1 style={{ color: 'rgb(117, 117, 117)', fontWeight: 300, fontSize: 40 }} className='h2'>Dashbord <Icon name='dashboard' /> </h1>
                                <div className='btn-toolbar mb-2 mb-md-0'>
                                    <div className='btn-group mr-2'>
                                        <Button attached='left' secondary basic onClick={this.open}>Add stock</Button>
                                        {/* <Button attached='right' secondary basic></Button> */}
                                    </div>
                                    {/* <Button content='This week' basic secondary className='btn btn-sm btn-outline-secondary dropdown-toggle' ></Button> */}
                                </div>
                            </div>
                            <h2 style={{ color: 'rgb(117, 117, 117)', fontWeight: 300, fontSize: 30 }} className='h2'>{activeItem}</h2>
                            <div className=''>
                                {this.renderHtmlContent(activeItem)}
                            </div>
                        </main>
                    </div>
                </div>
                {this.renderUpdateStockModal()}
            </div>
        )
    }
}

export { Dashbord };