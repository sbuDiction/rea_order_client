import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import Axios from 'axios';

class StockTable extends React.Component {
    constructor() {
        super();
        this.state = {
            stock: [],
        };
    }

    async componentDidMount() {
        try {
            await Axios.get('http://localhost:5000/api/rea_order/all')
                .then(res => {
                    if (res.data.isTrue) {
                        this.setState({ stock: res.data.data });
                    };
                });
        } catch (error) {

        };
    }

    renderTableItems = () => {
        const { stock } = this.state;
        return (
            <>
                {stock.map(stock => (
                    <Table.Body key={stock.id}>
                        <Table.Row positive >
                            <Table.Cell>{stock.id}</Table.Cell>
                            <Table.Cell> <Icon name='checkmark' />{stock.name}</Table.Cell>
                            <Table.Cell>{stock.item_description}</Table.Cell>
                            <Table.Cell><strong>R</strong> {stock.price}</Table.Cell>
                            <Table.Cell>{stock.qty}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </>
        );
    }

    render() {
        return (
            <Table celled stackable size='small' striped color='violet' selectable inverted compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Item description</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.renderTableItems()}
            </Table>
        );
    }
}

export default StockTable;