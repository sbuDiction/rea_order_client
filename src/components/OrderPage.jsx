import React from 'react';
import { Grid, Menu, Button } from 'semantic-ui-react';
import OrderTable from './OrderTable';
import Checkout from '../utils/Checkout';

const orders = window.localStorage.getItem('orders');
const cleanApi = JSON.parse(orders);
const checkoutInstance = Checkout();
checkoutInstance.addPrices(cleanApi)

export default class GridExampleTextAlignmentCenter extends React.Component {
    
    handlPlaceOrder = () => { 

    }

    render() {
        return (
            <Grid textAlign='center' columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        {/* <Menu fluid vertical>
                        <Menu.Item className='header'>Cats</Menu.Item>
    
                    </Menu> */}
                    </Grid.Column>
                    <Grid.Column>
                        <OrderTable />
                        <Button fluid positive>Place your order</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Menu fluid vertical>
                            <Menu.Item className='header' color='red'>{'Total: ' + 'R' + checkoutInstance.getTotal()}</Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}